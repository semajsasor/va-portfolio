const typingText = document.querySelector('.typing-text');
const typedStrings = typingText ? JSON.parse(typingText.dataset.text.replace(/'/g, '"')) : [];
let typingIndex = 0;
let charIndex = 0;
let typingForward = true;

function runTyping() {
  if (!typingText || typedStrings.length === 0) return;
  const currentText = typedStrings[typingIndex];
  if (typingForward) {
    typingText.textContent = currentText.slice(0, charIndex + 1);
    charIndex += 1;
    if (charIndex === currentText.length) {
      typingForward = false;
      setTimeout(runTyping, 1300);
      return;
    }
  } else {
    typingText.textContent = currentText.slice(0, charIndex - 1);
    charIndex -= 1;
    if (charIndex === 0) {
      typingForward = true;
      typingIndex = (typingIndex + 1) % typedStrings.length;
    }
  }
  setTimeout(runTyping, typingForward ? 80 : 45);
}

function revealOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

function setupMenu() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!navToggle || !navLinks) return;
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function setupAccordions() {
  document.querySelectorAll('.accordion-button').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.accordion-card');
      const panel = card.querySelector('.accordion-panel');
      const open = card.classList.contains('open');
      card.classList.toggle('open');
      if (!open) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      } else {
        panel.style.maxHeight = '0px';
      }
    });
  });
}

function init() {
  runTyping();
  revealOnScroll();
  setupMenu();
  setupAccordions();
}

document.addEventListener('DOMContentLoaded', init);
