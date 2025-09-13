<?php
class Database
{
    private $host = 'localhost';
    private $db_name = 'wyatt_academy';
    private $username = 'root';
    private $password = '';
    private $conn;

    public function __construct()
    {
        try {
            $this->conn = new PDO(
                "mysql:host={$this->host};dbname={$this->db_name}",
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Connection failed: " . $e->getMessage());
        }
    }

    public function loginUser($email, $password)
    {
        try {
            $query = "SELECT * FROM users WHERE email = :email";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':email', $email);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                if (password_verify($password, $user['password'])) {
                    unset($user['password']);
                    return ['success' => true, 'user' => $user];
                }
            }
            return ['success' => false, 'message' => 'Invalid credentials'];
        } catch (PDOException $e) {
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }

    public function getUserCourses($userId)
    {
        try {
            $query = "SELECT c.*, uc.purchase_date 
                      FROM courses c
                      JOIN user_courses uc ON c.id = uc.course_id
                      WHERE uc.user_id = :user_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
            $stmt->execute();

            $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Calculate progress for each course
            foreach ($courses as &$course) {
                $progress = $this->getCourseProgress($userId, $course['id']);
                $course['progress'] = $progress['progress'];
                $course['completed_lessons'] = $progress['completed_lessons'];
                $course['total_lessons'] = $progress['total_lessons'];
            }

            return ['success' => true, 'courses' => $courses];
        } catch (PDOException $e) {
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }

    public function getCourseProgress($userId, $courseId)
    {
        try {
            // Get total lessons in course
            $query = "SELECT COUNT(*) as total FROM lessons l
                      JOIN sections s ON l.section_id = s.id
                      WHERE s.course_id = :course_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':course_id', $courseId, PDO::PARAM_INT);
            $stmt->execute();
            $total = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

            // Get completed lessons
            $query = "SELECT COUNT(*) as completed FROM user_progress
                      WHERE user_id = :user_id AND course_id = :course_id AND is_completed = 1";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
            $stmt->bindParam(':course_id', $courseId, PDO::PARAM_INT);
            $stmt->execute();
            $completed = $stmt->fetch(PDO::FETCH_ASSOC)['completed'];

            $progress = $total > 0 ? round(($completed / $total) * 100) : 0;

            return [
                'progress' => $progress,
                'completed_lessons' => $completed,
                'total_lessons' => $total
            ];
        } catch (PDOException $e) {
            return ['progress' => 0, 'completed_lessons' => 0, 'total_lessons' => 0];
        }
    }

    public function getCourseLessons($courseId, $userId)
    {
        try {
            // Get course details
            $query = "SELECT * FROM courses WHERE id = :course_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':course_id', $courseId, PDO::PARAM_INT);
            $stmt->execute();
            $course = $stmt->fetch(PDO::FETCH_ASSOC);

            // Get sections
            $query = "SELECT * FROM sections 
                      WHERE course_id = :course_id 
                      ORDER BY order_number";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':course_id', $courseId, PDO::PARAM_INT);
            $stmt->execute();
            $sections = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Get lessons for each section with user progress
            foreach ($sections as &$section) {
                $query = "SELECT l.*, 
                         IFNULL(up.is_completed, 0) as is_completed,
                         IFNULL(up.progress_percent, 0) as progress_percent
                         FROM lessons l
                         LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = :user_id
                         WHERE l.section_id = :section_id
                         ORDER BY l.order_number";
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
                $stmt->bindParam(':section_id', $section['id'], PDO::PARAM_INT);
                $stmt->execute();
                $section['lessons'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }

            // Get course progress
            $progress = $this->getCourseProgress($userId, $courseId);

            return [
                'success' => true,
                'course' => $course,
                'sections' => $sections,
                'progress' => $progress
            ];
        } catch (PDOException $e) {
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }

    public function updateUserProgress($userId, $lessonId, $courseId, $progress, $completed)
    {
        try {
            // Check if progress record exists
            $query = "SELECT id FROM user_progress 
                      WHERE user_id = :user_id AND lesson_id = :lesson_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
            $stmt->bindParam(':lesson_id', $lessonId, PDO::PARAM_INT);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                // Update existing record
                $query = "UPDATE user_progress SET 
                         progress_percent = :progress,
                         is_completed = :completed,
                         last_accessed = NOW(),
                         completed_at = IF(:completed = 1 AND is_completed = 0, NOW(), completed_at)
                         WHERE user_id = :user_id AND lesson_id = :lesson_id";
            } else {
                // Insert new record
                $query = "INSERT INTO user_progress 
                         (user_id, lesson_id, course_id, progress_percent, is_completed, last_accessed, completed_at)
                         VALUES 
                         (:user_id, :lesson_id, :course_id, :progress, :completed, NOW(), IF(:completed = 1, NOW(), NULL))";
            }

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
            $stmt->bindParam(':lesson_id', $lessonId, PDO::PARAM_INT);
            $stmt->bindParam(':course_id', $courseId, PDO::PARAM_INT);
            $stmt->bindParam(':progress', $progress, PDO::PARAM_INT);
            $stmt->bindParam(':completed', $completed, PDO::PARAM_BOOL);
            $stmt->execute();

            return ['success' => true];
        } catch (PDOException $e) {
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }

    public function getCourseDetails($courseId)
    {
        try {
            // Get course details
            $query = "SELECT c.*, u.name as instructor_name, u.avatar as instructor_avatar
                      FROM courses c
                      LEFT JOIN users u ON c.instructor_id = u.id
                      WHERE c.id = :course_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':course_id', $courseId, PDO::PARAM_INT);
            $stmt->execute();
            $course = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$course) {
                return ['success' => false, 'message' => 'Course not found'];
            }

            // Get sections count
            $query = "SELECT COUNT(*) as sections_count FROM sections WHERE course_id = :course_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':course_id', $courseId, PDO::PARAM_INT);
            $stmt->execute();
            $course['sections_count'] = $stmt->fetch(PDO::FETCH_ASSOC)['sections_count'];

            // Get lessons count
            $query = "SELECT COUNT(*) as lessons_count FROM lessons l
                      JOIN sections s ON l.section_id = s.id
                      WHERE s.course_id = :course_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':course_id', $courseId, PDO::PARAM_INT);
            $stmt->execute();
            $course['lessons_count'] = $stmt->fetch(PDO::FETCH_ASSOC)['lessons_count'];

            return ['success' => true, 'course' => $course];
        } catch (PDOException $e) {
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }
}
