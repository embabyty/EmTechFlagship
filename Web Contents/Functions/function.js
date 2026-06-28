const toggleButton = document.getElementById('theme-toggle');
const menu = document.getElementById('theme-menu');
const items = menu.querySelectorAll('.theme-dropdown__item');

const themeNames = { light: 'Light', dark: 'Dark', amoled: 'AMOLED' };
const themeLabel = document.getElementById('theme-label');

let currentTheme = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
  items.forEach(item => {
    item.classList.toggle('theme-dropdown__item--active', item.dataset.themeValue === theme);
  });
  if (themeLabel) themeLabel.textContent = themeNames[theme] || 'Light';
  localStorage.setItem('theme', theme);
  currentTheme = theme;
}

applyTheme(currentTheme);

toggleButton.addEventListener('click', (e) => {
  e.stopPropagation();
  menu.classList.toggle('theme-dropdown__menu--open');
});

items.forEach(item => {
  item.addEventListener('click', () => {
    applyTheme(item.dataset.themeValue);
    menu.classList.remove('theme-dropdown__menu--open');
  });
});

document.addEventListener('click', () => {
  menu.classList.remove('theme-dropdown__menu--open');
});

const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');

if (sidebar && sidebarToggle) {
  sidebar.style.transition = 'none';

  const sidebarState = localStorage.getItem('sidebar');
  if (sidebarState === 'collapsed') {
    sidebar.classList.add('sidebar--collapsed');
  }

  sidebar.offsetHeight;
  sidebar.style.transition = '';

  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar--collapsed');
    localStorage.setItem('sidebar',
      sidebar.classList.contains('sidebar--collapsed') ? 'collapsed' : 'expanded'
    );
  });
}



