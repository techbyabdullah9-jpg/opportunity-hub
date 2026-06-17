import { Globe, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import langImg from "@/assets/cat-languages.png";
import techImg from "@/assets/cat-tech.png";
import schoolImg from "@/assets/cat-schooling.png";
import islamicImg from "@/assets/cat-islamic.png";

export interface Category {
  label: string;
  title: string;
  image: string;
  icon: "globe" | "monitor";
}

const CATEGORIES: Category[] = [
  { label: "Language", title: "Languages", image: langImg, icon: "globe" },
  { label: "Tech Skills", title: "Tech Skills", image: techImg, icon: "monitor" },
  { label: "Category", title: "Schooling", image: schoolImg, icon: "globe" },
  { label: "Category", title: "Islamic Studies", image: islamicImg, icon: "globe" },
];

interface Props {
  preview?: boolean;
}

export default function CategoryGrid({ preview = false }: Props) {
  const items = preview ? CATEGORIES.slice(0, 2) : CATEGORIES;
  return (
    <div className={`grid gap-5 sm:gap-6 ${preview ? "sm:grid-cols-2" : "sm:grid-cols-2"}`}>
      {items.map((c, i) => {
        const Icon = c.icon === "globe" ? Globe : Monitor;
        return (
          <motion.div
            key={c.title + i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="relative overflow-hidden rounded-2xl bg-[#142033] p-5 sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-12 sm:gap-16">
                <div className="inline-flex w-fit items-center gap-2 rounded-md bg-white/5 px-2.5 py-1 text-xs font-medium text-white/70">
                  <Icon className="h-3.5 w-3.5" />
                  {c.label}
                </div>
                <h3 className="text-2xl font-bold text-white sm:text-3xl">
                  {c.title}
                </h3>
              </div>
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                width={160}
                height={160}
                className="h-28 w-28 object-contain sm:h-32 sm:w-32"
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}