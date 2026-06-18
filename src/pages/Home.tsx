import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import FeaturedCategories from "@/components/FeaturedCategories";
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

      <TopInstructors />
      <ProcessSection />
      <Testimonials />
      <Footer />
    </main>
  );
}