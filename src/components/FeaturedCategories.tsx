import CategoryGrid from "./CategoryGrid";

export default function FeaturedCategories() {
  return (
    <section className="bg-[#f6f5f1] pt-12 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold tracking-[0.15em] text-gray-700">
          EXPLORE OPPORTUNITIES
        </p>
        <h2 className="mb-6 mt-3 text-xl font-bold text-gray-900">
          Teacher Preview
        </h2>
        <CategoryGrid preview />
      </div>
    </section>
  );
}