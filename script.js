document.documentElement.classList.add("has-js");

const revealElements = Array.from(document.querySelectorAll("[data-reveal]"));
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const linkedSections = navLinks
  .map((link) => {
    const target = document.querySelector(link.getAttribute("href"));
    return target ? { link, target } : null;
  })
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 60, 280)}ms`;
    revealObserver.observe(element);
  });

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const activeLink = navLinks.find(
          (link) => link.getAttribute("href") === `#${entry.target.id}`
        );

        if (!activeLink) {
          return;
        }

        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove("is-active"));
          activeLink.classList.add("is-active");
        }
      });
    },
    {
      threshold: 0.32,
      rootMargin: "-18% 0px -55% 0px",
    }
  );

  linkedSections.forEach(({ target }) => navObserver.observe(target));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
