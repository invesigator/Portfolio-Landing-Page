// Theme Management
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('theme-toggle');
    this.currentTheme = localStorage.getItem('theme') || 'dark';
    this.init();
  }

  init() {
    this.setTheme(this.currentTheme);
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const icon = this.themeToggle.querySelector('i');
    
    if (theme === 'light') {
      icon.className = 'fas fa-sun';
    } else {
      icon.className = 'fas fa-moon';
    }
    
    localStorage.setItem('theme', theme);
    this.currentTheme = theme;
    
    // Update navbar background to match new theme
    const navigationManager = window.navigationManager;
    if (navigationManager) {
      navigationManager.updateNavbarBackground();
    }
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }
}

// Particle Animation System
class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 100;
    this.connections = [];
    this.mouse = { x: 0, y: 0 };
    
    this.init();
  }

  init() {
    this.resizeCanvas();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resizeCanvas());
    this.canvas.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }

  updateParticles() {
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off edges
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

      // Mouse interaction
      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        particle.x -= dx * 0.001;
        particle.y -= dy * 0.001;
      }
    });
  }

  drawParticles() {
    this.particles.forEach(particle => {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
      this.ctx.fill();
    });
  }

  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(0, 212, 255, ${0.2 - distance / 500})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updateParticles();
    this.drawConnections();
    this.drawParticles();
    requestAnimationFrame(() => this.animate());
  }
}

// Navigation Manager
class NavigationManager {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.hamburger = document.querySelector('.hamburger');
    this.navMenu = document.querySelector('.nav-menu');
    this.sections = document.querySelectorAll('section');
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateActiveLink();
  }

  bindEvents() {
    // Hamburger menu toggle
    this.hamburger.addEventListener('click', () => {
      this.hamburger.classList.toggle('active');
      this.navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
      });
    });

    // Smooth scrolling
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Scroll spy
    window.addEventListener('scroll', () => {
      this.updateActiveLink();
      this.updateNavbarBackground();
    });
  }

  updateActiveLink() {
    let current = '';
    
    this.sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop && 
          window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  updateNavbarBackground() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (window.scrollY > 50) {
      // Add a scrolled class instead of overriding styles
      this.navbar.classList.add('scrolled');
    } else {
      // Remove scrolled class to return to original liquid glass effect
      this.navbar.classList.remove('scrolled');
    }
  }
}

// Project Modal Manager
class ProjectModalManager {
  constructor() {
    this.modal = document.getElementById('project-modal');
    this.modalClose = document.querySelector('.modal-close');
    this.projectCards = document.querySelectorAll('.project-card');
    
    this.projectData = {
      'focusguard': {
        title: 'FYP - FocusGuard: Real-Time Focus Monitoring System',
        description: 'A comprehensive behavioral monitoring system developed as Final Year Project, featuring real-time focus tracking with Pomodoro timer integration and gamified learning features. The system uses advanced computer vision techniques to monitor student attention levels, achieving exceptional accuracy rates of 98.5% in drowsiness detection and 93.8% in yawn detection. Includes an integrated analytics dashboard to visualize student focus patterns and provide actionable insights for improved learning outcomes.',
        image: 'asset/cctv.jpg',
        tech: ['Python', 'Flask', 'OpenCV', 'MediaPipe', 'JavaScript', 'HTML/CSS'],
        githubUrl: 'https://github.com/invesigator/FocusGuard-Real-Time-Self-Monitoring-System-for-Student-Focus'
      },
      'movie-review': {
        title: 'Movie Review and Feedback Web App',
        description: 'A full-stack web application built using 3-tier architecture for movie reviews and user feedback management. The system features comprehensive user authentication, interactive feedback modules, and complete CRUD (Create, Read, Update, Delete) functionality for managing movie reviews. Built with robust backend database management and responsive frontend design to provide seamless user experience across different devices.',
        image: 'asset/movie-review.png',
        tech: ['PHP', 'MySQL', 'XAMPP', 'HTML5', 'CSS3', 'JavaScript'],
        githubUrl: 'https://github.com/invesigator/Movie-Review-and-Feedback-Web-Application'
      },
      'pet-management': {
        title: 'Website for Pet Management',
        description: 'A comprehensive pet management web application built with modern frontend technologies. Features include user authentication system, interactive dashboard for pet owners, and complete CRUD operations for managing pets and their health records. The application utilizes advanced client-side data handling through local storage, session storage, and cookies for efficient user session management and data persistence.',
        image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=250&fit=crop',
        tech: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Bootstrap', 'Local Storage'],
        githubUrl: 'https://github.com/invesigator/Pet-Management-System-Website'
      },
      'labubu-intro': {
        title: 'Labubu Web - Fashion Brand Website',
        description: 'A modern, responsive fashion brand website showcasing the Labubu collection with contemporary design and interactive features. Built as a stylish single-page application representing a fashion-forward brand where "Style Meets Character." Features include responsive design, interactive navigation with mobile-friendly hamburger menu, dynamic product galleries with modal windows, newsletter subscription with validation, and performance optimization with fast loading times. The website utilizes elegant typography combining Playfair Display and Poppins fonts with a sophisticated neutral color palette.',
        image: 'asset/labubu-banner.jpg',
        tech: ['HTML5', 'CSS3', 'JavaScript'],
        githubUrl: 'https://github.com/invesigator/Labubu-Intro.git'
      },
      'hospital-management': {
        title: 'Hospital Management System',
        description: 'A sophisticated Java-based desktop application featuring a modern Swing GUI designed to streamline hospital operations and management. The comprehensive system includes specialized modules for doctor and patient management, medicine inventory tracking, lab report generation, hospital facilities management, and staff records administration. Built with focus on user experience and operational efficiency for healthcare environments.',
        image: 'asset/hms.jpg',
        tech: ['Java', 'Swing', 'MySQL', 'JDBC', 'Desktop Application'],
        githubUrl: 'https://github.com/invesigator/Hospital-Management-System'
      }
    };
    
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    this.projectCards.forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.project-link')) {
          const projectId = card.dataset.project;
          this.openModal(projectId);
        }
      });
    });

    this.modalClose.addEventListener('click', () => this.closeModal());
    
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });
  }

  openModal(projectId) {
    const project = this.projectData[projectId];
    if (!project) return;

    document.getElementById('modal-img').src = project.image;
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-description').textContent = project.description;
    document.getElementById('modal-github').href = project.githubUrl;

    const techContainer = document.getElementById('modal-tech');
    techContainer.innerHTML = '';
    project.tech.forEach(tech => {
      const span = document.createElement('span');
      span.className = 'tech-tag';
      span.textContent = tech;
      techContainer.appendChild(span);
    });

    this.modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Skills Filter Manager
class SkillsFilterManager {
  constructor() {
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.skillItems = document.querySelectorAll('.skill-item');
    this.skillBars = document.querySelectorAll('.skill-progress');
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.animateSkillBars();
  }

  bindEvents() {
    this.filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        this.filterSkills(filter);
      });
    });
  }

  filterSkills(filter) {
    this.skillItems.forEach(item => {
      const category = item.dataset.category;
      
      if (filter === 'all' || category === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }

  animateSkillBars() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target.querySelector('.skill-progress');
          const width = progressBar.dataset.width;
          
          setTimeout(() => {
            progressBar.style.width = width + '%';
          }, 200);
        }
      });
    }, { threshold: 0.5 });

    this.skillItems.forEach(item => {
      observer.observe(item);
    });
  }
}

// Contact Form Manager
class ContactFormManager {
  constructor() {
    this.form = document.querySelector('.contact-form');
    this.inputs = this.form.querySelectorAll('input, textarea');
    
    // EmailJS Configuration
    this.emailjsConfig = {
      serviceID: 'service_xjl2eku', // You'll need to replace this
      templateID: 'template_7qk44om', // You'll need to replace this
      publicKey: 'G8yZhzTSy0rSC7tl6' // You'll need to replace this
    };
    
    this.init();
  }

  init() {
    this.initEmailJS();
    this.bindEvents();
  }

  initEmailJS() {
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
      emailjs.init(this.emailjsConfig.publicKey);
    }
  }

  bindEvents() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    this.inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearErrors(input));
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    
    let isValid = true;
    this.inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      this.submitForm();
    }
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;

    // Remove existing error
    this.clearErrors(field);

    // Required field validation
    if (!value) {
      this.showError(field, 'This field is required');
      isValid = false;
    }

    // Email validation
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        this.showError(field, 'Please enter a valid email address');
        isValid = false;
      }
    }

    return isValid;
  }

  showError(field, message) {
    field.style.borderColor = '#ff006e';
    
    let errorDiv = field.parentNode.querySelector('.error-message');
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.style.color = '#ff006e';
      errorDiv.style.fontSize = '0.8rem';
      errorDiv.style.marginTop = '0.25rem';
      field.parentNode.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
  }

  clearErrors(field) {
    field.style.borderColor = '';
    const errorDiv = field.parentNode.querySelector('.error-message');
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  async submitForm() {
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    try {
      // Prepare template parameters
      const templateParams = {
        from_name: this.form.name.value,
        from_email: this.form.email.value,
        subject: this.form.subject.value,
        message: this.form.message.value,
        to_name: 'Alex Johnson', // Your name
        reply_to: this.form.email.value
      };

      // Check if EmailJS is available
      if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS not loaded');
      }

      // Send email using EmailJS
      const response = await emailjs.send(
        this.emailjsConfig.serviceID,
        this.emailjsConfig.templateID,
        templateParams
      );

      console.log('Email sent successfully:', response);
      this.showSuccessMessage();
      this.form.reset();
      
    } catch (error) {
      console.error('Email sending failed:', error);
      
      // If EmailJS fails, show fallback message
      if (error.message === 'EmailJS not loaded' || this.emailjsConfig.publicKey === 'YOUR_PUBLIC_KEY') {
        this.showFallbackMessage();
      } else {
        this.showErrorMessage();
      }
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }

  showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.style.cssText = `
      background: #00ff88;
      color: #0a0a0f;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
      text-align: center;
      font-weight: 600;
    `;
    message.textContent = 'Message sent successfully! I\'ll get back to you soon.';
    
    this.form.appendChild(message);
    setTimeout(() => message.remove(), 5000);
  }

  showErrorMessage() {
    const message = document.createElement('div');
    message.className = 'error-message';
    message.style.cssText = `
      background: #ff006e;
      color: white;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
      text-align: center;
      font-weight: 600;
    `;
    message.textContent = 'Sorry, there was an error sending your message. Please try again.';
    
    this.form.appendChild(message);
    setTimeout(() => message.remove(), 5000);
  }

  showFallbackMessage() {
    const message = document.createElement('div');
    message.className = 'fallback-message';
    message.style.cssText = `
      background: #00d4ff;
      color: #0a0a0f;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
      text-align: center;
      font-weight: 600;
    `;
    message.innerHTML = `
      📧 EmailJS setup needed! Please contact me directly at: 
      <br><strong>alex.johnson@email.com</strong>
    `;
    
    this.form.appendChild(message);
    setTimeout(() => message.remove(), 8000);
  }
}

// Scroll Animation Manager
class ScrollAnimationManager {
  constructor() {
    this.animatedElements = document.querySelectorAll('.tech-item, .project-card, .skill-item');
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('fade-in');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    this.animatedElements.forEach(element => {
      observer.observe(element);
    });
  }
}

// Smooth Scroll Manager
class SmoothScrollManager {
  constructor() {
    this.scrollIndicator = document.querySelector('.scroll-down');
    this.init();
  }

  init() {
    this.scrollIndicator?.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = this.scrollIndicator.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }
}

// Main App Initialization
class TechMeApp {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
    } else {
      this.initializeComponents();
    }
  }

  initializeComponents() {
    // Initialize all components
    new ThemeManager();
    new ParticleSystem('particle-canvas');
    window.navigationManager = new NavigationManager();
    new ProjectModalManager();
    new SkillsFilterManager();
    new ContactFormManager();
    new ScrollAnimationManager();
    new SmoothScrollManager();

    // Add loading animation
    this.addPageLoadAnimation();
  }

  addPageLoadAnimation() {
    const heroElements = document.querySelectorAll('.hero-title .name, .hero-title .title, .hero-tagline, .hero-buttons');
    
    heroElements.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        element.style.transition = 'all 0.8s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, 500 + (index * 200));
    });
  }
}

// Initialize the application
new TechMeApp(); 