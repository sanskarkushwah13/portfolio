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

const accentToggle = document.getElementById('accentToggle');
const accentOptions = [
  { accent: '#ffd54f', accentDark: '#b8871d' },
  { accent: '#22c55e', accentDark: '#166534' },
  { accent: '#38bdf8', accentDark: '#0369a1' },
  { accent: '#f472b6', accentDark: '#be185d' }
];

function applyAccent(index) {
  const accent = accentOptions[index] || accentOptions[0];
  document.documentElement.style.setProperty('--accent', accent.accent);
  document.documentElement.style.setProperty('--accent-dark', accent.accentDark);
  localStorage.setItem('portfolio-accent', String(index));
  if (accentToggle) {
    accentToggle.textContent = `🎨`;
    accentToggle.setAttribute('aria-label', `Change accent color (current ${accent.accent})`);
  }
}

function applySavedAccent() {
  const savedAccent = Number(localStorage.getItem('portfolio-accent'));
  const index = Number.isInteger(savedAccent) && savedAccent >= 0 && savedAccent < accentOptions.length ? savedAccent : 0;
  applyAccent(index);
}

if (accentToggle) {
  accentToggle.addEventListener('click', () => {
    const currentAccent = Number(localStorage.getItem('portfolio-accent')) || 0;
    const nextAccent = (currentAccent + 1) % accentOptions.length;
    applyAccent(nextAccent);
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
applySavedAccent();

// Blog Articles Data
const blogArticles = [
  {
    id: 1,
    title: "Understanding Generative Adversarial Networks (GANs)",
    category: "Deep Learning",
    date: "August 15, 2026",
    excerpt: "A comprehensive guide to GANs, their architecture, training dynamics, and applications in image synthesis and beyond.",
    content: `
      <h2>Understanding Generative Adversarial Networks (GANs)</h2>
      <p><strong>Date:</strong> August 15, 2026</p>
      <p><strong>Category:</strong> Deep Learning</p>
      
      <h3>Introduction</h3>
      <p>Generative Adversarial Networks (GANs) represent one of the most important advances in deep learning over the past decade. They consist of two neural networks in competition: a generator that creates fake data and a discriminator that tries to distinguish real from fake.</p>
      
      <h3>How GANs Work</h3>
      <p>The training process is an adversarial game where:</p>
      <ul>
        <li>The <strong>Generator</strong> learns to create realistic data from random noise</li>
        <li>The <strong>Discriminator</strong> learns to distinguish real data from generated data</li>
        <li>Both networks improve iteratively through this competitive process</li>
      </ul>
      
      <h3>Key Challenges</h3>
      <p>Training GANs comes with several challenges:</p>
      <ul>
        <li><strong>Mode Collapse:</strong> Generator produces limited variety of samples</li>
        <li><strong>Vanishing Gradients:</strong> Training becomes unstable</li>
        <li><strong>Training Instability:</strong> Loss values oscillate unpredictably</li>
      </ul>
      
      <h3>Recent Advances</h3>
      <p>Modern GAN architectures like WGAN, WGAN-GP, StyleGAN, and ProGAN have addressed many of these issues through improved loss functions and architectural innovations.</p>
      
      <h3>Applications</h3>
      <p>GANs have demonstrated remarkable success in:</p>
      <ul>
        <li>Image synthesis and style transfer</li>
        <li>Data augmentation for medical imaging</li>
        <li>Super-resolution and image restoration</li>
        <li>Anomaly detection</li>
        <li>3D object generation</li>
      </ul>
    `
  },
  {
    id: 2,
    title: "Computer Vision for Sports Analytics",
    category: "Computer Vision",
    date: "August 10, 2026",
    excerpt: "Exploring how computer vision techniques are transforming sports analytics with semantic segmentation for cricket and beyond.",
    content: `
      <h2>Computer Vision for Sports Analytics</h2>
      <p><strong>Date:</strong> August 10, 2026</p>
      <p><strong>Category:</strong> Computer Vision</p>
      
      <h3>Introduction</h3>
      <p>Computer vision is revolutionizing how we analyze sports. From player tracking to ball detection, visual AI enables unprecedented insights into athletic performance.</p>
      
      <h3>Semantic Segmentation in Cricket</h3>
      <p>Our cricket analytics project uses semantic segmentation to classify every pixel in a frame into meaningful categories:</p>
      <ul>
        <li>Players (batting, fielding, bowling)</li>
        <li>Pitch and field areas</li>
        <li>Spectators and boundaries</li>
        <li>Equipment (bat, ball, stumps)</li>
      </ul>
      
      <h3>Technical Approach</h3>
      <p>We implemented U-Net and DeepLabV3+ architectures trained on custom-annotated cricket footage. The models achieve high accuracy in real-time segmentation.</p>
      
      <h3>Key Metrics</h3>
      <ul>
        <li><strong>mIoU (mean Intersection over Union):</strong> >0.85 across all classes</li>
        <li><strong>Inference Speed:</strong> 30 FPS on GPU</li>
        <li><strong>Robustness:</strong> Handles various lighting and weather conditions</li>
      </ul>
      
      <h3>Real-World Applications</h3>
      <ul>
        <li>Performance analytics for coaches</li>
        <li>Broadcast enhancement with automatic segmentation overlays</li>
        <li>Injury risk assessment through movement pattern analysis</li>
        <li>Talent scouting and player evaluation</li>
      </ul>
    `
  },
  {
    id: 3,
    title: "Loss Functions in Deep Learning: A Comparative Study",
    category: "Machine Learning",
    date: "August 5, 2026",
    excerpt: "Deep dive into different loss functions for GANs including Binary Cross-Entropy, WGAN, and their impact on training.",
    content: `
      <h2>Loss Functions in Deep Learning: A Comparative Study</h2>
      <p><strong>Date:</strong> August 5, 2026</p>
      <p><strong>Category:</strong> Machine Learning</p>
      
      <h3>Why Loss Functions Matter</h3>
      <p>The choice of loss function fundamentally impacts how neural networks learn. For GANs specifically, the adversarial loss function determines convergence behavior, sample quality, and training stability.</p>
      
      <h3>Commonly Used GAN Loss Functions</h3>
      
      <h4>1. Binary Cross-Entropy (Standard GAN)</h4>
      <p>The original loss function - simple but suffers from vanishing gradients during training.</p>
      
      <h4>2. Least Squares GAN (LSGAN)</h4>
      <p>Provides smoother gradients and more stable training. Great for consistent results across different domains.</p>
      
      <h4>3. Wasserstein GAN (WGAN)</h4>
      <p>Uses Earth Mover's distance for more meaningful distance metrics between distributions. Excellent for mode coverage.</p>
      
      <h4>4. WGAN with Gradient Penalty (WGAN-GP)</h4>
      <p>Improves upon WGAN with differentiable gradient penalty. Best for CIFAR-10 and natural image generation.</p>
      
      <h4>5. Hinge Loss GAN</h4>
      <p>SVM-inspired margin-based loss. Provides competitive results with lower computational overhead.</p>
      
      <h3>Comparative Results</h3>
      <p>Our research evaluated these loss functions across three diverse datasets (CIFAR-10, EuroSAT, CheXpert) with findings:</p>
      <ul>
        <li><strong>Most Consistent:</strong> LSGAN across all domains</li>
        <li><strong>Best for Natural Images:</strong> WGAN-GP</li>
        <li><strong>Best Mode Diversity:</strong> WGAN</li>
        <li><strong>Most Efficient:</strong> Hinge Loss</li>
      </ul>
    `
  },
  {
    id: 4,
    title: "Machine Learning Pipeline: From Data to Deployment",
    category: "Data Science",
    date: "July 30, 2026",
    excerpt: "A practical guide to building end-to-end machine learning systems with proper data handling, validation, and deployment.",
    content: `
      <h2>Machine Learning Pipeline: From Data to Deployment</h2>
      <p><strong>Date:</strong> July 30, 2026</p>
      <p><strong>Category:</strong> Data Science</p>
      
      <h3>The Complete ML Pipeline</h3>
      <p>Building a production-ready ML system requires much more than training a model. Here's the complete pipeline:</p>
      
      <h3>1. Data Collection & Preparation</h3>
      <ul>
        <li>Source identification and gathering</li>
        <li>Data cleaning and preprocessing</li>
        <li>Feature engineering and selection</li>
        <li>Handling missing values and outliers</li>
      </ul>
      
      <h3>2. Exploratory Data Analysis (EDA)</h3>
      <ul>
        <li>Statistical analysis and visualization</li>
        <li>Pattern and correlation discovery</li>
        <li>Distribution analysis</li>
        <li>Anomaly detection</li>
      </ul>
      
      <h3>3. Model Development</h3>
      <ul>
        <li>Algorithm selection</li>
        <li>Hyperparameter tuning</li>
        <li>Cross-validation and evaluation</li>
        <li>Error analysis and iteration</li>
      </ul>
      
      <h3>4. Validation & Testing</h3>
      <ul>
        <li>Independent test set evaluation</li>
        <li>Performance metrics assessment</li>
        <li>Real-world performance simulation</li>
        <li>Robustness testing</li>
      </ul>
      
      <h3>5. Deployment & Monitoring</h3>
      <ul>
        <li>Model serialization and containerization</li>
        <li>API development</li>
        <li>Performance monitoring</li>
        <li>Continuous improvement and retraining</li>
      </ul>
      
      <h3>Best Practices</h3>
      <p>Always maintain version control for data and models, document your pipeline thoroughly, and establish feedback loops for continuous improvement.</p>
    `
  }
];

// Initialize Blog Grid
function initializeBlog() {
  const blogGrid = document.getElementById('blogGrid');
  if (!blogGrid) return;

  blogGrid.innerHTML = blogArticles.map(article => `
    <div class="blog-card" onclick="openBlogArticle(${article.id})">
      <span class="blog-category">${article.category}</span>
      <h3>${article.title}</h3>
      <p class="blog-excerpt">${article.excerpt}</p>
      <div class="blog-meta">
        <span class="blog-date">${article.date}</span>
        <span class="blog-read-more">Read More →</span>
      </div>
    </div>
  `).join('');
}

// Modal Functions
function openBlogArticle(articleId) {
  const article = blogArticles.find(a => a.id === articleId);
  if (!article) return;

  const blogModal = document.getElementById('blogModal');
  const blogModalBody = document.getElementById('blogModalBody');
  
  if (blogModal && blogModalBody) {
    blogModalBody.innerHTML = article.content;
    blogModal.classList.add('active');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}

// Modal event listeners
document.addEventListener('DOMContentLoaded', () => {
  const projectModal = document.getElementById('projectModal');
  const blogModal = document.getElementById('blogModal');
  const closeButtons = document.querySelectorAll('.close-modal');

  closeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal');
      if (modal) {
        modal.classList.remove('active');
      }
    });
  });

  // Close modal when clicking outside
  [projectModal, blogModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    }
  });

  // Make projects interactive
  const projects = document.querySelectorAll('.project');
  projects.forEach(project => {
    project.addEventListener('click', () => {
      const title = project.querySelector('h3');
      const description = project.querySelector('p');
      const link = project.querySelector('a');
      
      if (projectModal) {
        let modalContent = `
          <h2>${title ? title.textContent : 'Project'}</h2>
          <p>${description ? description.textContent : ''}</p>
        `;
        
        if (link) {
          modalContent += `<p><a href="${link.href}" target="_blank" style="color: var(--primary); font-weight: 600;">View on GitHub →</a></p>`;
        }
        
        const modalBody = document.getElementById('modalBody');
        if (modalBody) {
          modalBody.innerHTML = modalContent;
          projectModal.classList.add('active');
        }
      }
    });
  });

  // Initialize blog
  initializeBlog();
});