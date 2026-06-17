import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Star,
  BadgeCheck,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  MapPin,
  BookOpen,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Globe,
  Award,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import inst1 from "@/assets/inst-1.jpg";
import inst2 from "@/assets/inst-2.jpg";
import inst3 from "@/assets/inst-3.jpg";
import inst4 from "@/assets/inst-4.jpg";

interface TutorData {
  name: string;
  title: string;
  avatar: string;
  rating: number;
  reviews: number;
  booked: number;
  responseTime: string;
  price: string;
  city: string;
  teach: string[];
  speak: { language: string; level: string }[];
}

const TUTORS: Record<string, TutorData> = {
  "sir-ahmed": {
    name: "Sir Ahmed",
    title: "Empowering Students with Customized Learning Support",
    avatar: inst1,
    rating: 5.0,
    reviews: 24,
    booked: 74,
    responseTime: "2 Hours",
    price: "Rs. 1,500",
    city: "Lahore, Pakistan",
    teach: ["Mathematics", "Physics", "Computer Science", "English", "Urdu"],
    speak: [
      { language: "Urdu", level: "Native" },
      { language: "English", level: "Fluent" },
    ],
  },
  "miss-sana": {
    name: "Miss Sana",
    title: "Helping students master languages with confidence",
    avatar: inst2,
    rating: 4.8,
    reviews: 98,
    booked: 132,
    responseTime: "1 Hour",
    price: "Rs. 1,500",
    city: "Karachi, Pakistan",
    teach: ["English", "IELTS", "Spoken English", "Arabic"],
    speak: [
      { language: "Urdu", level: "Native" },
      { language: "English", level: "Fluent" },
      { language: "Arabic", level: "Intermediate" },
    ],
  },
  "engr-bilal": {
    name: "Engr. Bilal",
    title: "Tech mentor for aspiring developers and engineers",
    avatar: inst3,
    rating: 4.9,
    reviews: 110,
    booked: 220,
    responseTime: "3 Hours",
    price: "Rs. 1,500",
    city: "Islamabad, Pakistan",
    teach: ["Web Development", "Python", "Data Structures", "Mathematics"],
    speak: [
      { language: "Urdu", level: "Native" },
      { language: "English", level: "Fluent" },
    ],
  },
  "miss-ayesha": {
    name: "Miss Ayesha",
    title: "Patient guide for school-level success",
    avatar: inst4,
    rating: 4.9,
    reviews: 132,
    booked: 180,
    responseTime: "2 Hours",
    price: "Rs. 1,500",
    city: "Rawalpindi, Pakistan",
    teach: ["Science", "Maths", "English", "General Knowledge"],
    speak: [
      { language: "Urdu", level: "Native" },
      { language: "English", level: "Fluent" },
    ],
  },
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function getWeek(offset: number) {
  const base = new Date();
  base.setDate(base.getDate() + offset * 7);
  const start = new Date(base);
  start.setDate(base.getDate() - base.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

const SLOTS = ["10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM"];

export default function TutorProfile({ slug }: { slug: string }) {
  const tutor = TUTORS[slug] ?? TUTORS["sir-ahmed"];
  const [weekOffset, setWeekOffset] = useState(0);
  const [tab, setTab] = useState<"education" | "experience" | "certs">("education");
  const [selected, setSelected] = useState<{ day: number; slot: string } | null>(null);
  const [booked, setBooked] = useState(false);

  const week = useMemo(() => getWeek(weekOffset), [weekOffset]);
  const rangeLabel = `${MONTHS[week[0].getMonth()]} ${week[0].getDate()} - ${MONTHS[week[6].getMonth()]} ${week[6].getDate()} ${week[6].getFullYear()}`;

  // pseudo-availability per day index in the week
  const availability: Record<number, string[]> = {
    1: SLOTS.slice(0, 3),
    2: SLOTS.slice(1, 4),
    3: SLOTS,
    4: SLOTS.slice(0, 2),
    5: SLOTS.slice(2),
  };

  return (
    <main className="min-h-screen bg-[#f6f5f1]">
      <div className="bg-hero-gradient">
        <Navbar />
      </div>

      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-xs text-gray-500 sm:px-6 lg:px-8">
          <Link to="/" className="hover:text-[#f5c21a]">Home</Link>
          <span>/</span>
          <Link to="/" className="hover:text-[#f5c21a]">Find Instructors</Link>
          <span>/</span>
          <span className="text-gray-900">{tutor.name}</span>
        </div>
      </div>

      {/* Header card */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <img
              src={tutor.avatar}
              alt={tutor.name}
              className="h-32 w-32 rounded-2xl object-cover ring-4 ring-[#f5c21a]/20 md:h-40 md:w-40"
            />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
                  {tutor.name}
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                  <BadgeCheck className="h-3.5 w-3.5" /> Verified
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-600">{tutor.title}</p>
              <p className="mt-3">
                <span className="text-2xl font-extrabold text-gray-900">{tutor.price}</span>
                <span className="text-sm text-gray-500"> /session</span>
                <span className="ml-2 text-xs text-gray-500">Starting from</span>
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
                <span className="inline-flex items-center gap-1">
                  <Star className="h-4 w-4 fill-[#f5c21a] text-[#f5c21a]" />
                  <b className="text-gray-900">{tutor.rating.toFixed(1)}</b>/5.0 ({tutor.reviews} reviews)
                </span>
                <span><b className="text-gray-900">{tutor.booked}</b> Booked sessions</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" /> {tutor.responseTime} response time</span>
                <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {tutor.city}</span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-gray-500">
                <span className="text-xs font-semibold uppercase tracking-wider">Social</span>
                {[Facebook, Twitter, Linkedin, Instagram, Youtube, Globe].map((Icon, i) => (
                  <a key={i} href="#" className="grid h-8 w-8 place-items-center rounded-full bg-gray-100 hover:bg-[#f5c21a]/20 hover:text-[#0c1422]">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Teach / Speak */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 p-5">
              <h3 className="mb-3 text-sm font-extrabold tracking-[0.18em] text-gray-900">I CAN TEACH</h3>
              <div className="flex flex-wrap gap-2">
                {tutor.teach.map((t) => (
                  <span key={t} className="rounded-full bg-[#f6f5f1] px-3 py-1 text-xs font-medium text-gray-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 p-5">
              <h3 className="mb-3 text-sm font-extrabold tracking-[0.18em] text-gray-900">I CAN SPEAK</h3>
              <div className="flex flex-wrap gap-2">
                {tutor.speak.map((s) => (
                  <span key={s.language} className="inline-flex items-center gap-1 rounded-full bg-[#f6f5f1] px-3 py-1 text-xs font-medium text-gray-700">
                    {s.language} <span className="text-gray-400">· {s.level}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="availability" className="bg-white pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 p-5 md:p-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-extrabold text-gray-900">Book a session</h2>
              <button className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600">
                Request a Session
              </button>
            </div>

            <div className="mb-5 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setWeekOffset(0)}
                className="rounded-md bg-[#f6f5f1] px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                Today
              </button>
              <div className="inline-flex items-center gap-2 rounded-md bg-[#f6f5f1] px-4 py-2 text-sm text-gray-700">
                <Calendar className="h-4 w-4" />
                {rangeLabel}
              </div>
            </div>

            <div className="flex items-stretch gap-2">
              <button
                onClick={() => setWeekOffset((v) => v - 1)}
                className="grid w-9 place-items-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
                aria-label="Previous week"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="grid flex-1 grid-cols-7 gap-2">
                {week.map((d, idx) => {
                  const slots = availability[idx] ?? [];
                  const isToday = d.toDateString() === new Date().toDateString();
                  return (
                    <div
                      key={idx}
                      className={`rounded-xl border p-2 text-center ${
                        isToday ? "border-[#f5c21a] bg-[#f5c21a]/10" : "border-gray-200 bg-white"
                      }`}
                    >
                      <p className="text-xs font-semibold text-gray-900">
                        {d.getDate()} {MONTHS[d.getMonth()]}
                      </p>
                      <p className="text-[10px] text-gray-500">{DAYS[d.getDay()]}</p>
                      <div className="mt-2 space-y-1">
                        {slots.length === 0 ? (
                          <div className="rounded-md bg-gray-50 py-2 text-[10px] text-gray-400">
                            No sessions
                          </div>
                        ) : (
                          slots.map((s) => {
                            const active = selected?.day === idx && selected?.slot === s;
                            return (
                              <button
                                key={s}
                                onClick={() => {
                                  setSelected({ day: idx, slot: s });
                                  setBooked(false);
                                }}
                                className={`block w-full rounded-md px-1 py-1 text-[10px] font-medium transition ${
                                  active
                                    ? "bg-[#0c1422] text-white"
                                    : "bg-[#f6f5f1] text-gray-700 hover:bg-[#f5c21a]/30"
                                }`}
                              >
                                {s}
                              </button>
                            );
                          })
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setWeekOffset((v) => v + 1)}
                className="grid w-9 place-items-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50"
                aria-label="Next week"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {selected && (
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#f6f5f1] p-4">
                <p className="text-sm text-gray-700">
                  Selected: <b className="text-gray-900">
                    {week[selected.day].getDate()} {MONTHS[week[selected.day].getMonth()]} · {selected.slot}
                  </b>
                </p>
                <button
                  onClick={() => setBooked(true)}
                  className="rounded-lg bg-[#f5c21a] px-5 py-2 text-sm font-semibold text-[#0c1422] hover:bg-[#ffcf33]"
                >
                  Confirm Booking
                </button>
              </div>
            )}
            {booked && (
              <p className="mt-3 text-sm font-medium text-emerald-700">
                ✓ Trial slot booked. We&apos;ll email you the meeting details shortly.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-[#f6f5f1] pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 border-b border-gray-200">
            {([
              ["education", "Education"],
              ["experience", "Experience"],
              ["certs", "Certification & Awards"],
            ] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`rounded-t-lg px-4 py-2 text-sm font-semibold transition ${
                  tab === key ? "bg-white text-gray-900" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="rounded-b-2xl rounded-tr-2xl bg-white p-6 md:p-8">
            {tab === "education" && (
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  { years: "2015 - 2019", degree: "Bachelor of Computer Science", inst: "Punjab University", loc: "Lahore, Pakistan" },
                  { years: "2020 - 2022", degree: "Master of Information Technology", inst: "FAST NUCES", loc: "Islamabad, Pakistan" },
                ].map((e) => (
                  <div key={e.degree}>
                    <p className="text-xs font-semibold text-gray-500">{e.years}</p>
                    <p className="mt-1 text-base font-bold text-gray-900">{e.degree}</p>
                    <p className="mt-1 inline-flex items-center gap-1 text-sm text-gray-600"><BookOpen className="h-4 w-4" /> {e.inst}</p>
                    <p className="inline-flex items-center gap-1 pl-3 text-sm text-gray-600"><MapPin className="h-4 w-4" /> {e.loc}</p>
                  </div>
                ))}
              </div>
            )}
            {tab === "experience" && (
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-gray-500">2020 - Present</p>
                  <p className="mt-1 text-base font-bold text-gray-900">Senior Tutor</p>
                  <p className="text-sm text-gray-600">Ustad Hub · Online</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500">2018 - 2020</p>
                  <p className="mt-1 text-base font-bold text-gray-900">Math &amp; Science Teacher</p>
                  <p className="text-sm text-gray-600">Beaconhouse School System</p>
                </div>
              </div>
            )}
            {tab === "certs" && (
              <div className="grid gap-4 md:grid-cols-2">
                {["TEFL Certified", "Google Educator Level 2", "IELTS Trainer Certification", "Khan Academy Mentor"].map((c) => (
                  <div key={c} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 p-4">
                    <Award className="h-5 w-5 text-[#f5c21a]" />
                    <span className="text-sm font-semibold text-gray-800">{c}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}