📚 Online Learning Platform with AI, Django, React, and Stripe

A feature-rich online learning platform built using Django and React, designed for secure and interactive learning experiences. The app supports multiple course categories, secure payments, AI-powered chat, and an integrated code compiler.
🚀 Features
🌐 Frontend (React + Tailwind CSS)

    Responsive Design: Fully responsive interface for a seamless experience on both desktop and mobile.
    Cool UI/UX: Developed with Tailwind CSS and various React libraries for a modern, sleek, and user-friendly design.
    Axios Integration: Fetch data efficiently from the backend using Axios for a dynamic user experience.

🛠️ Backend (Django + Django REST Framework)

    Django REST API: Robust and scalable backend with Django Rest Framework to handle requests.
    Secure Payments: Use Stripe for secure subscription payments to access premium courses.
    MySQL Database: All data is stored securely in a MySQL database.
    Security: Implements CSRF protection, access tokens, and hashed passwords for security.

📚 Course Management

    Browse Categories: Courses are organized into categories such as Coding, Linux, Cloud, etc.
    Subscription-based Access: Only subscribed users can access full course content, protected by secure payments via Stripe.
    Learning Materials: Courses include:
        Video tutorials
        PDF resources
        Certifications after passing quizzes.
    AI Chatbot: A built-in chatbot powered by the OpenAI API assists learners with course-related questions.

🖥️ Integrated Code Compiler

    Piston API Integration: Compile and run code within the platform using the Piston API for hands-on learning.

📊 Admin and Teacher Interfaces

    Django Superuser Interface: Admins can manage users, courses, and site content.
    Teacher/Organization Role:
        Track the progress of enrolled students.
        View certification status for each student.
        See the number of applicants for each course.
        Create Courses: Teachers can add:
            Course name, description, and categories.
            PDFs, videos, and course images.
            Upload Excel quizzes, processed using Pandas, for certification exams.

💻 Tech Stack
Backend

    Django for server-side logic and data management.
    Django REST Framework to create a scalable and secure API.
    Stripe API for handling secure subscription payments.
    MySQL as the database.

Frontend

    React for building a responsive and dynamic user interface.
    Tailwind CSS for fast and flexible styling.
    Axios for making requests to the backend.

Additional Features

    Piston API: Compile user-submitted code in multiple languages.
    OpenAI API: Integrated chatbot to assist learners.

🔐 Security

    Token-based Authentication: Secured access using JWT tokens for authenticated users.
    CSRF Protection: Cross-Site Request Forgery prevention enabled.
    Hashed Passwords: User passwords are securely hashed for safety.
