import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { adminAccountExists, bootstrapAdminAccount } from "@/lib/admin-setup.functions";

const TITLE = "RudraStack Admin | Private Portfolio Dashboard";
const DESCRIPTION =
  "Private admin login for RudraStack.dev — manage portfolio contact messages securely.";

export const Route = createFileRoute("/admin/login")({
  ssr: false,
  component: AdminLogin,
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

type Mode = "login" | "forgot" | "recover" | "setup";

function AdminLogin() {
  const navigate = useNavigate();
  const checkAccount = useServerFn(adminAccountExists);
  const createAccount = useServerFn(bootstrapAdminAccount);

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [needsSetup, setNeedsSetup] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setMode("recover");
    });
    if (window.location.hash.includes("type=recovery")) setMode("recover");
    void checkAccount().then((r) => setNeedsSetup(!r.exists));
    return () => sub.subscription.unsubscribe();
  }, [checkAccount]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin/", replace: true });
        return;
      }
      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/admin/login`,
        });
        if (error) throw error;
        setNotice("Password reset link sent. Check your inbox.");
        return;
      }
      if (mode === "recover") {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
        setNotice("Password updated. You can log in now.");
        setMode("login");
        return;
      }
      const result = await createAccount({ data: { email, password } });
      if (!result.ok) throw new Error(result.error);
      setNotice("Admin account created. Log in below.");
      setNeedsSetup(false);
      setMode("login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-lavender/40 px-4 py-12">
      <div className="pixel-border-lg w-full max-w-md bg-cream p-6 sm:p-8">
        <div aria-hidden className="mb-4 flex gap-1">
          {["bg-pink", "bg-peach", "bg-lavender", "bg-primary"].map((c) => (
            <span key={c} className={`h-2 w-6 ${c}`} />
          ))}
        </div>
        <h1 className="pixel text-[12px] leading-relaxed text-grape sm:text-[14px]">
          RudraStack Admin
        </h1>
        <p className="mt-2 text-sm text-grape/80">Private Portfolio Dashboard</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          {mode !== "recover" && (
            <div>
              <label htmlFor="admin-email" className="pixel text-[7px] text-grape">
                EMAIL
              </label>
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full border-[3px] border-grape bg-card px-3 py-2 text-sm text-grape outline-none focus:border-primary"
              />
            </div>
          )}

          {mode !== "forgot" && (
            <div>
              <label htmlFor="admin-password" className="pixel text-[7px] text-grape">
                {mode === "recover" ? "NEW PASSWORD" : "PASSWORD"}
              </label>
              <input
                id="admin-password"
                type="password"
                required
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full border-[3px] border-grape bg-card px-3 py-2 text-sm text-grape outline-none focus:border-primary"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="pixel press pixel-border w-full bg-primary px-4 py-3 text-[9px] text-primary-foreground disabled:opacity-60"
          >
            {busy
              ? "PLEASE WAIT…"
              : mode === "login"
                ? "LOGIN →"
                : mode === "forgot"
                  ? "SEND RESET LINK →"
                  : mode === "recover"
                    ? "SAVE PASSWORD →"
                    : "CREATE ADMIN →"}
          </button>

          {error && (
            <p className="pixel text-[7px] leading-relaxed text-destructive" role="alert">
              ✕ {error}
            </p>
          )}
          {notice && (
            <p className="pixel text-[7px] leading-relaxed text-primary" role="status">
              ✓ {notice}
            </p>
          )}
        </form>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          {mode !== "forgot" ? (
            <button
              onClick={() => {
                setMode("forgot");
                setError(null);
                setNotice(null);
              }}
              className="text-xs text-grape/80 underline"
            >
              Forgot Password?
            </button>
          ) : (
            <button onClick={() => setMode("login")} className="text-xs text-grape/80 underline">
              Back to login
            </button>
          )}
          {needsSetup && mode !== "setup" && (
            <button onClick={() => setMode("setup")} className="text-xs text-grape/80 underline">
              First-time admin setup
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
