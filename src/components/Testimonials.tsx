import { Star } from "lucide-react";
import inst1 from "@/assets/inst-1.jpg";
import inst2 from "@/assets/inst-2.jpg";
import inst3 from "@/assets/inst-3.jpg";

interface Testimonial {
  name: string;
  avatar: string;
  quote: string;
}

const ITEMS: Testimonial[] = [
  {
    name: "Miss Sana",
    avatar: inst2,
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore dolore magna magnis venam eaipat exercitat voluptat.",
  },
  {
    name: "Jehl",
    avatar: inst1,
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore dolore magna magnis venam eaipat exercitat voluptat.",
  },
  {
    name: "Atenue Sehor",
    avatar: inst3,
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore dolore magna magnis venam eaipat exercitat voluptat.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#f6f5f1] pt-12 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-sm font-extrabold tracking-[0.18em] text-gray-900">
          STUDENT TESTIMONIALS
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl bg-[#142033] p-5 text-[#d0d4dc]"
            >
              <p className="text-sm leading-relaxed">{t.quote}</p>
              <div className="mt-5 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <div className="mt-0.5 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 fill-[#f5c21a] text-[#f5c21a]"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}