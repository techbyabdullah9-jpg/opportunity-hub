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

      {open && (
        <div className="border-t border-white/10 bg-[#0c1422] md:hidden">
          <div className="space-y-3 px-6 py-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="block text-sm font-medium text-white/90 hover:text-[#f5c21a]"
              >
                {l.label}
              </a>
            ))}
            <button className="w-full rounded-md bg-[#f5c21a] px-4 py-2 text-sm font-semibold text-[#0c1422]">
              Login / Register
            </button>
          </div>
        </div>
      )}
    </header>
  );
}