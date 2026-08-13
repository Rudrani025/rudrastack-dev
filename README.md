# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS

## Contact system & admin dashboard setup

1. **Create a Supabase project** (already provisioned automatically when using Lovable Cloud).
2. **Create the `contact_messages` table** — columns: `id`, `name`, `email`, `message`, `status` (`new` | `read` | `replied`, default `new`), `created_at`.
3. **Enable Supabase Authentication** with the email/password provider. No public sign-up page exists.
4. **Create the admin user** — open `/admin/login` and use "First-time admin setup" once; only the owner email is accepted.
5. **Configure Row Level Security** — anyone may insert a validated message; only the authenticated owner can read, update, or delete.
6. **Add environment variables** — copy `.env.example` to `.env` and fill in the values. `SUPABASE_SERVICE_ROLE_KEY` and `EMAIL_API_KEY` are server-side only and must never be prefixed with `VITE_`.
7. **Configure email notifications** — set `EMAIL_API_KEY`, `EMAIL_SENDER_DOMAIN`, and `ADMIN_EMAIL`. Until a verified sender domain exists, notifications are logged server-side and submissions still succeed.
8. **Deploy the website.**
9. **Open `/admin`** and log in to read, filter, search, reply to, and delete messages.
