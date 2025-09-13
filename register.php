<?php
header("Content-Type: application/json");
session_start();

require_once __DIR__ . '/../db.php';

// Get and sanitize POST data
$firstName = filter_input(INPUT_POST, 'first_name', FILTER_SANITIZE_STRING);
$lastName = filter_input(INPUT_POST, 'last_name', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$password = $_POST['password'] ?? '';
$name = trim("$firstName $lastName");

// Validate input
$errors = [];

if (empty($firstName) || empty($lastName)) {
    $errors['first-name'] = 'First and last name are required';
    $errors['last-name'] = 'First and last name are required';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Invalid email format';
}

if (strlen($password) < 8) {
    $errors['password'] = 'Password must be at least 8 characters';
} elseif (!preg_match('/[A-Z]/', $password) || !preg_match('/[0-9]/', $password)) {
    $errors['password'] = 'Password must contain at least one uppercase letter and one number';
}

if (!empty($errors)) {
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

try {
    $db = new Database();
    $conn = $db->conn;

    // Check if email exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = :email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $errors['email'] = 'Email already registered';
        echo json_encode(['success' => false, 'errors' => $errors]);
        exit;
    }

    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Insert user with prepared statement
    $stmt = $conn->prepare("INSERT INTO users (name, email, password, created_at) 
                           VALUES (:name, :email, :password, NOW())");
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $hashedPassword);

    if (!$stmt->execute()) {
        throw new Exception('Failed to create user');
    }

    // Get user data without password
    $userId = $conn->lastInsertId();
    $stmt = $conn->prepare("SELECT id, name, email, created_at FROM users WHERE id = :id");
    $stmt->bindParam(':id', $userId);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Start session and set user data
    $_SESSION['user'] = $user;
    $_SESSION['loggedin'] = true;

    echo json_encode([
        'success' => true,
        'message' => 'Registration successful',
        'user' => $user,
        'redirect' => 'dashboard.html'
    ]);
} catch (PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'A database error occurred']);
} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
