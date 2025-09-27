document.addEventListener("DOMContentLoaded", () => {
  // Smooth Scrolling for Navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Fade-in and Slide-in Animations on Scroll
  const animateElements = document.querySelectorAll(".fade-in-up, .fade-in");
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach((el) => {
    observer.observe(el);
  });

  // Animated Counters in About Section
  const counters = document.querySelectorAll(".counter");
  const counterObserverOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5, // Trigger when 50% of the element is visible
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        let current = 0;
        const increment = Math.ceil(target / 100); // Adjust speed based on target

        const timer = setInterval(() => {
          current += increment;
          if (current < target) {
            entry.target.innerText = current;
          } else {
            entry.target.innerText = target;
            clearInterval(timer);
          }
        }, 20); // Speed of animation

        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, counterObserverOptions);

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });

  // Fixed Navbar on Scroll
  const navbar = document.getElementById("navbar");
  const heroSection = document.getElementById("hero");
  const heroHeight = heroSection.offsetHeight;

  window.addEventListener("scroll", () => {
    if (window.scrollY > heroHeight - 80) {
      // Adjust 80px for desired offset
      navbar.classList.remove("hidden");
      navbar.classList.add("animate", "fade-in-down"); // Assuming fade-in-down class
      navbar.style.transform = "translateY(0)"; // Ensure it's visible
    } else {
      navbar.classList.add("hidden");
      navbar.style.transform = "translateY(-100%)"; // Move it up out of view
    }
  });

  // Highlight Current Day in Schedule
  const today = new Date().toLocaleString("en-us", { weekday: "long" });
  const dayRows = document.querySelectorAll(".day-row");

  dayRows.forEach((row) => {
    if (row.dataset.day === today) {
      row.classList.add("bg-blue-100", "font-bold", "text-blue-800");
      row.classList.remove("hover:bg-blue-50"); // Remove hover for highlighted row
    }
  });

  // Scroll-to-Top Button
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      // Show button after scrolling 300px
      scrollToTopBtn.classList.remove("hidden");
    } else {
      scrollToTopBtn.classList.add("hidden");
    }
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Basic Form Validation (Client-side)
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      const name = contactForm.querySelector("#name").value.trim();
      const email = contactForm.querySelector("#email").value.trim();
      const message = contactForm.querySelector("#message").value.trim();

      if (!name || !email || !message) {
        alert("Please fill in all required fields.");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // In a real application, you would send this data to a server
      console.log("Form submitted:", { name, email, message });

      contactForm.reset();
    });
  }
});
const menuBtn = document.getElementById("menuBtn");
const sideMenu = document.getElementById("sideMenu");
const closeBtn = document.getElementById("closeBtn");
const overlay = document.getElementById("overlay");

menuBtn.addEventListener("click", () => {
  sideMenu.classList.remove("-translate-x-full");
  overlay.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
  sideMenu.classList.add("-translate-x-full");
  overlay.classList.add("hidden");
});

overlay.addEventListener("click", () => {
  sideMenu.classList.add("-translate-x-full");
  overlay.classList.add("hidden");
});



  // Close side menu on link click (for single-page navigation)
document.querySelectorAll("#sideMenu a").forEach((link) => {
  link.addEventListener("click", () => {
    sideMenu.classList.add("-translate-x-full");
    overlay.classList.add("hidden");
  });
});
