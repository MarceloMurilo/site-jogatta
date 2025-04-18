// js/script.js

document.addEventListener('DOMContentLoaded', () => {
  console.log('Jogatta site está funcionando!');

  // Seleciona o botão hambúrguer e o menu
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  // Evento de clique no botão hambúrguer
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      // Anima as barras do hambúrguer
      navToggle.classList.toggle('open');
      // Abre/fecha o menu
      navMenu.classList.toggle('open');
    });
  }

  // ANIMAÇÃO NO SCROLL USANDO INTERSECTION OBSERVER
  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observerInstance.unobserve(entry.target); // anima apenas uma vez
        }
      });
    },
    {
      threshold: 0.1
    }
  );

  // Seleciona todas as seções que têm a classe "observe-fade"
  const sectionsToObserve = document.querySelectorAll('.observe-fade');
  sectionsToObserve.forEach(section => {
    observer.observe(section);
  });
});
