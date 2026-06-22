const TUTORS = {
  "sir-ahmed": {
    name: "Sir Ahmed",
    title: "Empowering Students with Customized Learning Support",
    avatar: "assets/inst-1.jpg",
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
    education: [
      { years: "2015 - 2019", degree: "Bachelor of Computer Science", inst: "Punjab University", loc: "Lahore, Pakistan" },
      { years: "2020 - 2022", degree: "Master of Information Technology", inst: "FAST NUCES", loc: "Islamabad, Pakistan" },
    ],
    experience: [
      { years: "2020 - Present", role: "Senior Tutor", company: "Ustad Hub · Online" },
      { years: "2018 - 2020", role: "Math & Science Teacher", company: "Beaconhouse School System" },
    ],
    certs: ["TEFL Certified", "Google Educator Level 2", "IELTS Trainer Certification", "Khan Academy Mentor"]
  },
  "miss-sana": {
    name: "Miss Sana",
    title: "Helping students master languages with confidence",
    avatar: "assets/inst-2.jpg",
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
    education: [
      { years: "2012 - 2016", degree: "BA in English Literature", inst: "Karachi University", loc: "Karachi, Pakistan" },
      { years: "2017 - 2019", degree: "MA in Applied Linguistics", inst: "SZABIST", loc: "Karachi, Pakistan" },
    ],
    experience: [
      { years: "2019 - Present", role: "Linguistics & IELTS Coach", company: "Ustad Hub · Online" },
      { years: "2016 - 2019", role: "English Lecturer", company: "The City School" },
    ],
    certs: ["CELTA Certified", "IELTS Official Trainer", "British Council Certified Partner"]
  },
  "engr-bilal": {
    name: "Engr. Bilal",
    title: "Tech mentor for aspiring developers and engineers",
    avatar: "assets/inst-3.jpg",
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
    education: [
      { years: "2016 - 2020", degree: "Bachelor of Software Engineering", inst: "NUST", loc: "Islamabad, Pakistan" },
    ],
    experience: [
      { years: "2021 - Present", role: "Full Stack Engineer & Mentor", company: "Ustad Hub · Online" },
      { years: "2020 - 2021", role: "Software Developer", company: "Systems Limited" },
    ],
    certs: ["AWS Certified Solutions Architect", "Google Professional Cloud Dev", "Python Institute PCEP"]
  },
  "miss-ayesha": {
    name: "Miss Ayesha",
    title: "Patient guide for school-level success",
    avatar: "assets/inst-4.jpg",
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
    education: [
      { years: "2014 - 2018", degree: "BS in Education", inst: "Fatima Jinnah Women University", loc: "Rawalpindi, Pakistan" },
    ],
    experience: [
      { years: "2018 - Present", role: "Junior School Tutor", company: "Ustad Hub · Online" },
      { years: "2018 - 2021", role: "Primary School Teacher", company: "Army Public School" },
    ],
    certs: ["Early Childhood Education Specialist", "STEM Educator Certificate"]
  }
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const SLOTS = ["10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM"];
const availability = {
  1: SLOTS.slice(0, 3), // Mon
  2: SLOTS.slice(1, 4), // Tue
  3: SLOTS,             // Wed
  4: SLOTS.slice(0, 2), // Thu
  5: SLOTS.slice(2)     // Fri
};

let currentTutor = null;
let weekOffset = 0;
let selectedSlot = null; // { dayIndex, slotText, date }
let activeTab = "education";

document.addEventListener("DOMContentLoaded", () => {
  // Extract tutor slug from URL search params
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug") || "sir-ahmed";
  currentTutor = TUTORS[slug] || TUTORS["sir-ahmed"];

  // Populate tutor information
  populateTutorDetails();

  // Calendar initialization
  renderCalendar();

  // Set up calendar navigation
  document.getElementById("prev-week-btn").addEventListener("click", () => {
    weekOffset--;
    selectedSlot = null; // clear selection on navigate
    hideConfirmationBox();
    renderCalendar();
  });

  document.getElementById("next-week-btn").addEventListener("click", () => {
    weekOffset++;
    selectedSlot = null;
    hideConfirmationBox();
    renderCalendar();
  });

  document.getElementById("today-week-btn").addEventListener("click", () => {
    weekOffset = 0;
    selectedSlot = null;
    hideConfirmationBox();
    renderCalendar();
  });

  // Confirm booking action
  document.getElementById("confirm-booking-btn").addEventListener("click", () => {
    if (selectedSlot) {
      document.getElementById("success-msg").classList.remove("hidden");
      if (window.showToast) {
        window.showToast(`Trial slot booked for ${selectedSlot.date} at ${selectedSlot.slotText}`);
      }
    }
  });

  // Tab buttons click actions
  const tabs = ["education", "experience", "certs"];
  tabs.forEach(tab => {
    const btn = document.getElementById(`tab-btn-${tab}`);
    if (btn) {
      btn.addEventListener("click", () => switchTab(tab));
    }
  });
  
  // Render tabs initially
  renderTabs();
});

function populateTutorDetails() {
  if (!currentTutor) return;

  // Header content
  document.getElementById("tutor-name").textContent = currentTutor.name;
  document.getElementById("breadcrumb-name").textContent = currentTutor.name;
  document.getElementById("tutor-title").textContent = currentTutor.title;
  document.getElementById("tutor-price").textContent = currentTutor.price;
  document.getElementById("tutor-rating").textContent = currentTutor.rating.toFixed(1);
  document.getElementById("tutor-reviews").textContent = `(${currentTutor.reviews} reviews)`;
  document.getElementById("tutor-booked").textContent = currentTutor.booked;
  document.getElementById("tutor-response").textContent = currentTutor.responseTime;
  document.getElementById("tutor-city").textContent = currentTutor.city;
  document.getElementById("tutor-avatar").src = currentTutor.avatar;
  document.getElementById("tutor-avatar").alt = currentTutor.name;

  // I CAN TEACH subjects
  const teachContainer = document.getElementById("teach-tags-container");
  teachContainer.innerHTML = "";
  currentTutor.teach.forEach(subject => {
    const span = document.createElement("span");
    span.className = "rounded-full bg-[#f6f5f1] px-3 py-1 text-xs font-medium text-gray-700";
    span.textContent = subject;
    teachContainer.appendChild(span);
  });

  // I CAN SPEAK languages
  const speakContainer = document.getElementById("speak-tags-container");
  speakContainer.innerHTML = "";
  currentTutor.speak.forEach(item => {
    const span = document.createElement("span");
    span.className = "inline-flex items-center gap-1 rounded-full bg-[#f6f5f1] px-3 py-1 text-xs font-medium text-gray-700";
    span.innerHTML = `${item.language} <span class="text-gray-400">· ${item.level}</span>`;
    speakContainer.appendChild(span);
  });
}

function getWeekDays(offset) {
  const base = new Date();
  base.setDate(base.getDate() + offset * 7);
  const start = new Date(base);
  // Get Sunday of the current base week
  start.setDate(base.getDate() - base.getDay());
  
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

function renderCalendar() {
  const weekDays = getWeekDays(weekOffset);
  
  // Update Date Range Label (e.g. "Jun 21 - Jun 27 2026")
  const startMonth = MONTHS[weekDays[0].getMonth()];
  const startDate = weekDays[0].getDate();
  const endMonth = MONTHS[weekDays[6].getMonth()];
  const endDate = weekDays[6].getDate();
  const endYear = weekDays[6].getFullYear();
  
  document.getElementById("date-range-label").textContent = `${startMonth} ${startDate} - ${endMonth} ${endDate} ${endYear}`;

  // Get calendar columns container
  const columnsContainer = document.getElementById("calendar-columns");
  columnsContainer.innerHTML = "";

  const todayStr = new Date().toDateString();

  weekDays.forEach((date, idx) => {
    const isToday = date.toDateString() === todayStr;
    const slots = availability[idx] || [];

    const column = document.createElement("div");
    column.className = `rounded-xl border p-2 text-center flex flex-col justify-between ${
      isToday ? "border-[#f5c21a] bg-[#f5c21a]/10" : "border-gray-200 bg-white"
    }`;

    // Header date block
    const dateHtml = `
      <div>
        <p class="text-xs font-semibold text-gray-900">${date.getDate()} ${MONTHS[date.getMonth()]}</p>
        <p class="text-[10px] text-gray-500">${DAYS[date.getDay()]}</p>
      </div>
    `;
    
    // Slots container
    const slotsDiv = document.createElement("div");
    slotsDiv.className = "mt-2 space-y-1";

    if (slots.length === 0) {
      slotsDiv.innerHTML = `<div class="rounded-md bg-gray-50 py-2 text-[10px] text-gray-400">No sessions</div>`;
    } else {
      slots.forEach(slot => {
        const button = document.createElement("button");
        const isSelected = selectedSlot && selectedSlot.dayIndex === idx && selectedSlot.slotText === slot;
        
        button.className = `block w-full rounded-md px-1 py-1 text-[10px] font-medium transition ${
          isSelected
            ? "bg-[#0c1422] text-white"
            : "bg-[#f6f5f1] text-gray-700 hover:bg-[#f5c21a]/30"
        }`;
        button.textContent = slot;
        button.addEventListener("click", () => selectSlot(idx, slot, date));
        slotsDiv.appendChild(button);
      });
    }

    column.innerHTML = dateHtml;
    column.appendChild(slotsDiv);
    columnsContainer.appendChild(column);
  });
}

function selectSlot(dayIndex, slotText, date) {
  const formattedDate = `${date.getDate()} ${MONTHS[date.getMonth()]}`;
  selectedSlot = { dayIndex, slotText, date: formattedDate };
  
  // Render calendar to update selection styles
  renderCalendar();
  
  // Hide success message if selecting another slot
  document.getElementById("success-msg").classList.add("hidden");

  // Show booking confirmation container
  const confirmBox = document.getElementById("confirm-booking-box");
  const textEl = document.getElementById("confirm-booking-text");
  
  textEl.innerHTML = `Selected: <b class="text-gray-900">${formattedDate} · ${slotText}</b>`;
  confirmBox.classList.remove("hidden");
}

function hideConfirmationBox() {
  document.getElementById("confirm-booking-box").classList.add("hidden");
  document.getElementById("success-msg").classList.add("hidden");
}

function switchTab(tabId) {
  activeTab = tabId;
  
  // Update button active classes
  const tabs = ["education", "experience", "certs"];
  tabs.forEach(tab => {
    const btn = document.getElementById(`tab-btn-${tab}`);
    if (btn) {
      if (tab === tabId) {
        btn.className = "rounded-t-lg px-4 py-2 text-sm font-semibold bg-white text-gray-900 border-b border-white";
      } else {
        btn.className = "rounded-t-lg px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700";
      }
    }
  });

  renderTabs();
}

function renderTabs() {
  const contentDiv = document.getElementById("tab-content-container");
  if (!contentDiv || !currentTutor) return;

  contentDiv.innerHTML = "";

  if (activeTab === "education") {
    const grid = document.createElement("div");
    grid.className = "grid gap-6 md:grid-cols-2";
    
    currentTutor.education.forEach(edu => {
      const item = document.createElement("div");
      item.innerHTML = `
        <p class="text-xs font-semibold text-gray-500">${edu.years}</p>
        <p class="mt-1 text-base font-bold text-gray-900">${edu.degree}</p>
        <div class="mt-1 flex flex-wrap text-sm text-gray-600 gap-x-4">
          <span class="inline-flex items-center gap-1"><i data-lucide="book-open" class="h-4 w-4"></i> ${edu.inst}</span>
          <span class="inline-flex items-center gap-1"><i data-lucide="map-pin" class="h-4 w-4"></i> ${edu.loc}</span>
        </div>
      `;
      grid.appendChild(item);
    });
    contentDiv.appendChild(grid);

  } else if (activeTab === "experience") {
    const space = document.createElement("div");
    space.className = "space-y-4";
    
    currentTutor.experience.forEach(exp => {
      const item = document.createElement("div");
      item.innerHTML = `
        <p class="text-xs font-semibold text-gray-500">${exp.years}</p>
        <p class="mt-1 text-base font-bold text-gray-900">${exp.role}</p>
        <p class="text-sm text-gray-600">${exp.company}</p>
      `;
      space.appendChild(item);
    });
    contentDiv.appendChild(space);

  } else if (activeTab === "certs") {
    const grid = document.createElement("div");
    grid.className = "grid gap-4 md:grid-cols-2";
    
    currentTutor.certs.forEach(cert => {
      const item = document.createElement("div");
      item.className = "inline-flex items-center gap-2 rounded-xl border border-gray-200 p-4";
      item.innerHTML = `
        <i data-lucide="award" class="h-5 w-5 text-[#f5c21a]"></i>
        <span class="text-sm font-semibold text-gray-800">${cert}</span>
      `;
      grid.appendChild(item);
    });
    contentDiv.appendChild(grid);
  }

  // Reinitalize icons for newly rendered content
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}
