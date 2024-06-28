from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Course, Category, Quiz, Question, Option, Certification, UserCourseProgress

User = get_user_model()

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class CourseSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    category_detail = CategorySerializer(source='category', read_only=True)
    image = serializers.ImageField(required=False, allow_null=True)
    video = serializers.FileField(required=False, allow_null=True)
    pdf = serializers.FileField(required=False, allow_null=True)

    class Meta:
        model = Course
        fields = ['id', 'description', 'title', 'difficulty', 'category', 'category_detail', 'image', 'video', 'pdf']

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['id', 'question', 'text', 'is_correct']

class QuestionSerializer(serializers.ModelSerializer):
    quiz = serializers.PrimaryKeyRelatedField(queryset=Quiz.objects.all())
    options = OptionSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'quiz', 'text', 'options']

class QuizSerializer(serializers.ModelSerializer):
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Quiz
        fields = ['id', 'course', 'title', 'questions']

class CertificationSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())
    course_detail = CourseSerializer(source='course', read_only=True)

    class Meta:
        model = Certification
        fields = ['id', 'user', 'course', 'course_detail', 'issued_at', 'certificate_file']

class UserCourseProgressSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())
    course_detail = CourseSerializer(source='course', read_only=True)

    class Meta:
        model = UserCourseProgress
        fields = ['id', 'user', 'course', 'course_detail', 'quiz_score', 'passed']
