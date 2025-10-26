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
 * 🎞️ SLIDER AUTOMÁTICO
 *********************************************/
document.addEventListener("DOMContentLoaded", () => {
  let slides = document.querySelectorAll('.slide');
  let current = 0;

  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 4000);
});

/*********************************************
 * 📌 TIMELINE (mostrar/ocultar eventos con scroll)
 *********************************************/
const events = document.querySelectorAll('.timeline-event');

function checkTimelineEvents() {
  events.forEach(ev => {
    const rect = ev.getBoundingClientRect();

    // Si el evento está dentro de la ventana visible
    if (rect.top < window.innerHeight - 100 && rect.bottom > 100) {
      ev.classList.add('show');
    } else {
      ev.classList.remove('show'); // 🔥 se oculta al subir
    }
  });
}

window.addEventListener('scroll', checkTimelineEvents);
window.addEventListener('load', checkTimelineEvents);

/*********************************************
 * 💜 CONTENEDOR DE CULTURA
 *********************************************/
const cultura = document.querySelector('.cultura-container');

const culturaObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      cultura.classList.add('visible');
      culturaObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

culturaObserver.observe(cultura);




/*********************************************
 *
/* Actividades e impacto *
 *********************************************/


let items = document.querySelectorAll('.slider .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');

let active = 3;
function loadShow(){
    let stt = 0;
    items[active].style.transform = `none`;
    items[active].style.zIndex = 1;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;
    for(var i = active + 1; i < items.length; i++){
        stt++;
        items[i].style.transform = `translateX(${120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
    stt = 0;
    for(var i = active - 1; i >= 0; i--){
        stt++;
        items[i].style.transform = `translateX(${-120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
}
loadShow();
next.onclick = function(){
    active = active + 1 < items.length ? active + 1 : active;
    loadShow();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : active;
    loadShow();
}







