# School Database Design

## 1. Tables and Entities

### Students

The students table stores information about each student. It contains an ID, name, and email address. The ID is the primary key, and each email address must be unique. The name and email are required.

### Courses

The courses table stores the courses offered by the school. It contains a course ID and course name. The ID is the primary key, and the course name is required.

### Enrolments

The enrolments table records which student is enrolled in which course and the grade they receive. It contains an enrolment ID, student ID, course ID, and grade. The student ID and course ID are foreign keys referencing the students and courses tables.

The combination of student ID and course ID must be unique to prevent a student from enrolling in the same course twice.

## 2. Relationships

A student can have many enrolments, but each enrolment belongs to one student. This is a one-to-many relationship between students and enrolments.

A course can also have many enrolments, but each enrolment belongs to one course. This is a one-to-many relationship between courses and enrolments.

Students and courses have a many-to-many relationship because a student can take several courses and each course can have several students. The enrolments table is necessary as a join table to connect students and courses. It also stores the grade for each student's enrolment.

## 3. Index

I would add an index on enrolments(course_id). This would help the database find enrolments for a particular course more efficiently, especially when the school has many students and courses.

## 4. SQL or NoSQL?

I would choose SQL for this school database because the information is structured and has clear relationships between students, courses, and enrolments. SQL supports primary keys, foreign keys, unique constraints, and queries using JOIN and GROUP BY. These features help maintain accurate data and prevent duplicate enrolments. A relational database such as SQLite is suitable for this assignment and a small school system.
