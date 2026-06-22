document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Mobile Menu Toggle
  const openMenuBtn = document.getElementById("open-menu-btn");
  const closeMenuBtn = document.getElementById("close-menu-btn");
  const mobileSidebar = document.getElementById("mobile-sidebar");
  const mobileOverlay = document.getElementById("mobile-overlay");

  function toggleMobileMenu(show) {
    if (show) {
      mobileSidebar.classList.remove("translate-x-full");
      mobileOverlay.classList.remove("pointer-events-none", "opacity-0");
      mobileOverlay.classList.add("opacity-100");
    } else {
      mobileSidebar.classList.add("translate-x-full");
      mobileOverlay.classList.add("pointer-events-none", "opacity-0");
      mobileOverlay.classList.remove("opacity-100");
    }
  }

  if (openMenuBtn && closeMenuBtn && mobileSidebar && mobileOverlay) {
    openMenuBtn.addEventListener("click", () => toggleMobileMenu(true));
    closeMenuBtn.addEventListener("click", () => toggleMobileMenu(false));
    mobileOverlay.addEventListener("click", () => toggleMobileMenu(false));
  }

  // Carousel Helper function
  window.setupCarousel = function(carouselId, prevBtnId, nextBtnId) {
    const container = document.getElementById(carouselId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);

    if (!container) return;

    function getScrollAmount() {
      // Scroll by the width of the first visible child card
      const firstChild = container.firstElementChild?.firstElementChild;
      return firstChild ? firstChild.clientWidth + 16 : container.clientWidth / 2;
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        container.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        container.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
      });
    }
  };

  // Header login state dynamic update
  updateAuthHeader();
});

// Update the Navigation bar based on simulated authentication state
function updateAuthHeader() {
  const currentUserStr = localStorage.getItem("currentUser");
  const desktopAuthContainer = document.getElementById("desktop-auth-container");
  const mobileAuthContainer = document.getElementById("mobile-auth-container");

  if (!desktopAuthContainer || !mobileAuthContainer) return;

  if (currentUserStr) {
    const user = JSON.parse(currentUserStr);
    const displayName = user.fullName || user.username || "User";

    const loggedInHtml = `
      <div class="flex items-center gap-4">
        <span class="text-sm font-semibold text-white">Hi, ${displayName}</span>
        <button onclick="handleLogout()" class="rounded-md border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
          Logout
        </button>
      </div>
    `;

    desktopAuthContainer.innerHTML = loggedInHtml;
    mobileAuthContainer.innerHTML = `
      <p class="text-sm text-[#d0d4dc] mb-2 font-medium">Logged in as: <b>${displayName}</b></p>
      <button onclick="handleLogout()" class="w-full rounded-md border border-white/20 bg-white/5 py-2 text-center text-sm font-semibold text-white">
        Logout
      </button>
    `;
  } else {
    const loggedOutHtml = `
      <a href="auth.html" class="rounded-md bg-[#f5c21a] px-4 py-2 text-sm font-semibold text-[#0c1422] transition hover:bg-[#ffcf33]">
        Login / Register
      </a>
    `;

    desktopAuthContainer.innerHTML = loggedOutHtml;
    mobileAuthContainer.innerHTML = `
      <a href="auth.html" class="mt-2 block w-full rounded-md bg-[#f5c21a] px-4 py-2 text-center text-sm font-semibold text-[#0c1422]">
        Login / Register
      </a>
    `;
  }
}

// Global logout action
window.handleLogout = function() {
  localStorage.removeItem("currentUser");
  updateAuthHeader();
  showToast("Logged out successfully");
};

// Global Toast notification helper
window.showToast = function(message) {
  let toast = document.getElementById("toast-notification");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-notification";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
};
