# TechMe - Modern Portfolio Website

A sleek, responsive portfolio website with a futuristic cyberpunk aesthetic featuring glassmorphism effects, particle animations, and smooth interactions.

## ✨ Features

### 🎨 Design & Visual Effects

- **Cyberpunk/Futuristic Theme** with neon accents and dark color scheme
- **Glassmorphism Effects** with backdrop blur and transparency
- **Animated Particle Background** with interactive mouse effects
- **Gradient Text Effects** and glowing animations
- **Smooth Transitions** and hover animations throughout

### 🌙 Theme System

- **Dark/Light Mode Toggle** with localStorage persistence
- **CSS Custom Properties** for easy theme customization
- **Automatic Icon Updates** based on selected theme

### 📱 Responsive Design

- **Mobile-First Approach** with breakpoints at 768px and 480px
- **Collapsible Navigation** with animated hamburger menu
- **Adaptive Layouts** that work on all screen sizes
- **Touch-Friendly** buttons and interactions

### 🎯 Interactive Components

#### Navigation

- **Smooth Scrolling** to page sections
- **Active Link Highlighting** based on scroll position
- **Transparent Navbar** that adapts on scroll
- **Mobile-Responsive** hamburger menu

#### Hero Section

- **Particle Animation System** with 100+ interactive particles
- **Animated Typography** with gradient text effects
- **Call-to-Action Buttons** with hover animations
- **Scroll Indicator** with bouncing animation

#### About Me

- **Rotating Avatar Border** animation
- **Glassmorphism Bio Card** with backdrop blur
- **Tech Stack Grid** with hover effects
- **Download Resume** button (customizable)

#### Projects Showcase

- **Interactive Project Cards** with image overlays
- **Modal Popups** with detailed project information
- **Hover Animations** and scaling effects
- **Technology Tags** for each project
- **External Links** to live demos and GitHub repos

#### Skills Section

- **Filterable Skills** by category (Frontend, Backend, Tools)
- **Animated Progress Bars** with shimmer effects
- **Scroll-Triggered Animations** for skill visibility
- **Percentage Indicators** for skill levels

#### Contact Form

- **Form Validation** with real-time feedback
- **Floating Labels** with smooth animations
- **Error/Success Messages** with styling
- **Social Media Links** with hover effects

### 🚀 Performance Features

- **Intersection Observer** for scroll-triggered animations
- **Efficient Particle System** with optimized rendering
- **CSS-only Animations** where possible
- **Accessibility Support** with reduced motion preferences

## 🛠️ Customization Guide

### Personal Information

Update the following in `index.html`:

1. **Name and Title** (lines 42-45):

```html
<span class="name">Your Name</span> <span class="title">Your Job Title</span>
```

2. **Bio Content** (lines 67-70):

```html
<h3>Hello, I'm [Your Name]</h3>
<p>Your bio content here...</p>
```

3. **Contact Information** (lines 286-294):

```html
<span>your.email@domain.com</span>
<span>+1 (555) 123-4567</span>
<span>Your City, State</span>
```

### Projects

Modify the `projectData` object in `script.js` (lines 226-267) to add your own projects:

```javascript
'your-project': {
  title: 'Your Project Title',
  description: 'Detailed project description...',
  image: 'path/to/your/image.jpg',
  tech: ['React', 'Node.js', 'MongoDB'],
  liveUrl: 'https://your-project.com',
  githubUrl: 'https://github.com/you/project'
}
```

### Skills

Update skills in `index.html` (lines 222-261) and adjust the categories and percentages:

```html
<div class="skill-item" data-category="frontend">
  <div class="skill-info">
    <span class="skill-name">Your Skill</span>
    <span class="skill-percentage">85%</span>
  </div>
  <div class="skill-bar">
    <div class="skill-progress" data-width="85"></div>
  </div>
</div>
```

### Tech Stack

Modify the tech grid in `index.html` (lines 84-115):

```html
<div class="tech-item" data-tech="YourTech">
  <i class="fab fa-your-icon"></i>
  <span>Your Technology</span>
</div>
```

### Colors and Styling

Customize the color scheme in `styles.css` by modifying the CSS variables (lines 2-20):

```css
:root {
  --accent-primary: #your-primary-color;
  --accent-secondary: #your-secondary-color;
  --bg-primary: #your-background-color;
  /* Add more customizations */
}
```

### Images

Replace the following images with your own:

1. **Profile Photo**: Update the `src` attribute in the avatar img tag
2. **Project Images**: Update image URLs in the `projectData` object
3. **Favicon**: Add your own favicon.ico file

## 🔧 Technical Requirements

- Modern web browser with CSS Grid and Flexbox support
- JavaScript ES6+ support
- No external dependencies beyond Font Awesome and Google Fonts

## 📁 File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # All CSS styling and animations
├── script.js           # JavaScript functionality
├── resume.pdf          # Your resume file (add your own)
└── README.md           # This documentation
```

## 🌐 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you make improvements that could benefit others, pull requests are welcome!

## 📧 Contact

If you have questions or need help customizing this portfolio, feel free to reach out through the contact form on the live site.

---

**Built with 💻 and ❤️ for the developer community**
