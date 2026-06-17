import { motion } from "framer-motion";
import register from "@/assets/proc-register.png";
import find from "@/assets/proc-find.png";
import book from "@/assets/proc-book.png";
import live from "@/assets/proc-live.png";
import feedback from "@/assets/proc-feedback.png";

const STEPS = [
  { n: 1, title: "REGISTER", image: register },
  { n: 2, title: "FIND TUTOR", image: find },
  { n: 3, title: "BOOK SLOT", image: book },
  { n: 3, title: "BOOK SLOT", image: book },
  { n: 4, title: "LEARN LIVE", image: live },
  { n: 5, title: "GIVE FEEDBACK", image: feedback },
];

export default function ProcessSection() {
  return (
    <section className="bg-[#f6f5f1] pt-12 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-sm font-extrabold tracking-[0.18em] text-gray-900">
          OUR COMPLETE PROCESS
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="relative overflow-hidden rounded-2xl bg-[#142033] p-6"
            >
              <div className="absolute left-5 top-3 text-3xl font-extrabold text-white/20">
                {s.n}
              </div>
              <div className="flex justify-end">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  width={120}
                  height={120}
                  className="h-24 w-24 object-contain"
                />
              </div>
              <h3 className="mt-4 text-xl font-extrabold tracking-wide text-white">
                {s.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}