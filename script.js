// Mobile Navigation Toggle
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// Active Navigation Link
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated");
    }
  });
}, observerOptions);

// Observe all sections for scroll animations
document.querySelectorAll("section").forEach((section) => {
  section.classList.add("animate-on-scroll");
  observer.observe(section);
});

// Skills Animation
const skillsSection = document.querySelector(".skills");
const skillBars = document.querySelectorAll(".skill-progress");
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !skillsAnimated) {
        skillBars.forEach((bar) => {
          const width = bar.getAttribute("data-width");
          setTimeout(() => {
            bar.style.width = width + "%";
          }, 200);
        });
        skillsAnimated = true;
      }
    });
  },
  { threshold: 0.5 }
);

skillsObserver.observe(skillsSection);

// Floating Labels Animation
const formGroups = document.querySelectorAll(".form-group");

formGroups.forEach((group) => {
  const input = group.querySelector("input, textarea");
  const label = group.querySelector("label");

  input.addEventListener("focus", () => {
    label.style.transform = "translateY(-25px)";
    label.style.fontSize = "0.8rem";
    label.style.color = "#4e89ff";
  });

  input.addEventListener("blur", () => {
    if (!input.value) {
      label.style.transform = "translateY(0)";
      label.style.fontSize = "1rem";
      label.style.color = "#666";
    }
  });
});

// Scroll to Top Button
const scrollTopBtn = document.createElement("button");
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = "scroll-top-btn";
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: #fff;
    color: red;
    font-size:1rem;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(78, 137, 255, 0.3);
`;

// document.body.appendChild(scrollTopBtn);

// window.addEventListener("scroll", () => {
//   if (window.scrollY > 500) {
//     scrollTopBtn.style.opacity = "1";
//     scrollTopBtn.style.visibility = "visible";
//   } else {
//     scrollTopBtn.style.opacity = "0";
//     scrollTopBtn.style.visibility = "hidden";
//   }
// });

// scrollTopBtn.addEventListener("click", () => {
//   window.scrollTo({
//     top: 0,
//     behavior: "smooth",
//   });
// });

// scrollTopBtn.addEventListener("mouseenter", () => {
//   scrollTopBtn.style.background = "linear-gradient(45deg, #ec4899, #f97316)";
//   scrollTopBtn.style.transform = "translateY(-2px) scale(1.1)";
// });

// scrollTopBtn.addEventListener("mouseleave", () => {
//   scrollTopBtn.style.background = "linear-gradient(45deg, #4e89ff, #8b5cf6)";
//   scrollTopBtn.style.transform = "translateY(0) scale(1)";
// });

// // Parallax Effect for Hero Section
// window.addEventListener("scroll", () => {
//   const scrolled = window.pageYOffset;
//   const hero = document.querySelector(".hero");
//   const rate = scrolled * -0.5;

//   if (hero) {
//     hero.style.transform = `translateY(${rate}px)`;
//   }
// });

// Add ripple effect to buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple animation keyframes
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Preloader
window.addEventListener("load", () => {
  const preloader = document.createElement("div");
  preloader.className = "preloader";
  preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;

  preloader.innerHTML = `
        <div style="
            width: 50px;
            height: 50px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #4e89ff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        "></div>
    `;

  document.body.appendChild(preloader);

  setTimeout(() => {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.remove();
    }, 500);
  }, 1000);
});

// Add spin animation for preloader
const spinStyle = document.createElement("style");
spinStyle.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(spinStyle);
