// Wyatt Academy Authentication System
const WyattAuth = {
  // Initialize the authentication system
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
    enrollments: []
  },

  // Current user session
  currentUser: null,

  // Load data from localStorage
  loadData() {
    const savedData = localStorage.getItem('wyattAuthData');
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
    localStorage.setItem('wyattAuthData', JSON.stringify(this.data));
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

  // Update authentication UI
  updateAuthUI() {
    const authLinks = document.getElementById('auth-links');
    if (authLinks) {
      if (this.currentUser) {
        authLinks.innerHTML = `
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img src="${this.currentUser.avatar}" width="30" height="30" class="rounded-circle mr-2">
              ${this.currentUser.name.split(' ')[0]}
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="dashboard.html"><i class="ti-dashboard mr-2"></i>Dashboard</a>
              <a class="dropdown-item" href="profile.html"><i class="ti-user mr-2"></i>Profile</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#" id="logout-link"><i class="ti-power-off mr-2"></i>Logout</a>
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
  WyattAuth.init();
});