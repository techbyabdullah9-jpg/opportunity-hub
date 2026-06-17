import { UserPlus, Search, Calendar, Video, Star } from "lucide-react";
import { motion } from "framer-motion";

const STEPS = [
  { n: 1, title: "REGISTER", Icon: UserPlus },
  { n: 2, title: "FIND TUTOR", Icon: Search },
  { n: 3, title: "BOOK SLOT", Icon: Calendar },
  { n: 3, title: "BOOK SLOT", Icon: Calendar },
  { n: 4, title: "LEARN LIVE", Icon: Video },
  { n: 5, title: "GIVE FEEDBACK", Icon: Star },
];

export default function ProcessSection() {
  return (
    <section className="bg-[#f6f5f1] pt-12 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-sm font-bold tracking-[0.15em] text-gray-900">
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
              className="relative rounded-2xl bg-[#142033] p-6"
            >
              <div className="absolute left-5 top-4 text-3xl font-extrabold text-white/15">
                {s.n}
              </div>
              <div className="flex justify-end">
                <div className="grid h-16 w-16 place-items-center rounded-xl bg-white/5">
                  <s.Icon className="h-8 w-8 text-[#f5c21a]" />
                </div>
              </div>
              <h3 className="mt-6 text-xl font-extrabold tracking-wide text-white">
                {s.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}