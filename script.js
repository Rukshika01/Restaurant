const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const navMenu = document.querySelector('[data-nav-menu]');
const tabButtons = document.querySelectorAll('[data-tab]');
const panels = document.querySelectorAll('[data-panel]');
const form = document.querySelector('#reservation-form');
const dateInput = document.querySelector('#date');
const year = document.querySelector('#year');

year.textContent = new Date().getFullYear();

const today = new Date();
today.setHours(0, 0, 0, 0);
if (dateInput) {
  dateInput.min = today.toISOString().split('T')[0];
}

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 16);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

function closeMenu() {
  navMenu.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open menu');
  document.body.classList.remove('menu-open');
}

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  document.body.classList.toggle('menu-open', isOpen);
});

navMenu.addEventListener('click', (event) => {
  if (event.target.matches('a')) closeMenu();
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.tab;
    tabButtons.forEach((tab) => {
      const isActive = tab === button;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });
    panels.forEach((panel) => {
      const isActive = panel.dataset.panel === target;
      panel.classList.toggle('active', isActive);
      panel.hidden = !isActive;
    });
  });
});

const observer = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 })
  : null;

document.querySelectorAll('.reveal').forEach((element) => {
  if (observer) observer.observe(element);
  else element.classList.add('visible');
});

function setError(field, message) {
  const error = document.querySelector('#' + field.id + '-error');
  if (error) error.textContent = message;
  field.setAttribute('aria-invalid', message ? 'true' : 'false');
}

function validateForm() {
  let valid = true;
  const name = form.elements.name;
  const email = form.elements.email;
  const date = form.elements.date;
  const guests = form.elements.guests;

  if (name.value.trim().length < 2) {
    setError(name, 'Please enter your name.');
    valid = false;
  } else setError(name, '');

  if (!email.validity.valid) {
    setError(email, 'Please enter a valid email address.');
    valid = false;
  } else setError(email, '');

  if (!date.value) {
    setError(date, 'Please choose a reservation date.');
    valid = false;
  } else {
    const selected = new Date(date.value + 'T00:00:00');
    if (selected < today) {
      setError(date, 'Please choose today or a future date.');
      valid = false;
    } else setError(date, '');
  }

  if (!guests.value) {
    setError(guests, 'Please select your party size.');
    valid = false;
  } else setError(guests, '');

  return valid;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = document.querySelector('#form-message');
  message.textContent = '';

  if (!validateForm()) return;

  const name = form.elements.name.value.trim().split(' ')[0];
  message.textContent = 'Thanks, ' + name + '! Your reservation request is ready. This demo form was validated locally and not sent to a server.';
  form.reset();
  if (dateInput) dateInput.min = today.toISOString().split('T')[0];
});
