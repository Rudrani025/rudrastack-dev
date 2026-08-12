import { useMemo, useState } from "react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { LogOut, Mail, RefreshCw, Search, Trash2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  deleteContactMessage,
  listContactMessages,
  updateMessageStatus,
  type AdminMessage,
} from "@/lib/admin.functions";

const TITLE = "RudraStack Admin Dashboard | Contact Messages";
const DESCRIPTION = "Private dashboard for reviewing and managing RudraStack.dev contact messages.";

export const Route = createFileRoute("/admin/")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/admin/login" });
    return { adminEmail: data.user.email ?? "" };
  },
  component: AdminDashboard,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
});

type Filter = "all" | "new" | "read" | "replied";

const STATUS_STYLES: Record<AdminMessage["status"], string> = {
  new: "bg-primary text-primary-foreground",
  read: "bg-peach text-grape",
  replied: "bg-lavender text-grape",
};

function fmt(date: string) {
  return new Date(date).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function AdminDashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchMessages = useServerFn(listContactMessages);
  const setStatus = useServerFn(updateMessageStatus);
  const removeMessage = useServerFn(deleteContactMessage);

  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["contact-messages"],
    queryFn: () => fetchMessages(),
  });

  const messages = data ?? [];

  const stats = useMemo(
    () => ({
      total: messages.length,
      new: messages.filter((m) => m.status === "new").length,
      read: messages.filter((m) => m.status === "read").length,
      replied: messages.filter((m) => m.status === "replied").length,
    }),
    [messages],
  );

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return messages.filter((m) => {
      const matchesFilter = filter === "all" || m.status === filter;
      const matchesSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [messages, filter, search]);

  const open = messages.find((m) => m.id === openId) ?? null;

  const mutateStatus = async (id: string, status: AdminMessage["status"]) => {
    await setStatus({ data: { id, status } });
    await queryClient.invalidateQueries({ queryKey: ["contact-messages"] });
  };

  const doDelete = async (id: string) => {
    await removeMessage({ data: { id } });
    setConfirmId(null);
    setOpenId(null);
    await queryClient.invalidateQueries({ queryKey: ["contact-messages"] });
  };

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/admin/login", replace: true });
  };

  const openMessage = (m: AdminMessage) => {
    setOpenId(m.id);
    if (m.status === "new") void mutateStatus(m.id, "read");
  };

  return (
    <main className="min-h-screen bg-lavender/30 px-3 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <header className="pixel-border flex flex-wrap items-center justify-between gap-3 bg-cream p-4">
          <div>
            <h1 className="pixel text-[10px] leading-relaxed text-grape sm:text-[12px]">
              RudraStack Admin Dashboard
            </h1>
            <p className="mt-2 text-sm text-grape/80">Welcome, Rudrani 👋</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => void refetch()}
              className="press pixel-border flex items-center gap-2 bg-peach px-3 py-2 text-xs text-grape"
            >
              <RefreshCw size={14} className={isFetching ? "animate-spin" : ""} /> Refresh
            </button>
            <button
              onClick={() => void signOut()}
              className="pixel press pixel-border flex items-center gap-2 bg-primary px-3 py-2 text-[8px] text-primary-foreground"
            >
              <LogOut size={14} /> LOGOUT
            </button>
          </div>
        </header>

        {stats.new > 0 && (
          <button
            onClick={() => {
              setFilter("new");
              document.getElementById("inbox")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="press pixel-border mt-4 w-full bg-pink px-4 py-3 text-left"
          >
            <span className="pixel text-[8px] text-grape">
              🔔 {stats.new} New Message{stats.new === 1 ? "" : "s"}
            </span>
          </button>
        )}

        <section className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(
            [
              ["Total Messages", stats.total, "bg-cream"],
              ["New Messages", stats.new, "bg-pink"],
              ["Read Messages", stats.read, "bg-peach"],
              ["Replied Messages", stats.replied, "bg-lavender"],
            ] as const
          ).map(([label, value, bg]) => (
            <div key={label} className={`pixel-border ${bg} p-3`}>
              <p className="pixel text-[6px] leading-relaxed text-grape sm:text-[7px]">
                {label.toUpperCase()}
              </p>
              <p className="pixel mt-2 text-[16px] text-grape">{value}</p>
            </div>
          ))}
        </section>

        <section id="inbox" className="pixel-border mt-6 bg-cream p-4">
          <h2 className="pixel text-[9px] text-grape sm:text-[11px]">Contact Messages</h2>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {(["all", "new", "read", "replied"] as Filter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`pixel border-[3px] border-grape px-3 py-2 text-[7px] ${
                    filter === f ? "bg-primary text-primary-foreground" : "bg-card text-grape"
                  }`}
                >
                  {f.toUpperCase()}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 border-[3px] border-grape bg-card px-2 py-1">
              <Search size={14} className="text-grape/70" />
              <span className="sr-only">Search messages</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search messages..."
                className="w-full bg-transparent py-1 text-sm text-grape outline-none sm:w-56"
              />
            </label>
          </div>

          {isLoading && <p className="mt-6 text-sm text-grape/70">Loading messages…</p>}
          {isError && (
            <p className="mt-6 text-sm text-destructive">
              Could not load messages. Try refreshing.
            </p>
          )}
          {!isLoading && !isError && visible.length === 0 && (
            <p className="mt-6 text-sm text-grape/70">No messages found.</p>
          )}

          {visible.length > 0 && (
            <>
              <div className="mt-4 hidden overflow-hidden border-[3px] border-grape md:block">
                <table className="w-full text-left text-sm text-grape">
                  <thead className="bg-lavender/60">
                    <tr className="pixel text-[6px]">
                      <th className="p-2">NAME</th>
                      <th className="p-2">EMAIL</th>
                      <th className="p-2">MESSAGE</th>
                      <th className="p-2">DATE</th>
                      <th className="p-2">STATUS</th>
                      <th className="p-2">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visible.map((m) => (
                      <tr key={m.id} className="border-t border-grape/20 align-top">
                        <td className="p-2 font-medium">{m.name}</td>
                        <td className="max-w-[160px] truncate p-2">{m.email}</td>
                        <td className="max-w-[220px] truncate p-2">{m.message}</td>
                        <td className="p-2 text-xs">{fmt(m.created_at)}</td>
                        <td className="p-2">
                          <span
                            className={`pixel px-2 py-1 text-[6px] ${STATUS_STYLES[m.status]}`}
                          >
                            {m.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-2">
                          <div className="flex gap-2">
                            <button
                              onClick={() => openMessage(m)}
                              className="border-[2px] border-grape bg-peach px-2 py-1 text-xs"
                            >
                              View
                            </button>
                            <button
                              onClick={() => setConfirmId(m.id)}
                              aria-label={`Delete message from ${m.name}`}
                              className="border-[2px] border-grape bg-card px-2 py-1 text-xs"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <ul className="mt-4 space-y-3 md:hidden">
                {visible.map((m) => (
                  <li key={m.id} className="border-[3px] border-grape bg-card p-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-grape">{m.name}</p>
                      <span className={`pixel px-2 py-1 text-[6px] ${STATUS_STYLES[m.status]}`}>
                        {m.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs text-grape/80">{m.email}</p>
                    <p className="mt-2 line-clamp-2 text-sm text-grape/90">{m.message}</p>
                    <p className="mt-2 text-xs text-grape/60">{fmt(m.created_at)}</p>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => openMessage(m)}
                        className="press flex-1 border-[3px] border-grape bg-peach px-3 py-3 text-sm text-grape"
                      >
                        Open
                      </button>
                      <button
                        onClick={() => setConfirmId(m.id)}
                        aria-label={`Delete message from ${m.name}`}
                        className="press border-[3px] border-grape bg-cream px-3 py-3 text-grape"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-grape/60 p-3 sm:items-center">
          <div className="pixel-border-lg max-h-[90vh] w-full max-w-lg overflow-y-auto bg-cream p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="pixel text-[9px] text-grape">Message Details</h3>
              <button onClick={() => setOpenId(null)} aria-label="Close message">
                <X size={18} className="text-grape" />
              </button>
            </div>
            <dl className="mt-4 space-y-2 text-sm text-grape">
              <div>
                <dt className="pixel inline text-[6px]">NAME:</dt> <dd className="inline">{open.name}</dd>
              </div>
              <div>
                <dt className="pixel inline text-[6px]">EMAIL:</dt>{" "}
                <dd className="inline break-all">{open.email}</dd>
              </div>
              <div>
                <dt className="pixel inline text-[6px]">RECEIVED:</dt>{" "}
                <dd className="inline">{fmt(open.created_at)}</dd>
              </div>
              <div>
                <dt className="pixel inline text-[6px]">STATUS:</dt>{" "}
                <dd className="inline capitalize">{open.status}</dd>
              </div>
            </dl>
            <h4 className="pixel mt-5 text-[8px] text-grape">Message</h4>
            <p className="mt-2 whitespace-pre-wrap border-[3px] border-grape bg-card p-3 text-sm text-grape">
              {open.message}
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <button
                onClick={() => void mutateStatus(open.id, "read")}
                className="press pixel-border bg-peach px-3 py-3 text-xs text-grape"
              >
                Mark as Read
              </button>
              <button
                onClick={() => void mutateStatus(open.id, "replied")}
                className="press pixel-border bg-lavender px-3 py-3 text-xs text-grape"
              >
                Mark as Replied
              </button>
              <a
                href={`mailto:${open.email}?subject=${encodeURIComponent("Re: your message on RudraStack.dev")}`}
                className="press pixel-border flex items-center justify-center gap-2 bg-primary px-3 py-3 text-xs text-primary-foreground"
              >
                <Mail size={14} /> REPLY BY EMAIL
              </a>
              <button
                onClick={() => setConfirmId(open.id)}
                className="press pixel-border bg-cream px-3 py-3 text-xs text-destructive"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-grape/70 p-4">
          <div className="pixel-border-lg w-full max-w-sm bg-cream p-5">
            <p className="pixel text-[8px] leading-relaxed text-grape">Delete this message?</p>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => setConfirmId(null)}
                className="press pixel-border flex-1 bg-card px-3 py-3 text-sm text-grape"
              >
                Cancel
              </button>
              <button
                onClick={() => void doDelete(confirmId)}
                className="press pixel-border flex-1 bg-primary px-3 py-3 text-sm text-primary-foreground"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
