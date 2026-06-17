import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import FeaturedCategories from "@/components/FeaturedCategories";
import CategoryGrid from "@/components/CategoryGrid";
import TopInstructors from "@/components/TopInstructors";
import ProcessSection from "@/components/ProcessSection";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f5f1]">
      <div className="bg-hero-gradient">
        <Navbar />
        <Hero />
        <SearchBar />
      </div>

      <FeaturedCategories />

      <section className="bg-[#f6f5f1] pt-12 sm:pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-sm font-bold tracking-[0.15em] text-gray-900">
            EXPLORE OPPORTUNITIES
          </h2>
          <CategoryGrid />
        </div>
      </section>

      <TopInstructors />
      <ProcessSection />
      <Testimonials />
      <Footer />
    </main>
  );
}