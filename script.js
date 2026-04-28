document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".glass");
  const buttons = document.querySelectorAll('a[href^="#"]');

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18
      }
    );

    cards.forEach(card => observer.observe(card));
  } else {
    cards.forEach(card => card.classList.add("show"));
  }

  buttons.forEach(button => {
    button.addEventListener("click", event => {
      const targetId = button.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        event.preventDefault();

        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
});
