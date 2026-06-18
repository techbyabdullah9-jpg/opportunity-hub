import { Globe, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
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
  { label: "Category", title: "Languages", image: langImg, icon: "globe" },
  { label: "Category", title: "Tech Skills", image: techImg, icon: "monitor" },
  { label: "Category", title: "Schooling", image: schoolImg, icon: "globe" },
  { label: "Category", title: "Islamic Studies", image: islamicImg, icon: "globe" },
];

interface Props {
  preview?: boolean;
}

export default function CategoryGrid({ preview = false }: Props) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {CATEGORIES.map((c, i) => {
          const Icon = c.icon === "globe" ? Globe : Monitor;
          return (
            <CarouselItem key={c.title + i} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="relative h-full overflow-hidden rounded-2xl bg-[#142033] p-5 sm:p-6"
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
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="left-0" />
      <CarouselNext className="right-0" />
    </Carousel>
  );
}
