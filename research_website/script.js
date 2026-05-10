// Scroll reveal animation
const revealElements = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

// Navbar scroll effect
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Scroll progress bar
const scrollProgress = document.getElementById("scrollProgress");

window.addEventListener("scroll", () => {
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollAmount = window.scrollY;
  const progress = (scrollAmount / pageHeight) * 100;
  scrollProgress.style.width = progress + "%";
});

// Active navbar link while scrolling
const sections = document.querySelectorAll(".section-anchor");
const navLinks = document.querySelectorAll(".navbar nav a");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });
});

// Storyboard carousel
const carouselTrack = document.getElementById("carouselTrack");
const carouselSlides = document.querySelectorAll(".carousel-slide");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const dots = document.querySelectorAll(".dot");
const currentSlideText = document.getElementById("currentSlide");

let currentIndex = 0;
const totalSlides = carouselSlides.length;

function updateCarousel() {
  if (!carouselTrack || totalSlides === 0) return;

  carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  if (dots[currentIndex]) {
    dots[currentIndex].classList.add("active");
  }

  if (currentSlideText) {
    currentSlideText.textContent = String(currentIndex + 1).padStart(2, "0");
  }
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index;
    updateCarousel();
  });
});

// Keyboard support
document.addEventListener("keydown", (event) => {
  if (!carouselTrack || totalSlides === 0) return;

  if (event.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateCarousel();
  }

  if (event.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }
});

// Auto slide every 6 seconds
setInterval(() => {
  if (!carouselTrack || totalSlides === 0) return;

  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
}, 6000);

updateCarousel();