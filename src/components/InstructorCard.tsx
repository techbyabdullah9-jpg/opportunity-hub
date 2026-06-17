import { Star, Heart, PlayCircle } from "lucide-react";

export interface Instructor {
  name: string;
  city: string;
  rating: number;
  reviews: number;
  price: string;
  cover: string;
  avatar: string;
}

export default function InstructorCard({ instructor }: { instructor: Instructor }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/60">
      <div className="relative">
        <img
          src={instructor.cover}
          alt={instructor.name}
          loading="lazy"
          width={400}
          height={240}
          className="h-44 w-full object-cover sm:h-48"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-[#0c1422]/85 px-2 py-1 text-[11px] font-medium text-white backdrop-blur">
          <PlayCircle className="h-3.5 w-3.5 text-[#f5c21a]" />
          Intro Video
        </span>
        <button
          aria-label="Favorite"
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-gray-600 transition hover:text-red-500"
        >
          <Heart className="h-4 w-4" />
        </button>
        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2">
          <img
            src={instructor.avatar}
            alt={instructor.name}
            width={56}
            height={56}
            className="h-14 w-14 rounded-full border-4 border-white object-cover"
          />
        </div>
      </div>

      <div className="px-4 pb-4 pt-9 text-center">
        <p className="text-sm font-semibold text-gray-900">
          {instructor.name}, {instructor.city}
        </p>
        <div className="mt-2 flex justify-center">
          <span className="rounded-md bg-gray-100 px-2 py-1 text-[11px] font-medium text-gray-600">
            Skill Badges
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="inline-flex items-center gap-1 text-gray-700">
            <Star className="h-4 w-4 fill-[#f5c21a] text-[#f5c21a]" />
            <span className="font-semibold">{instructor.rating.toFixed(1)}</span>
            <span className="text-gray-400">({instructor.reviews})</span>
          </span>
          <span className="font-semibold text-gray-800">{instructor.price}</span>
        </div>
        <button className="mt-4 w-full rounded-lg bg-[#f5c21a] py-2.5 text-sm font-semibold text-[#0c1422] transition hover:bg-[#ffcf33]">
          Book Trial Slot
        </button>
      </div>
    </div>
  );
}