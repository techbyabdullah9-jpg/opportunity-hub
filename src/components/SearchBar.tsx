import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <section className="relative pb-12 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-lg"
        >
          <div className="flex flex-1 items-center gap-3 px-3">
            <Search className="h-5 w-5 shrink-0 text-gray-400" />
            <input
              type="text"
              placeholder="What skill, subject, or language do you want to master today?"
              className="w-full bg-transparent py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 sm:text-base"
            />
          </div>
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-[#f5c21a] px-5 py-3 text-sm font-semibold text-[#0c1422] transition hover:bg-[#ffcf33] sm:px-8"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
}