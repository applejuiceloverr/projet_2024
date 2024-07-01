from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Course, Category, Quiz, Element, Certification, UserCourseProgress

User = get_user_model()

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class ElementSerializer(serializers.ModelSerializer):
    quiz = serializers.PrimaryKeyRelatedField(queryset=Quiz.objects.all())

    class Meta:
        model = Element
        fields = ['id', 'quiz', 'question', 'response', 'option1', 'option2']

class QuizSerializer(serializers.ModelSerializer):
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())
    elements = ElementSerializer(many=True, read_only=True)

    class Meta:
        model = Quiz
        fields = ['id', 'course', 'title', 'elements']

class CourseSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    category_detail = CategorySerializer(source='category', read_only=True)
    image = serializers.ImageField(required=False, allow_null=True)
    video = serializers.FileField(required=False, allow_null=True)
    pdf = serializers.FileField(required=False, allow_null=True)
    created_by = serializers.PrimaryKeyRelatedField(read_only=True)
    difficulty = serializers.ChoiceField(choices=Course.DIFFICULTY_LEVELS)
    quiz = QuizSerializer(read_only=True)  # Corrected: removed source='quiz'

    class Meta:
        model = Course
        fields = ['id', 'description', 'title', 'difficulty', 'category', 'category_detail', 'image', 'video', 'pdf', 'created_by', 'difficulty', 'quiz']  # Include 'quiz'

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
