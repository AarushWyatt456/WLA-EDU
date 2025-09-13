// auth.js - Authentication functions with profile picture support
$(document).ready(function() {
    // Check authentication status on page load
    checkAuthStatus();
    
    // Initialize login/register forms if they exist on the page
    if ($('#loginForm').length) initLoginForm();
    if ($('#registerForm').length) initRegisterForm();
});

function checkAuthStatus() {
    // Protected pages that require login
    const protectedPages = ['dashboard.html', 'profile.html', 'my-courses.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    // Check if current page is protected
    if (protectedPages.includes(currentPage)) {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            window.location.href = 'login.html';
        }
    }
    
    // For login/register pages, redirect to dashboard if already logged in
    const authPages = ['login.html', 'register.html'];
    if (authPages.includes(currentPage)) {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            window.location.href = 'dashboard.html';
        }
    }
}

function initLoginForm() {
    $('#loginForm').submit(function(e) {
        e.preventDefault();
        const email = $('#loginEmail').val();
        const password = $('#loginPassword').val();
        
        const result = loginUser(email, password);
        if (result.success) {
            window.location.href = 'dashboard.html';
        } else {
            alert(result.message);
        }
    });
}

function initRegisterForm() {
    $('#registerForm').submit(function(e) {
        e.preventDefault();
        const profilePic = $('#registerProfilePic').val() || 'img/default-profile.png';
        const result = registerUser(
            $('#registerFirstName').val(),
            $('#registerLastName').val(),
            $('#registerEmail').val(),
            $('#registerPassword').val(),
            profilePic
        );
        
        if (result.success) {
            window.location.href = 'profile.html';
        } else {
            alert(result.message);
        }
    });
}

// User authentication functions
function registerUser(firstName, lastName, email, password, profilePicture = 'img/default-profile.png') {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if user already exists
    if (users.some(user => user.email === email)) {
        return { success: false, message: 'Email already registered' };
    }

    const newUser = {
        firstName,
        lastName,
        email,
        password, // Note: In a real app, you should hash the password
        profilePicture,
        joinDate: new Date().toISOString(),
        courses: [],
        subscriptionPlan: 'free',
        subscriptionHistory: []
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('userData', JSON.stringify(newUser));
    
    return { success: true, user: newUser };
}

function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('userData', JSON.stringify(user));
        return { success: true, user };
    }
    return { success: false, message: 'Invalid credentials' };
}

function logoutUser() {
    localStorage.removeItem('userData');
    window.location.href = 'index.html';
}