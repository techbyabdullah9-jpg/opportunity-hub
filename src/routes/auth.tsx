import { createFileRoute } from "@tanstack/react-router";
import AuthPage from "@/pages/Auth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Login & Register — Ustad Hub" },
      { name: "description", content: "Sign in or create an account to start learning with Ustad Hub." },
      { property: "og:title", content: "Join Ustad Hub — Learn & Teach Worldwide" },
      { property: "og:description", content: "Create your free account and connect with expert tutors." },
    ],
  }),
  component: AuthPage,
});
