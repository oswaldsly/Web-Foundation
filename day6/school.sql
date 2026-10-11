
PRAGMA foreign_keys = ON;

-- 1. Create the students table
CREATE TABLE students (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);

-- 2. Create the courses table
CREATE TABLE courses (
    id INTEGER PRIMARY KEY,
    course_name TEXT NOT NULL
);

-- 3. Create the enrolments table
CREATE TABLE enrolments (
    id INTEGER PRIMARY KEY,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    grade TEXT,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    UNIQUE (student_id, course_id)
);

-- 4. Insert sample students
INSERT INTO students (id, name, email) VALUES
(1, 'Amina Otieno', 'amina@example.com'),
(2, 'Brian Kamau', 'brian@example.com'),
(3, 'Carol Wanjiku', 'carol@example.com'),
(4, 'David Ochieng', 'david@example.com');

-- 5. Insert sample courses
INSERT INTO courses (id, course_name) VALUES
(1, 'Database Basics'),
(2, 'Web Development'),
(3, 'Computer Networks');

-- 6. Insert at least five enrolments
INSERT INTO enrolments (student_id, course_id, grade) VALUES
(1, 1, 'A'),
(1, 2, 'B'),
(2, 1, 'B'),
(2, 3, 'A'),
(3, 2, 'C');

-- 7. Query 1: All courses for one student by name
SELECT s.name, c.course_name, e.grade
FROM students AS s
JOIN enrolments AS e ON s.id = e.student_id
JOIN courses AS c ON e.course_id = c.id
WHERE s.name = 'Amina Otieno';

-- 8. Query 2: All students on one course
SELECT s.name, s.email, c.course_name
FROM students AS s
JOIN enrolments AS e ON s.id = e.student_id
JOIN courses AS c ON e.course_id = c.id
WHERE c.course_name = 'Database Basics';

-- 9. Query 3: Number of students per course
SELECT c.course_name, COUNT(e.student_id) AS student_count
FROM courses AS c
LEFT JOIN enrolments AS e ON c.id = e.course_id
GROUP BY c.id, c.course_name;

-- 10. Query 4: Students who have no enrolments
SELECT s.id, s.name, s.email
FROM students AS s
LEFT JOIN enrolments AS e ON s.id = e.student_id
WHERE e.student_id IS NULL;

-- 11. Query 5: Update one enrolment's grade
UPDATE enrolments
SET grade = 'A'
WHERE student_id = 2 AND course_id = 1;

-- Verify the updated grade
SELECT s.name, c.course_name, e.grade
FROM enrolments AS e
JOIN students AS s ON e.student_id = s.id
JOIN courses AS c ON e.course_id = c.id
WHERE e.student_id = 2 AND e.course_id = 1;

-- 12. Add an index to help find students on a course
CREATE INDEX idx_enrolments_course_id
ON enrolments(course_id);
