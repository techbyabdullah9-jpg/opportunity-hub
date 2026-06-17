import { Zap, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-12 bg-[#0c1422] text-[#d0d4dc] sm:mt-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 sm:px-6 md:grid-cols-5 lg:px-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 fill-[#f5c21a] text-[#f5c21a]" />
            <span className="text-lg font-extrabold text-white">
              USTAD <span className="text-[#f5c21a]">HUB</span>
            </span>
          </div>
          <div className="mt-4 flex gap-3 text-white">
            <a href="#" aria-label="Twitter" className="hover:text-[#f5c21a]">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-[#f5c21a]">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-[#f5c21a]">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        <FooterCol
          title="CATEGORIES"
          links={["Languages", "Tech", "Schooling", "Advertising"]}
        />
        <FooterCol title="COMPANY" links={["About", "Careers", "Contact"]} />
        <FooterCol title="LEGAL" links={["Privacy Policy", "Terms of Service"]} />

        <div>
          <p className="mb-3 text-xs font-bold tracking-[0.15em] text-white">
            NEWSLETTER
          </p>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Email your address"
              className="rounded-md bg-white/5 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10 placeholder:text-white/40 focus:ring-[#f5c21a]"
            />
            <button className="rounded-md bg-[#f5c21a] py-2 text-sm font-semibold text-[#0c1422] hover:bg-[#ffcf33]">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <p className="mb-3 text-xs font-bold tracking-[0.15em] text-white">
        {title}
      </p>
      <ul className="space-y-2 text-sm">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="transition hover:text-[#f5c21a]">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}