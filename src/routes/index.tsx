import { createFileRoute } from "@tanstack/react-router";
import Home from "@/pages/Home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ustad Hub — Learn Skills & Languages with Expert Tutors" },
      { name: "description", content: "Pakistan's premier platform connecting expert tutors with ambitious students. Biometric verified, escrow protected." },
      { property: "og:title", content: "Ustad Hub" },
      { property: "og:description", content: "Learn languages, tech skills, schooling and Islamic studies from top-rated instructors." },
    ],
  }),
  component: Index,
});

function Index() {
  return <Home />;
}
