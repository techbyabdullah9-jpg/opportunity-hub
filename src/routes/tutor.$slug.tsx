import { createFileRoute, Link } from "@tanstack/react-router";
import TutorProfile from "@/pages/TutorProfile";

export const Route = createFileRoute("/tutor/$slug")({
  head: () => ({
    meta: [
      { title: "Tutor Profile — Ustad Hub" },
      { name: "description", content: "Book a session with top-rated tutors on Ustad Hub." },
    ],
  }),
  component: TutorPage,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-[#f6f5f1] px-4 text-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tutor not found</h1>
        <Link to="/" className="mt-4 inline-block text-[#f5c21a] underline">Go home</Link>
      </div>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="grid min-h-screen place-items-center bg-[#f6f5f1] px-4 text-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Something went wrong</h1>
        <button onClick={reset} className="mt-4 rounded bg-[#f5c21a] px-4 py-2 font-semibold">Try again</button>
      </div>
    </div>
  ),
});

function TutorPage() {
  const { slug } = Route.useParams();
  return <TutorProfile slug={slug} />;
}