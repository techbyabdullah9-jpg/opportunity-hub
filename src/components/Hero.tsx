import { motion } from "framer-motion";
import heroAi from "@/assets/hero-ai.png";

export default function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-10 pt-6 sm:px-6 md:grid-cols-[1.4fr_1fr] md:pb-16 md:pt-10 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-[56px]">
            Sikhye Apni Zabaan
            <br />
            Men,Kamyabi Hasil Karein
            <br />
            International!
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#d0d4dc] sm:text-base">
            Pakistan's premier enterprise platform connecting expert tutors with
            ambitious students. Backed by biometric verification and escrow
            contract protection.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex justify-center md:justify-end"
        >
          <img
            src={heroAi}
            alt="AI illustration"
            width={520}
            height={520}
            className="h-72 w-72 object-contain sm:h-80 sm:w-80 md:h-[420px] md:w-[420px] lg:h-[460px] lg:w-[460px]"
          />
        </motion.div>
      </div>
    </section>
  );
}