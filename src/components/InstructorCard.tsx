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
    <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200/60">
      <div className="relative">
        <img
          src={instructor.cover}
          alt={instructor.name}
          loading="lazy"
          width={320}
          height={180}
          className="h-40 w-full object-cover"
        />
        <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-md bg-[#0c1422]/85 px-2 py-1 text-[10px] font-medium text-white backdrop-blur">
          <PlayCircle className="h-3 w-3 text-[#f5c21a]" />
          Intro Video
        </span>
        <button
          aria-label="Favorite"
          className="absolute right-2.5 top-2.5 grid h-7 w-7 place-items-center rounded-full bg-white/90 text-gray-600 transition hover:text-red-500"
        >
          <Heart className="h-3.5 w-3.5" />
        </button>
        <div className="absolute -bottom-6 left-4">
          <img
            src={instructor.avatar}
            alt={instructor.name}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full border-4 border-white object-cover"
          />
        </div>
      </div>

      <div className="px-4 pb-4 pt-8 text-left">
        <p className="text-[13px] font-semibold text-gray-900">
          {instructor.name}, {instructor.city}
        </p>
        <div className="mt-1.5">
          <span className="inline-block rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
            Skill Badges
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-[13px]">
          <span className="inline-flex items-center gap-1 text-gray-700">
            <Star className="h-3.5 w-3.5 fill-[#f5c21a] text-[#f5c21a]" />
            <span className="font-semibold">{instructor.rating.toFixed(1)}</span>
            <span className="text-gray-400">({instructor.reviews})</span>
          </span>
          <span className="font-semibold text-gray-800">{instructor.price}</span>
        </div>
        <button className="mt-3 w-full rounded-lg bg-[#f5c21a] py-2 text-[13px] font-semibold text-[#0c1422] transition hover:bg-[#ffcf33]">
          Book Trial Slot
        </button>
      </div>
    </div>
  );
}