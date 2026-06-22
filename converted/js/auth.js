// Default Mock Users database
const MOCK_USERS = [
  {
    email: "student@ustadhub.com",
    password: "password123",
    fullName: "John Student",
    username: "john_student",
    role: "student"
  },
  {
    email: "tutor@ustadhub.com",
    password: "password123",
    fullName: "Sir Ahmed",
    username: "sir_ahmed",
    role: "instructor"
  }
];

// Initialize database in localStorage
if (!localStorage.getItem("usersList")) {
  localStorage.setItem("usersList", JSON.stringify(MOCK_USERS));
}

let selectedRole = null; // "student" | "instructor" | null
let selectedInterests = [];
let selectedCategories = [];
let selectedLanguages = [];

document.addEventListener("DOMContentLoaded", () => {
  // Setup password visibility toggles
  setupPasswordToggles();

  // Handle Login form submit
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLoginSubmit);
  }

  // Initial setup: ensure Login is shown by default if we land here
  // setAuthView("login"); // By default HTML has login visible and register hidden


  // Handle register form submissions
  setupRegistrationFormHandlers();
});

// Switch Login/Register Main Views
window.setAuthView = function(view) {
  const loginView = document.getElementById("login-view-container");
  const registerView = document.getElementById("register-view-container");
  const tabLogin = document.getElementById("tab-login");
  const tabRegister = document.getElementById("tab-register");

  if (!loginView || !registerView || !tabLogin || !tabRegister) return;

  if (view === "login") {
    loginView.classList.remove("hidden");
    registerView.classList.add("hidden");
    
    tabLogin.className = "flex-1 rounded-lg bg-white py-2.5 text-sm font-bold text-gray-900 shadow-sm transition-all ring-1 ring-gray-900/5";
    tabRegister.className = "flex-1 rounded-lg py-2.5 text-sm font-semibold text-gray-500 transition-all hover:text-gray-900";
  } else if (view === "register") {
    loginView.classList.add("hidden");
    registerView.classList.remove("hidden");
    
    tabLogin.className = "flex-1 rounded-lg py-2.5 text-sm font-semibold text-gray-500 transition-all hover:text-gray-900";
    tabRegister.className = "flex-1 rounded-lg bg-white py-2.5 text-sm font-bold text-gray-900 shadow-sm transition-all ring-1 ring-gray-900/5";

    // Default to student if no role is selected
    if (!selectedRole) {
      setRegistrationRole("student");
    }
  }
};

// Switch registration views
window.setRegistrationRole = function(role) {
  selectedRole = role;
  
  const studentFormDiv = document.getElementById("student-reg-form-container");
  const instructorFormDiv = document.getElementById("instructor-reg-form-container");
  const subtabStudent = document.getElementById("subtab-student");
  const subtabInstructor = document.getElementById("subtab-instructor");

  if (!studentFormDiv || !instructorFormDiv || !subtabStudent || !subtabInstructor) return;

  // Reset arrays
  selectedInterests = [];
  selectedCategories = [];
  selectedLanguages = [];

  if (role === "student") {
    studentFormDiv.classList.remove("hidden");
    instructorFormDiv.classList.add("hidden");
    
    subtabStudent.className = "flex-1 rounded-lg bg-[#f5c21a] py-2 text-sm font-bold text-[#0c1422] transition-all flex items-center justify-center gap-2 shadow-sm";
    subtabInstructor.className = "flex-1 rounded-lg py-2 text-sm font-medium text-[#d0d4dc] transition-all hover:text-white flex items-center justify-center gap-2";

    initializeMultiSelects("student");
  } else if (role === "instructor") {
    studentFormDiv.classList.add("hidden");
    instructorFormDiv.classList.remove("hidden");
    
    subtabStudent.className = "flex-1 rounded-lg py-2 text-sm font-medium text-[#d0d4dc] transition-all hover:text-white flex items-center justify-center gap-2";
    subtabInstructor.className = "flex-1 rounded-lg bg-[#f5c21a] py-2 text-sm font-bold text-[#0c1422] transition-all flex items-center justify-center gap-2 shadow-sm";
    
    initializeMultiSelects("instructor");
  }
};

// Global change role action
window.changeRegistrationRole = function() {
  setAuthView("register");
  setRegistrationRole("student");
};

// Setup eye toggles for password fields
function setupPasswordToggles() {
  const toggleButtons = document.querySelectorAll(".password-toggle");
  toggleButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const inputId = btn.getAttribute("data-target");
      const input = document.getElementById(inputId);
      const icon = btn.querySelector("i");

      if (input && icon) {
        if (input.type === "password") {
          input.type = "text";
          icon.setAttribute("data-lucide", "eye-off");
        } else {
          input.type = "password";
          icon.setAttribute("data-lucide", "eye");
        }
        // Redraw icons
        if (typeof lucide !== "undefined") {
          lucide.createIcons();
        }
      }
    });
  });
}

// Multi-select tags initializer
function initializeMultiSelects(role) {
  if (role === "student") {
    const tags = document.querySelectorAll("#student-interests-container .interest-tag");
    tags.forEach(tag => {
      tag.classList.remove("active"); // reset
      tag.addEventListener("click", (e) => {
        e.preventDefault();
        const value = tag.getAttribute("data-value");
        if (selectedInterests.includes(value)) {
          selectedInterests = selectedInterests.filter(i => i !== value);
          tag.classList.remove("active");
        } else {
          selectedInterests.push(value);
          tag.classList.add("active");
        }
      });
    });
  } else if (role === "instructor") {
    const catTags = document.querySelectorAll("#instructor-categories-container .category-tag");
    catTags.forEach(tag => {
      tag.classList.remove("active");
      tag.addEventListener("click", (e) => {
        e.preventDefault();
        const value = tag.getAttribute("data-value");
        if (selectedCategories.includes(value)) {
          selectedCategories = selectedCategories.filter(c => c !== value);
          tag.classList.remove("active");
        } else {
          selectedCategories.push(value);
          tag.classList.add("active");
        }
      });
    });

    const langTags = document.querySelectorAll("#instructor-languages-container .language-tag");
    langTags.forEach(tag => {
      tag.classList.remove("active");
      tag.addEventListener("click", (e) => {
        e.preventDefault();
        const value = tag.getAttribute("data-value");
        if (selectedLanguages.includes(value)) {
          selectedLanguages = selectedLanguages.filter(l => l !== value);
          tag.classList.remove("active");
        } else {
          selectedLanguages.push(value);
          tag.classList.add("active");
        }
      });
    });
  }
}

// Handle simulated login
function handleLoginSubmit(e) {
  e.preventDefault();
  
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  const loginError = document.getElementById("login-error");
  const loginSuccess = document.getElementById("login-success");
  const submitBtn = e.target.querySelector("button[type='submit']");

  // Clean alerts
  loginError.classList.add("hidden");
  loginSuccess.classList.add("hidden");

  if (!email || !password) {
    showError(loginError, "Please enter both email and password.");
    return;
  }

  // Set loading state
  setBtnLoading(submitBtn, true, "Signing In...");

  setTimeout(() => {
    const users = JSON.parse(localStorage.getItem("usersList")) || [];
    const matchedUser = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (matchedUser) {
      // Save current user session
      localStorage.setItem("currentUser", JSON.stringify(matchedUser));
      
      loginSuccess.classList.remove("hidden");
      loginSuccess.querySelector("span").textContent = "Login successful! Redirecting...";

      if (window.showToast) {
        window.showToast(`Logged in successfully as ${matchedUser.fullName || matchedUser.username}`);
      }

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    } else {
      setBtnLoading(submitBtn, false);
      showError(loginError, "Invalid email or password.");
    }
  }, 1000);
}

// Registration Handlers setup
function setupRegistrationFormHandlers() {
  const studentForm = document.getElementById("student-reg-form");
  if (studentForm) {
    studentForm.addEventListener("submit", handleStudentRegister);
  }

  const instructorForm = document.getElementById("instructor-reg-form");
  if (instructorForm) {
    instructorForm.addEventListener("submit", handleInstructorRegister);
  }
}

// Handle Student registration submit
function handleStudentRegister(e) {
  e.preventDefault();
  
  const errorEl = document.getElementById("student-error");
  const successEl = document.getElementById("student-success");
  const submitBtn = e.target.querySelector("button[type='submit']");
  
  errorEl.classList.add("hidden");
  successEl.classList.add("hidden");

  const fullName = document.getElementById("student-name").value.trim();
  const username = document.getElementById("student-username").value.trim();
  const email = document.getElementById("student-email").value.trim();
  const phone = document.getElementById("student-phone").value.trim();
  const dob = document.getElementById("student-dob").value;
  const country = document.getElementById("student-country").value;
  const city = document.getElementById("student-city").value.trim();
  const preferredLang = document.getElementById("student-lang").value;
  const password = document.getElementById("student-password").value;
  const confirmPassword = document.getElementById("student-confirm-password").value;
  const acceptTerms = document.getElementById("student-terms").checked;

  // Validations
  if (!fullName || !username || !email || !country || !city || !preferredLang || !password) {
    showError(errorEl, "Please fill in all required fields.");
    return;
  }

  if (username.length < 3 || !/^[a-zA-Z0-9_]+$/.test(username)) {
    showError(errorEl, "Username must be at least 3 characters and contain only alphanumeric characters or underscores.");
    return;
  }

  if (password.length < 8) {
    showError(errorEl, "Password must be at least 8 characters long.");
    return;
  }

  if (password !== confirmPassword) {
    showError(errorEl, "Passwords do not match.");
    return;
  }

  if (selectedInterests.length === 0) {
    showError(errorEl, "Please select at least one learning interest tag.");
    return;
  }

  if (!acceptTerms) {
    showError(errorEl, "You must accept the Terms of Service & Privacy Policy.");
    return;
  }

  setBtnLoading(submitBtn, true, "Registering...");

  setTimeout(() => {
    const users = JSON.parse(localStorage.getItem("usersList")) || [];
    
    // Check duplicates
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      setBtnLoading(submitBtn, false);
      showError(errorEl, "Email address is already registered.");
      return;
    }
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
      setBtnLoading(submitBtn, false);
      showError(errorEl, "Username is already taken.");
      return;
    }

    // Save student profile
    const newUser = {
      fullName,
      username,
      email,
      phone,
      dob,
      country,
      city,
      learningInterests: selectedInterests,
      preferredLanguage: preferredLang,
      password,
      role: "student"
    };

    users.push(newUser);
    localStorage.setItem("usersList", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    successEl.classList.remove("hidden");
    successEl.querySelector("span").textContent = "Registration successful! Redirecting...";
    
    if (window.showToast) {
      window.showToast("Registered as Student successfully!");
    }

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  }, 1000);
}

// Handle Instructor registration submit
function handleInstructorRegister(e) {
  e.preventDefault();

  const errorEl = document.getElementById("instructor-error");
  const successEl = document.getElementById("instructor-success");
  const submitBtn = e.target.querySelector("button[type='submit']");
  
  errorEl.classList.add("hidden");
  successEl.classList.add("hidden");

  const fullName = document.getElementById("inst-name").value.trim();
  const displayName = document.getElementById("inst-display").value.trim();
  const username = document.getElementById("inst-username").value.trim();
  const email = document.getElementById("inst-email").value.trim();
  const phone = document.getElementById("inst-phone").value.trim();
  const experience = document.getElementById("inst-exp").value;
  const country = document.getElementById("inst-country").value;
  const city = document.getElementById("inst-city").value.trim();
  const headline = document.getElementById("inst-headline").value.trim();
  const bio = document.getElementById("inst-bio").value.trim();
  const linkedinUrl = document.getElementById("inst-linkedin").value.trim();
  const websiteUrl = document.getElementById("inst-web").value.trim();
  const password = document.getElementById("inst-password").value;
  const confirmPassword = document.getElementById("inst-confirm-password").value;
  const acceptTerms = document.getElementById("inst-terms").checked;

  // Validations
  if (!fullName || !displayName || !username || !email || !phone || !experience || !country || !city || !headline || !password) {
    showError(errorEl, "Please fill in all required fields.");
    return;
  }

  if (username.length < 3 || !/^[a-zA-Z0-9_]+$/.test(username)) {
    showError(errorEl, "Username must be at least 3 characters and contain only alphanumeric characters or underscores.");
    return;
  }

  if (password.length < 8) {
    showError(errorEl, "Password must be at least 8 characters long.");
    return;
  }

  if (password !== confirmPassword) {
    showError(errorEl, "Passwords do not match.");
    return;
  }

  if (selectedCategories.length === 0) {
    showError(errorEl, "Please select at least one teaching subject tag.");
    return;
  }

  if (selectedLanguages.length === 0) {
    showError(errorEl, "Please select at least one spoken language tag.");
    return;
  }

  if (!acceptTerms) {
    showError(errorEl, "You must accept the Terms of Service & Privacy Policy.");
    return;
  }

  // URL checking
  if (linkedinUrl && !linkedinUrl.startsWith("http")) {
    showError(errorEl, "Please enter a valid LinkedIn profile URL (including http:// or https://).");
    return;
  }

  if (websiteUrl && !websiteUrl.startsWith("http")) {
    showError(errorEl, "Please enter a valid website URL (including http:// or https://).");
    return;
  }

  setBtnLoading(submitBtn, true, "Registering...");

  setTimeout(() => {
    const users = JSON.parse(localStorage.getItem("usersList")) || [];
    
    // Check duplicates
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      setBtnLoading(submitBtn, false);
      showError(errorEl, "Email address is already registered.");
      return;
    }
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
      setBtnLoading(submitBtn, false);
      showError(errorEl, "Username is already taken.");
      return;
    }

    // Save instructor profile
    const newUser = {
      fullName,
      displayName,
      username,
      email,
      phone,
      experience,
      country,
      city,
      headline,
      bio,
      teachingCategories: selectedCategories,
      languagesSpoken: selectedLanguages,
      linkedinUrl,
      websiteUrl,
      password,
      role: "instructor"
    };

    users.push(newUser);
    localStorage.setItem("usersList", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    successEl.classList.remove("hidden");
    successEl.querySelector("span").textContent = "Registration successful! Redirecting...";

    if (window.showToast) {
      window.showToast("Registered as Instructor successfully!");
    }

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  }, 1000);
}

// Helpers
function showError(element, message) {
  element.querySelector("span").textContent = message;
  element.classList.remove("hidden");
  element.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function setBtnLoading(button, isLoading, text = "") {
  if (isLoading) {
    button.disabled = true;
    button.setAttribute("data-original-text", button.innerHTML);
    button.innerHTML = `
      <svg class="animate-spin h-4 w-4 mr-2 inline-block text-current" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      ${text}
    `;
  } else {
    button.disabled = false;
    if (button.hasAttribute("data-original-text")) {
      button.innerHTML = button.getAttribute("data-original-text");
    }
  }
}

// Global OAuth simulations
window.handleGoogleAuth = function() {
  const loginError = document.getElementById("login-error");
  const loginSuccess = document.getElementById("login-success");
  
  if (loginError) loginError.classList.add("hidden");
  if (loginSuccess) {
    loginSuccess.classList.remove("hidden");
    loginSuccess.querySelector("span").textContent = "Google authentication simulating... Success! Redirecting...";
  }
  
  const mockUser = MOCK_USERS[0]; // john_student
  localStorage.setItem("currentUser", JSON.stringify(mockUser));
  if (window.showToast) {
    window.showToast(`Logged in successfully via Google as ${mockUser.fullName}`);
  }
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1500);
};

window.handleMicrosoftAuth = function() {
  const loginError = document.getElementById("login-error");
  const loginSuccess = document.getElementById("login-success");
  
  if (loginError) loginError.classList.add("hidden");
  if (loginSuccess) {
    loginSuccess.classList.remove("hidden");
    loginSuccess.querySelector("span").textContent = "Microsoft authentication simulating... Success! Redirecting...";
  }

  const mockUser = MOCK_USERS[1]; // sir_ahmed
  localStorage.setItem("currentUser", JSON.stringify(mockUser));
  if (window.showToast) {
    window.showToast(`Logged in successfully via Microsoft as ${mockUser.fullName}`);
  }
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1500);
};
