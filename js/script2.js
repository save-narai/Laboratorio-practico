/*********************************************
 * ⬆️ BOTÓN "IR ARRIBA"
 *********************************************/
const btnUp = document.createElement("button");
btnUp.innerHTML = "↑";
btnUp.className = "btn-up hidden";
btnUp.setAttribute("aria-label", "Ir arriba");
document.body.appendChild(btnUp);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) btnUp.classList.remove("hidden");
  else btnUp.classList.add("hidden");
});

btnUp.addEventListener("click", () => {
  document.documentElement.scrollIntoView({ behavior: "smooth" });
});

/*********************************************
 * 🌟 FADE-IN GLOBAL PARA SECCIONES
 *********************************************/
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      sectionObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll("section").forEach(sec => sectionObserver.observe(sec));

/*********************************************
 * ⌨️ ANIMACIÓN TYPING EN ELEMENTOS CON .reveal
 *********************************************/
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      if (!reveals[i].classList.contains("show")) {
        reveals[i].classList.add("show");
        startTyping(reveals[i]);
      }
    }
  }
}

function startTyping(card) {
  const textElement = card.querySelector(".typing");
  const fullText = card.getAttribute("data-text");
  let i = 0;

  function typeChar() {
    if (i < fullText.length) {
      textElement.textContent += fullText.charAt(i);
      i++;
      setTimeout(typeChar, 35); // velocidad de typing
    }
  }
  typeChar();
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/*********************************************
 * 📱 COMPORTAMIENTO TOUCH/MOBILE (card-video)
 *********************************************/
(function () {
  const wrapper = document.querySelector('.slider-wrapper');
  if (!wrapper) return;

  // Delegación de clicks/taps
  document.addEventListener('click', (ev) => {
    const card = ev.target.closest('.card-video');
    if (card && wrapper.contains(card)) {
      const isExpanded = card.classList.contains('expanded');
      document.querySelectorAll('.card-video.expanded').forEach(c => c.classList.remove('expanded'));
      if (!isExpanded) {
        card.classList.add('expanded');
        wrapper.classList.add('paused');
        card.focus();
      } else {
        wrapper.classList.remove('paused');
      }
      ev.preventDefault();
      return;
    }

    // Clic fuera → cerrar
    document.querySelectorAll('.card-video.expanded').forEach(c => c.classList.remove('expanded'));
    wrapper.classList.remove('paused');
  });

  // Accesibilidad teclado
  document.querySelectorAll('.card-video').forEach(card => {
    card.addEventListener('focus', () => { wrapper.classList.add('paused'); });
    card.addEventListener('blur', () => { wrapper.classList.remove('paused'); });
  });
})();

/*********************************************
 * 📂 ACORDEÓN (year-toggle)
 *********************************************/
 
document.querySelectorAll(".year-toggle").forEach(btn => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;
    content.style.display = content.style.display === "block" ? "none" : "block";
  });
});