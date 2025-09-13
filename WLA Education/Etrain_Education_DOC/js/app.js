// Wyatt Academy Application - Pure JavaScript Version
const WyattAcademy = {
  // Initialize the application
  init() {
    this.loadData();
    this.setupEventListeners();
    this.updateAuthUI();
  },

  // Sample data structure
  data: {
    users: [
      {
        id: 1,
        name: "John Doe",
        email: "user@example.com",
        password: "password123", // Note: In production, use proper hashing
        avatar: "img/author/author_1.png",
        membership: "Premium"
      }
    ],
    courses: [
      {
        id: 1,
        title: "Full Stack Web Development",
        description: "Master front-end and back-end development with our comprehensive program covering HTML, CSS, JavaScript, and Node.js.",
        category: "Technology",
        duration: 20,
        level: "Intermediate",
        price: 199.00,
        image_url: "img/special_cource_1.png",
        instructor: {
          name: "James Well",
          avatar: "img/author/author_1.png"
        },
        rating: 4.2,
        sections: [
          {
            title: "HTML & CSS Fundamentals",
            lessons: [
              {
                id: 101,
                title: "Introduction to HTML",
                duration: 45,
                video_url: "videos/html-intro.mp4"
              }
            ]
          }
        ]
      }
    ],
    enrollments: [],
    testimonials: [
      {
        name: "David Wilson",
        role: "Computer Science Graduate",
        text: "Wyatt Academy transformed my approach to learning. The supportive environment and dedicated teachers helped me discover my passion for computer science.",
        image: "img/testimonial_img_1.png"
      }
    ]
  },

  // Current user session
  currentUser: null,

  // Load data from localStorage
  loadData() {
    const savedData = localStorage.getItem('wyattAcademyData');
    if (savedData) {
      this.data = JSON.parse(savedData);
    }
    
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.currentUser = JSON.parse(currentUser);
    }
  },

  // Save data to localStorage
  saveData() {
    localStorage.setItem('wyattAcademyData', JSON.stringify(this.data));
    if (this.currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }
  },

  // User authentication methods
  registerUser(name, email, password) {
    const userExists = this.data.users.some(user => user.email === email);
    if (userExists) return false;
    
    const newUser = {
      id: this.data.users.length + 1,
      name,
      email,
      password, // Note: In production, use proper hashing
      avatar: "img/default-avatar.png",
      membership: "Basic"
    };
    
    this.data.users.push(newUser);
    this.saveData();
    return newUser;
  },

  loginUser(email, password) {
    const user = this.data.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser = { ...user };
      delete this.currentUser.password;
      this.saveData();
      return true;
    }
    return false;
  },

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.updateAuthUI();
  },

  // Course enrollment
  enrollUser(courseId) {
    if (!this.currentUser) return false;
    
    const alreadyEnrolled = this.data.enrollments.some(
      e => e.userId === this.currentUser.id && e.courseId === courseId
    );
    
    if (!alreadyEnrolled) {
      this.data.enrollments.push({
        userId: this.currentUser.id,
        courseId,
        date: new Date().toISOString()
      });
      this.saveData();
      return true;
    }
    return false;
  },

  // UI Update methods
  updateAuthUI() {
    const authLinks = document.getElementById('auth-links');
    if (authLinks) {
      if (this.currentUser) {
        authLinks.innerHTML = `
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img src="${this.currentUser.avatar}" width="30" height="30" class="rounded-circle">
              ${this.currentUser.name}
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="dashboard.html">Dashboard</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#" id="logout-link">Logout</a>
            </div>
          </li>
        `;
        
        document.getElementById('logout-link').addEventListener('click', (e) => {
          e.preventDefault();
          this.logout();
          window.location.href = 'index.html';
        });
      } else {
        authLinks.innerHTML = `
          <li class="nav-item">
            <a class="nav-link" href="login.html">Login</a>
          </li>
          <li class="nav-item d-none d-lg-block">
            <a class="btn_1" href="register.html">Sign Up</a>
          </li>
        `;
      }
    }
  },

  // Setup event listeners
  setupEventListeners() {
    // Newsletter form
    const newsletterForm = document.querySelector('.footer-area form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        if (email) {
          alert(`Thank you for subscribing with ${email}!`);
          newsletterForm.reset();
        }
      });
    }
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  WyattAcademy.init();
  
  // Counter animation
  $('.counter').counterUp({
    delay: 10,
    time: 1000
  });
});