// Animation des mots qui tournent dans le slogan
class RotatingText {
  constructor(container) {
    this.container = container;
    this.parts = container.querySelectorAll('.slogan-part');
    this.currentIndex = 0;
    this.init();
  }

  init() {
    // Démarrer l'animation après que les éléments soient visibles
    setTimeout(() => {
      this.startRotation();
    }, 3000);
  }

  startRotation() {
    setInterval(() => {
      this.rotateParts();
    }, 3500);
  }

  rotateParts() {
    // Masquer la partie actuelle
    this.parts[this.currentIndex].classList.remove('active');
    
    // Passer à la partie suivante
    this.currentIndex = (this.currentIndex + 1) % this.parts.length;
    
    // Afficher la nouvelle partie
    this.parts[this.currentIndex].classList.add('active');
  }
}

// Gestion de la navbar sticky
class StickyNavbar {
  constructor() {
    this.navbar = document.querySelector('.sticky-nav');
    this.heroHeader = document.querySelector('.hero-header');
    this.init();
  }

  init() {
    if (!this.navbar || !this.heroHeader) return;
    
    // Observer pour détecter quand on sort du header
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // On est dans le header, masquer la navbar
            this.navbar.classList.remove('visible');
          } else {
            // On est sorti du header, afficher la navbar
            this.navbar.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-10px 0px 0px 0px'
      }
    );

    observer.observe(this.heroHeader);
  }
}

// Gestion des animations au scroll
class ScrollAnimations {
  constructor() {
    this.animatedElements = document.querySelectorAll('.animate-on-scroll');
    this.init();
  }

  init() {
    if (!this.animatedElements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    this.animatedElements.forEach(element => {
      observer.observe(element);
    });
  }
}

// Gestion du carrousel de compétences
class SkillsCarousel {
  constructor() {
    this.carousel = document.querySelector('.skills-carousel');
    this.track = document.querySelector('.carousel-track');
    this.init();
  }

  init() {
    if (!this.carousel || !this.track) return;
    
    // Dupliquer les éléments une seule fois pour créer une boucle parfaite
    const items = this.track.children;
    const itemsArray = Array.from(items);
    
    // Cloner les éléments une seule fois à la fin
    itemsArray.forEach(item => {
      const clone = item.cloneNode(true);
      this.track.appendChild(clone);
    });
    
    // Démarrer l'animation
    this.startAnimation();
  }

  startAnimation() {
    // Démarrer l'animation CSS
    this.track.style.animationPlayState = 'running';
  }
}

// Initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
  const rotatingContainer = document.querySelector('.slogan-text');
  if (rotatingContainer) {
    new RotatingText(rotatingContainer);
  }

  // Initialiser la navbar sticky
  new StickyNavbar();

  // Initialiser les animations au scroll
  new ScrollAnimations();

  // Initialiser le carrousel de compétences
  new SkillsCarousel();

  // Animation smooth scroll pour les liens de navigation (hero et sticky)
  const allNavLinks = document.querySelectorAll('.nav-link, .sticky-nav-link');
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      
      // Si c'est un lien vers une section, faire un smooth scroll
      if (targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Pour la section présentation, on veut la centrer parfaitement
            const windowHeight = window.innerHeight;
            const stickyNavHeight = 35;
            
            // Calculer la position pour centrer la section
            const elementPosition = targetElement.getBoundingClientRect().top;
            const elementHeight = targetElement.offsetHeight;
            
            // Centrer la section en tenant compte de la navbar sticky
            const centerOffset = (windowHeight - stickyNavHeight - elementHeight) / 2;
            const targetPosition = elementPosition + window.pageYOffset - stickyNavHeight - Math.max(centerOffset, 0);
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
        }
      }
    });
  });

  // Effet de parallaxe léger sur le fond animé
  let ticking = false;
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.animated-background');
    
    if (parallax) {
      const speed = scrolled * 0.3;
      parallax.style.transform = `translateY(${speed}px)`;
    }
    
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick);
});


