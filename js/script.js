// ========== JS PRINCIPAL ==========

document.addEventListener("DOMContentLoaded", () => {
  /*********************************************
   * ✍️ EFECTO MÁQUINA DE ESCRIBIR
   *********************************************/
  const frases = [
    "El K-Pop ha trascendido fronteras,",
    "conquistando millones de corazones en todo el mundo ✨"
  ];
  const typingElement = document.getElementById("typing-text");
  const botonIntro = document.querySelector(".btn-intro");
  let fraseIndex = 0, charIndex = 0;
  const velocidad = 80;

  if (typingElement) {
    typingElement.innerHTML = "";
    function typeWriterEffect() {
      if (charIndex < frases[fraseIndex].length) {
        typingElement.innerHTML += frases[fraseIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeWriterEffect, velocidad);
      } else {
        if (fraseIndex < frases.length - 1) {
          fraseIndex++;
          charIndex = 0;
          typingElement.innerHTML += "<br>";
          setTimeout(typeWriterEffect, velocidad);
        } else {
          botonIntro?.classList.remove("hidden");
          botonIntro?.classList.add("show");
        }
      }
    }
    typeWriterEffect();
  }

  /*********************************************
   * 🎵 AUDIO: GALERÍA Y BOTONES
   *********************************************/
  const player = document.getElementById("player");
  const introAudio = document.getElementById("intro-galeria");
  const botones = document.querySelectorAll(".play-audio");
  const tituloGaleria = document.querySelector(".titulo-galeria");

  function resetBotones() {
    botones.forEach(b => {
      b.textContent = "▶ Escuchar";
      b.setAttribute("aria-pressed", "false");
      b.setAttribute("aria-label", "Reproducir audio");
    });
  }
  function stopIntroIfPlaying() {
    if (introAudio && !introAudio.paused) {
      introAudio.pause();
      introAudio.currentTime = 0;
    }
  }
  function stopPlayerIfPlaying() {
    if (player && !player.paused) {
      player.pause();
      player.currentTime = 0;
    }
  }

  botones.forEach(button => {
    button.setAttribute("role", "button");
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("aria-label", "Reproducir audio");
    button.addEventListener("click", async () => {
      const audioSrc = button.dataset.audio;
      if (!audioSrc) return;
      stopIntroIfPlaying();
      const currentSrc = player.src || "";
      const playingSame = currentSrc.endsWith(audioSrc) && !player.paused;
      if (playingSame) {
        player.pause();
        resetBotones();
      } else {
        try {
          stopPlayerIfPlaying();
          player.src = audioSrc;
          await player.play();
          resetBotones();
          button.textContent = "⏸ Pausar";
          button.setAttribute("aria-pressed", "true");
          button.setAttribute("aria-label", "Pausar audio");
        } catch (err) {
          console.error("Error audio:", err);
        }
      }
    });
    button.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault(); button.click();
      }
    });
  });
  if (player) player.addEventListener("ended", resetBotones);

  if (tituloGaleria) {
    tituloGaleria.tabIndex = 0;
    tituloGaleria.style.cursor = "pointer";
    tituloGaleria.addEventListener("click", async () => {
      stopPlayerIfPlaying();
      resetBotones();
      if (!introAudio) return;
      introAudio.currentTime = 0;
      await introAudio.play().catch(err => console.error(err));
    });
    tituloGaleria.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault(); tituloGaleria.click();
      }
    });
  }

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
   * 🌟 FADE-IN GLOBAL
   *********************************************/
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  sections.forEach(sec => observer.observe(sec));

  /*********************************************
   * 🎬 VIDEO FADE-IN
   *********************************************/
  const videoSection = document.getElementById("video");
  if (videoSection) {
    const observerVideo = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          videoSection.classList.add("show");
          observerVideo.unobserve(videoSection);
        }
      });
    }, { threshold: 0.3 });
    observerVideo.observe(videoSection);
  }

/*********************************************
 * 🔮 BOTÓN REVELAR GALERÍA PERSONAL (TOGGLE)
 *********************************************/


const heroBtn = document.getElementById("btnReveal");
const galleryContainer = document.getElementById("galleryContainer");
const textoAmor = document.getElementById("textoAmor");

function fotosList() {
  return Array.from(document.querySelectorAll("#galleryContainer .Picture"));
}

if (heroBtn && galleryContainer) {
  heroBtn.setAttribute("aria-pressed", "false");

  heroBtn.addEventListener("click", () => {
    const isOpen = heroBtn.getAttribute("aria-pressed") === "true";

    if (!isOpen) {
      heroBtn.setAttribute("aria-pressed", "true");
      heroBtn.querySelector(".btn-label").textContent = "Ocultar galería";
      openGallery();
      explodeParticles(heroBtn.parentElement || heroBtn);
      lanzarCorazones(textoAmor); // corazones ❤️
    } else {
      heroBtn.setAttribute("aria-pressed", "false");
      heroBtn.querySelector(".btn-label").textContent = "Presiona para ver";
      closeGallery();
      lanzarCorazones(textoAmor, true); // ✨ destello salida
    }
  });
}

/* ==== Abrir ==== */
function openGallery() {
  galleryContainer.classList.remove("ocultar");
  void galleryContainer.offsetWidth; // reflow
  galleryContainer.classList.add("visible");

  if (textoAmor) {
    textoAmor.classList.remove("ocultar");
    textoAmor.classList.add("visible");
  }

  const fotos = fotosList();
  fotos.forEach(pic => {
    const rnd = Math.round(Math.random() * 28 - 14);
    const rot = (Math.random() * 2 - 1).toFixed(2);
    pic.style.setProperty("--rnd", `${rnd}px`);
    pic.style.setProperty("--rot", `${rot}deg`);
    pic.classList.remove("show");
  });

  const shuffled = fotos.map(v => [Math.random(), v]).sort((a,b)=>a[0]-b[0]).map(v=>v[1]);
  const featured = shuffled.find(el => el.classList.contains("featured"));
  if (featured) featured.classList.add("show");

  let base = 120;
  shuffled.forEach((pic, i) => {
    const extra = Math.floor(Math.random() * 180);
    const delay = base + i*120 + extra;
    setTimeout(() => pic.classList.add("show"), delay);
  });
}

/* ==== Cerrar ==== */
function closeGallery() {
  fotosList().forEach(pic => pic.classList.remove("show"));
  if (textoAmor) {
    textoAmor.classList.remove("visible");
    textoAmor.classList.add("ocultar");
  }
  galleryContainer.classList.remove("visible");
  galleryContainer.addEventListener("transitionend", () => {
    galleryContainer.classList.add("ocultar");
  }, {once:true});
}

/* ==== Corazones ==== */
function lanzarCorazones(host, salida = false) {
  if (!host) return;
  const total = 10;
  for (let i = 0; i < total; i++) {
    const corazon = document.createElement("span");
    corazon.className = "corazon";
    corazon.textContent = salida ? "✨" : "❤";
    corazon.style.left = `${Math.random() * 80 + 10}%`;
    corazon.style.top = "0";
    host.appendChild(corazon);
    setTimeout(() => corazon.remove(), 3000);
  }
}

/* ==== Explosión partículas ==== */
function explodeParticles(host) {
  if (!host) return;
  const total = 20;
  for (let i = 0; i < total; i++) {
    const part = document.createElement("span");
    part.className = "particle";
    part.style.background = Math.random() > 0.5 ? "#ff4500" : "#ff0000";
    part.style.left = `${50 + (Math.random() * 40 - 20)}%`;
    part.style.top = `${50 + (Math.random() * 40 - 20)}%`;
    part.style.width = part.style.height = `${Math.random() * 8 + 4}px`;
    part.style.position = "absolute";
    part.style.borderRadius = "50%";
    part.style.opacity = "0.9";
    part.style.pointerEvents = "none";

    host.appendChild(part);

    const x = (Math.random() - 0.5) * 200;
    const y = (Math.random() - 0.5) * 200;
    part.animate([
      { transform: "translate(0,0) scale(1)", opacity: 1 },
      { transform: `translate(${x}px, ${y}px) scale(0.3)`, opacity: 0 }
    ], {
      duration: 1000 + Math.random() * 500,
      easing: "ease-out",
      fill: "forwards"
    });

    setTimeout(() => part.remove(), 1500);
  }
}



  /*********************************************
   * 🧩 UTILIDADES EXTRA
   *********************************************/
  // stagger en galería
  document.querySelectorAll(".contenedor-imagenes .imagen")
    .forEach((el, i) => el.style.setProperty("--i", i));

  // aria-current en menú
  const active = document.querySelector("nav .menu a.activo");
  if (active) active.setAttribute("aria-current", "page");

  // lazy loading seguro
  document.querySelectorAll(".imagen img").forEach(img => {
    if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
  });
});






  /*********************************************
   * Slider
   *********************************************/
   
   

let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let thumbnails = document.querySelectorAll('.thumbnail .item');

// parámetros
let countItem = items.length;
let itemActive = 0;
let refreshInterval;

// iniciar slider
function startSlider() {
    refreshInterval = setInterval(() => {
        next.click();
    }, 5000);
}

// mostrar slider
function showSlider() {
    // quitar active viejo
    document.querySelector('.slider .list .item.active')?.classList.remove('active');
    document.querySelector('.thumbnail .item.active')?.classList.remove('active');

    // activar nuevo
    items[itemActive].classList.add('active');
    thumbnails[itemActive].classList.add('active');
    setPositionThumbnail();

    // resetear autoplay
    clearInterval(refreshInterval);
    startSlider();
}

// controlar botones
next.onclick = function () {
    itemActive = (itemActive + 1) % countItem;
    showSlider();
};

prev.onclick = function () {
    itemActive = (itemActive - 1 + countItem) % countItem;
    showSlider();
};

// centrar thumbnail activo sin mover el scroll de la página
function setPositionThumbnail() {
    let container = document.querySelector('.thumbnail');
    let thumbnailActive = document.querySelector('.thumbnail .item.active');
    if (container && thumbnailActive) {
        container.scrollLeft = thumbnailActive.offsetLeft - container.offsetWidth / 2 + thumbnailActive.offsetWidth / 2;
    }
}

// click en thumbnails
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        itemActive = index;
        showSlider();
    });
});

// iniciar autoplay
startSlider();




// <!-- JS: animación al hacer scroll -->





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
  revealOnScroll(); // Para cargar si ya están visibles
  
  
  
  





  
  
