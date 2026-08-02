const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const themeToggle = document.getElementById('themeToggle');
const photoUpload = document.getElementById('photoUpload');
const profilePhoto = document.getElementById('profilePhoto');
const profileImage = document.getElementById('profileImage');
const profileInitials = document.getElementById('profileInitials');
const sections = document.querySelectorAll('section[id], header[id]');

function updateThemeButton() {
  if (!themeToggle) return;

  const isDark = document.body.classList.contains('dark');
  themeToggle.innerHTML = isDark ? '☀️' : '🌙';
  themeToggle.setAttribute('aria-pressed', String(isDark));
}

function applySavedTheme() {
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const shouldUseDark = savedTheme ? savedTheme === 'dark' : prefersDark;

  document.body.classList.toggle('dark', shouldUseDark);
  updateThemeButton();
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (!targetSection) return;

    event.preventDefault();
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    updateThemeButton();
  });
}

if (photoUpload && profilePhoto && profileImage && profileInitials) {
  photoUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      profileImage.src = reader.result;
      profileImage.hidden = false;
      profilePhoto.classList.add('has-image');
      profileInitials.hidden = true;
    };

    reader.readAsDataURL(file);
  });
}

window.addEventListener('scroll', () => {
  let currentSection = '';

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 140) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');

    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
});

applySavedTheme();