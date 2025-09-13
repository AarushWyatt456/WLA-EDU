<?php
header("Content-Type: application/json");
require_once 'db.php';

$action = $_GET['action'] ?? '';

$db = new Database();
$response = ['success' => false, 'message' => 'Invalid action'];

switch ($action) {
    case 'login':
        $email = $_POST['email'] ?? '';
        $password = $_POST['password'] ?? '';
        $response = $db->loginUser($email, $password);
        break;

    case 'get_user_courses':
        $userId = $_GET['user_id'] ?? 0;
        $response = $db->getUserCourses($userId);
        break;

    case 'get_course_lessons':
        $courseId = $_GET['course_id'] ?? 0;
        $userId = $_GET['user_id'] ?? 0;
        $response = $db->getCourseLessons($courseId, $userId);
        break;

    case 'update_progress':
        $userId = $_POST['user_id'] ?? 0;
        $lessonId = $_POST['lesson_id'] ?? 0;
        $courseId = $_POST['course_id'] ?? 0;
        $progress = $_POST['progress'] ?? 0;
        $completed = $_POST['completed'] ?? false;
        $response = $db->updateUserProgress($userId, $lessonId, $courseId, $progress, $completed);
        break;

    case 'get_course_details':
        $courseId = $_GET['course_id'] ?? 0;
        $response = $db->getCourseDetails($courseId);
        break;
}

echo json_encode($response);
