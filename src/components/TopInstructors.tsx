import InstructorCard, { type Instructor } from "./InstructorCard";
import inst1 from "@/assets/inst-1.jpg";
import inst2 from "@/assets/inst-2.jpg";
import inst3 from "@/assets/inst-3.jpg";

const INSTRUCTORS: Instructor[] = [
  { name: "Sir Ahmed", city: "Lahore", rating: 4.9, reviews: 120, price: "Rs. 1,500/hr", cover: inst1, avatar: inst1 },
  { name: "Miss Sana", city: "Karachi", rating: 4.8, reviews: 98, price: "Rs. 1,500/hr", cover: inst2, avatar: inst2 },
  { name: "Engr. Bilal", city: "Islamabad", rating: 4.9, reviews: 110, price: "Rs. 1,500/hr", cover: inst3, avatar: inst3 },
];

export default function TopInstructors() {
  return (
    <section className="bg-[#f6f5f1] pt-10 sm:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-5 text-sm font-extrabold tracking-[0.18em] text-gray-900">
          TOP-RATED INSTRUCTORS
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INSTRUCTORS.map((i) => (
            <InstructorCard key={i.name} instructor={i} />
          ))}
        </div>
      </div>
    </section>
  );
}