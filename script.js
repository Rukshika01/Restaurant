const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const navMenu = document.querySelector('[data-nav-menu]');
const form = document.querySelector('#reservation-form');
const dateInput = document.querySelector('#date');
const year = document.querySelector('#year');

if (year) year.textContent = new Date().getFullYear();

const today = new Date();
today.setHours(0, 0, 0, 0);
if (dateInput) dateInput.min = today.toISOString().split('T')[0];

function updateHeader() {
  if (header) header.classList.toggle('scrolled', window.scrollY > 16);
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

function closeMenu() {
  if (!navMenu || !navToggle) return;
  navMenu.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open menu');
  document.body.classList.remove('menu-open');
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('menu-open', isOpen);
  });
  navMenu.addEventListener('click', (event) => {
    if (event.target.matches('a')) closeMenu();
  });
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
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

const menuData = {
  Dinner: [
    ['Luma Seafood Curry', 'Lagoon prawns, reef fish, coconut, curry leaf, fragrant rice.', 'LKR 5,800', '🌶 GF', 'Popular', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641a?auto=format&fit=crop&w=700&q=75'],
    ['Charcoal Grilled Sea Bass', 'Citrus butter, charred greens, herb sambol.', 'LKR 6,200', 'GF', 'Popular', 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=700&q=75'],
    ['Creamy Mushroom Pasta', 'Wild mushrooms, parmesan cream, cracked pepper.', 'LKR 3,900', '🌱', '', 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=75'],
    ['Beef Tenderloin', 'Potato purée, roasted shallot jus, seasonal greens.', 'LKR 6,500', 'GF', '', 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=700&q=75']
  ],
  Brunch: [
    ['Eggs Benedict', 'Poached eggs, spinach, tomato hollandaise, toasted muffin.', 'LKR 2,900', '', 'Popular', 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=700&q=75'],
    ['Avocado Toast', 'Sourdough, avocado, lime, herbs, soft egg.', 'LKR 2,600', '🌱', '', 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=700&q=75'],
    ['French Toast', 'Brioche, kithul syrup, tropical fruit.', 'LKR 2,700', '🌱', '', 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=700&q=75'],
    ['Sri Lankan Breakfast Platter', 'Egg hoppers, dhal, pol sambol, seeni sambol.', 'LKR 3,400', '🌶', 'Popular', 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=700&q=75'],
    ['Pancake Stack', 'Coconut cream, banana, toasted cashew.', 'LKR 2,500', '🌱', '', 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=700&q=75']
  ],
  Drinks: [
    ['Ceylon Tea', 'Single-origin tea served hot or iced.', 'LKR 950', '🌿', '', 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=700&q=75'],
    ['Fresh Lime & Mint', 'Lime, mint, soda, crushed ice.', 'LKR 1,200', '🌿 GF', '', 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=700&q=75'],
    ['Mango Smoothie', 'Fresh mango, yoghurt, kithul drizzle.', 'LKR 1,600', '🌱 GF', 'Popular', 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=700&q=75'],
    ['Iced Coffee', 'Cold coffee, milk, vanilla, ice.', 'LKR 1,300', '🌱', '', 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=75'],
    ['Passion Fruit Cooler', 'Passion fruit, lime, basil, soda.', 'LKR 1,450', '🌿 GF', '', 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=700&q=75'],
    ['Luma Signature Mocktail', 'King coconut, ginger, lime, aromatic bitters.', 'LKR 1,900', '🌿', 'Popular', 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=700&q=75']
  ],
  Starters: [
    ['Burrata & Tomato', 'Basil oil, heirloom tomato, toasted sourdough.', 'LKR 3,200', '🌱', '', 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=700&q=75'],
    ['Crispy Calamari', 'Lime aioli, chilli salt, curry leaf.', 'LKR 3,100', '🌶', 'Popular', 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=700&q=75'],
    ['Truffle Mushroom Soup', 'Creamed wild mushrooms, truffle oil, herbs.', 'LKR 2,400', '🌱', '', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=700&q=75'],
    ['Sri Lankan Spiced Prawns', 'Garlic, chilli, lime, coriander.', 'LKR 3,800', '🌶 GF', 'Popular', 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=700&q=75']
  ],
  'Main Courses': [
    ['Grilled Sea Bass', 'Charred greens, citrus butter, herb sambol.', 'LKR 6,200', 'GF', '', 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=700&q=75'],
    ['Sri Lankan Seafood Curry', 'Prawns, fish, mussels, coconut broth.', 'LKR 5,800', '🌶 GF', 'Popular', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641a?auto=format&fit=crop&w=700&q=75'],
    ['Beef Tenderloin', 'Potato purée, jus, seasonal vegetables.', 'LKR 6,500', 'GF', 'Popular', 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=700&q=75'],
    ['Truffle Risotto', 'Arborio rice, mushrooms, parmesan, truffle.', 'LKR 4,800', '🌱 GF', '', 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=700&q=75'],
    ['Creamy Mushroom Pasta', 'Hand-cut pasta, wild mushrooms, thyme cream.', 'LKR 3,900', '🌱', '', 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=75']
  ],
  Desserts: [
    ['Chocolate Fondant', 'Warm chocolate centre, vanilla bean ice cream.', 'LKR 2,400', '🌱', 'Popular', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=75'],
    ['Coconut Panna Cotta', 'King coconut jelly, passion fruit, cashew.', 'LKR 2,100', 'GF', '', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=700&q=75'],
    ['Crème Brûlée', 'Vanilla custard, caramelized sugar.', 'LKR 2,200', '🌱 GF', '', 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?auto=format&fit=crop&w=700&q=75'],
    ['Tropical Fruit Pavlova', 'Meringue, cream, mango, passion fruit.', 'LKR 2,300', '🌱 GF', 'Popular', 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=700&q=75']
  ]
};

const menuTabs = document.querySelector('[data-menu-tabs]');
const menuItems = document.querySelector('[data-menu-items]');
function renderMenu(category) {
  if (!menuItems) return;
  menuItems.classList.remove('visible');
  menuItems.innerHTML = menuData[category].map(([name, desc, price, diet, popular, image]) =>
    '<article class="dish-card">' +
      '<div class="dish-image"><img src="' + image + '" alt="' + name + '" loading="lazy">' + (popular ? '<span class="popular-badge">Popular</span>' : '') + '</div>' +
      '<div class="dish-body"><div class="dish-title"><h3>' + name + '</h3><strong>' + price + '</strong></div><p>' + desc + '</p>' + (diet ? '<span class="diet-label">' + diet + '</span>' : '') + '</div>' +
    '</article>').join('');
  window.setTimeout(() => menuItems.classList.add('visible'), 30);
}
if (menuTabs && menuItems) {
  Object.keys(menuData).forEach((category, index) => {
    const button = document.createElement('button');
    button.className = 'tab-button' + (index === 0 ? ' active' : '');
    button.type = 'button';
    button.textContent = category;
    button.setAttribute('aria-pressed', String(index === 0));
    button.addEventListener('click', () => {
      menuTabs.querySelectorAll('button').forEach((tab) => { tab.classList.remove('active'); tab.setAttribute('aria-pressed', 'false'); });
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');
      renderMenu(category);
    });
    menuTabs.appendChild(button);
  });
  renderMenu('Dinner');
}

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
  if (name.value.trim().length < 2) { setError(name, 'Please enter your name.'); valid = false; } else setError(name, '');
  if (!email.validity.valid) { setError(email, 'Please enter a valid email address.'); valid = false; } else setError(email, '');
  if (!date.value) { setError(date, 'Please choose a reservation date.'); valid = false; }
  else {
    const selected = new Date(date.value + 'T00:00:00');
    if (selected < today) { setError(date, 'Please choose today or a future date.'); valid = false; } else setError(date, '');
  }
  if (!guests.value) { setError(guests, 'Please select your party size.'); valid = false; } else setError(guests, '');
  return valid;
}
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = document.querySelector('#form-message');
    if (message) message.textContent = '';
    if (!validateForm()) return;
    const firstName = form.elements.name.value.trim().split(' ')[0];
    if (message) message.textContent = 'Thanks, ' + firstName + '! Your reservation request is ready. This demo form was validated locally and not sent to a server.';
    form.reset();
    if (dateInput) dateInput.min = today.toISOString().split('T')[0];
  });
}
