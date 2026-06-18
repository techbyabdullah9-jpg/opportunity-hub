import { Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import inst1 from "@/assets/inst-1.jpg";
import inst2 from "@/assets/inst-2.jpg";
import inst3 from "@/assets/inst-3.jpg";
import inst4 from "@/assets/inst-4.jpg";

interface Testimonial {
  name: string;
  avatar: string;
  quote: string;
}

const ITEMS: Testimonial[] = [
  {
    name: "Miss Sana",
    avatar: inst2,
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore dolore magna magnis venam eaipat exercitat voluptat.",
  },
  {
    name: "Jehl",
    avatar: inst1,
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore dolore magna magnis venam eaipat exercitat voluptat.",
  },
  {
    name: "Atenue Sehor",
    avatar: inst3,
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore dolore magna magnis venam eaipat exercitat voluptat.",
  },
  {
    name: "Ali Hassan",
    avatar: inst4,
    quote:
      "Excellent platform for learning. The tutors are highly qualified and the booking system is seamless. Highly recommended for anyone looking to enhance their skills.",
  },
  {
    name: "Fatima Khan",
    avatar: inst2,
    quote:
      "My experience with Ustad Hub has been amazing. The tutors are patient and the quality of teaching is exceptional. Found the perfect tutor for my needs.",
  },
  {
    name: "Usman Malik",
    avatar: inst1,
    quote:
      "Great platform for online learning. The tutors are professional and the interface is very user-friendly. My children have improved significantly.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#f6f5f1] pt-12 sm:pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-2 text-sm font-extrabold tracking-[0.18em] text-gray-900">
          STUDENT TESTIMONIALS
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          Swipe to read more reviews
        </p>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {ITEMS.map((t, i) => (
              <CarouselItem key={t.name + i} className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/3">
                <div className="h-full rounded-2xl bg-[#142033] p-5 text-[#d0d4dc]">
                  <p className="text-sm leading-relaxed">{t.quote}</p>
                  <div className="mt-5 flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <div className="mt-0.5 flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star
                            key={j}
                            className="h-3 w-3 fill-[#f5c21a] text-[#f5c21a]"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </div>
    </section>
  );
}
