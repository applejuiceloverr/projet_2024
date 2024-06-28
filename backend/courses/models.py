from django.db import models
from django.conf import settings

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Course(models.Model):
    DIFFICULTY_LEVELS = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]

    description = models.TextField()
    title = models.CharField(max_length=255)
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_LEVELS)
    category = models.ForeignKey(Category, related_name='courses', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='courses/', blank=True, null=True)
    video = models.FileField(upload_to='course_videos/')
    pdf = models.FileField(upload_to='course_pdfs/')

    def __str__(self):
        return self.title

class Quiz(models.Model):
    course = models.OneToOneField(Course, related_name='quiz', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.course.title} Quiz"

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, related_name='questions', on_delete=models.CASCADE)
    text = models.TextField()

    def __str__(self):
        return self.text

class Option(models.Model):
    question = models.ForeignKey(Question, related_name='options', on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text

class Certification(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='certifications', on_delete=models.CASCADE)
    course = models.ForeignKey(Course, related_name='certifications', on_delete=models.CASCADE)
    issued_at = models.DateTimeField(auto_now_add=True)
    certificate_file = models.FileField(upload_to='certificates/')

    def __str__(self):
        return f"Certification for {self.user.username} in {self.course.title}"

class UserCourseProgress(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='course_progress', on_delete=models.CASCADE)
    course = models.ForeignKey(Course, related_name='progress', on_delete=models.CASCADE)
    quiz_score = models.FloatField(null=True, blank=True)
    passed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username}'s progress in {self.course.title}"
