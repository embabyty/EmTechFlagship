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

/* ── Wallpaper Modal ── */
const wallpaperCards = document.querySelectorAll('.wallpaper-card');
const wallpaperModal = document.getElementById('wallpaper-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalClose = document.getElementById('modal-close');
const modalImage = document.getElementById('modal-image');
const modalDownload = document.getElementById('modal-download');

if (wallpaperCards.length && wallpaperModal && modalImage && modalDownload) {
  wallpaperCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.wallpaper-card__download-btn')) return;
      const src = card.dataset.image;
      const name = card.dataset.name;
      modalImage.src = src;
      modalImage.alt = name;
      modalDownload.href = src;
      modalDownload.textContent = `Download${name ? ` — ${name}` : ''}`;
      wallpaperModal.classList.add('wallpaper-modal--open');
      document.body.style.overflow = 'hidden';
    });

    const downloadBtn = card.querySelector('.wallpaper-card__download-btn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const src = card.dataset.image;
        const name = card.dataset.name;
        const ext = src.includes('.') ? src.substring(src.lastIndexOf('.')) : '';
        const filename = (name || src.split('/').pop().replace(ext, '')) + ext;
        const link = document.createElement('a');
        link.href = src;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  });

  const modalContent = document.querySelector('.wallpaper-modal__content');

  function closeModal() {
    if (wallpaperModal.classList.contains('wallpaper-modal--closing')) return;
    wallpaperModal.classList.add('wallpaper-modal--closing');
    modalContent.addEventListener('animationend', () => {
      wallpaperModal.classList.remove('wallpaper-modal--open', 'wallpaper-modal--closing');
      document.body.style.overflow = '';
    }, { once: true });
  }

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && wallpaperModal.classList.contains('wallpaper-modal--open')) {
      closeModal();
    }
  });
}


