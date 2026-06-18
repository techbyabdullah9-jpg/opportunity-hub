import CategoryGrid from "./CategoryGrid";

export default function FeaturedCategories() {
  return (
    <section className="bg-[#f6f5f1] pt-12 sm:pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-sm font-extrabold tracking-[0.18em] text-gray-900">
          EXPLORE OPPORTUNITIES
        </h2>
        <p className="mb-6 mt-3 text-sm text-gray-600">
          Swipe to explore more categories
        </p>
        <CategoryGrid />
      </div>
    </section>
  );
}