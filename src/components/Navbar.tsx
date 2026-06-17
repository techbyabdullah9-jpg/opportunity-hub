import { Zap, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Find Instructors", href: "#" },
    { label: "Blogs", href: "#" },
    { label: "How It Works", href: "#" },
  ];
  return (
    <header className="relative z-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2">
          <Zap className="h-6 w-6 fill-[#f5c21a] text-[#f5c21a]" />
          <span className="text-xl font-extrabold tracking-wide text-white">
            USTAD <span className="text-[#f5c21a]">HUB</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-white/90 transition hover:text-[#f5c21a]"
            >
              {l.label}
            </a>
          ))}
          <button className="rounded-md bg-[#f5c21a] px-4 py-2 text-sm font-semibold text-[#0c1422] transition hover:bg-[#ffcf33]">
            Login / Register
          </button>
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="text-white md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile slide-in panel from right */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed right-0 top-0 z-40 h-full w-72 max-w-[80%] transform bg-[#0c1422] shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <span className="text-base font-extrabold tracking-wide text-white">
            USTAD <span className="text-[#f5c21a]">HUB</span>
          </span>
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-4 px-5 py-5">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-white/90 hover:text-[#f5c21a]"
            >
              {l.label}
            </a>
          ))}
          <button className="mt-2 w-full rounded-md bg-[#f5c21a] px-4 py-2 text-sm font-semibold text-[#0c1422]">
            Login / Register
          </button>
        </div>
      </aside>
    </header>
  );
}