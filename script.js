const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelectorAll(".side-nav a");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(item => item.classList.remove("active"));
    link.classList.add("active");
    if (window.innerWidth <= 1000) {
      sidebar.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

const observedSections = document.querySelectorAll("main section[id]");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-30% 0px -55% 0px", threshold: 0.05 });

observedSections.forEach(section => observer.observe(section));
