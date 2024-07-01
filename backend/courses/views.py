from rest_framework import generics, viewsets, status
from rest_framework.decorators import permission_classes, parser_classes, api_view
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import Course, Category, Quiz, Element
from .serializers import CourseSerializer, CategorySerializer, QuizSerializer, ElementSerializer
from django.contrib.auth import get_user_model
import pandas as pd
import io

User = get_user_model()

@permission_classes([AllowAny])
class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        user_id = self.request.data.get('created_by')
        user = get_object_or_404(User, id=user_id)
        course = serializer.save(created_by=user)

        quiz_file = self.request.FILES.get('quizFile')
        if quiz_file:
            try:
                self.process_quiz_file(quiz_file, course)
            except Exception as e:
                print(f"Error processing quiz file: {e}")
                course.delete()  # Rollback course creation if quiz processing fails
                raise ValueError(f"Error creating course: {e}")

    def process_quiz_file(self, quiz_file, course):
        try:
            df = pd.read_excel(quiz_file)
            required_columns = ['question', 'response', 'option1', 'option2']
            if not all(column in df.columns for column in required_columns):
                raise ValueError(f"Excel file is missing one of the required columns: {required_columns}")
            
            quiz = Quiz.objects.create(course=course, title=f"{course.title} Quiz")
            
            for index, row in df.iterrows():
                Element.objects.create(
                    quiz=quiz,
                    question=row['question'],
                    response=row['response'],
                    option1=row['option1'],
                    option2=row['option2']
                )
                
        except Exception as e:
            print(f"Error processing quiz file: {e}")
            raise ValueError(f"Error processing quiz file: {e}")

@permission_classes([AllowAny])
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

@permission_classes([AllowAny])
class CoursesByCategoryView(APIView):
    def get(self, request, category_id):
        category = get_object_or_404(Category, id=category_id)
        courses = Course.objects.filter(category=category)
        serializer = CourseSerializer(courses, many=True, context={'request': request})
        return Response(serializer.data)

@permission_classes([AllowAny])
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

@permission_classes([AllowAny])
class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

@method_decorator(csrf_exempt, name='dispatch')
@permission_classes([AllowAny])
class CourseListCreateView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        user_id = self.request.data.get('created_by')
        user = get_object_or_404(User, id=user_id)
        course = serializer.save(created_by=user)

        quiz_file = self.request.FILES.get('quizFile')
        if quiz_file:
            try:
                self.process_quiz_file(quiz_file, course)
            except Exception as e:
                print(f"Error processing quiz file: {e}")
                course.delete()  # Rollback course creation if quiz processing fails
                raise ValueError(f"Error creating course: {e}")

    def process_quiz_file(self, quiz_file, course):
        try:
            df = pd.read_excel(quiz_file)
            required_columns = ['question', 'response', 'option1', 'option2']
            if not all(column in df.columns for column in required_columns):
                raise ValueError(f"Excel file is missing one of the required columns: {required_columns}")
            
            quiz = Quiz.objects.create(course=course, title=f"{course.title} Quiz")
            
            for index, row in df.iterrows():
                Element.objects.create(
                    quiz=quiz,
                    question=row['question'],
                    response=row['response'],
                    option1=row['option1'],
                    option2=row['option2']
                )
                
        except Exception as e:
            print(f"Error processing quiz file: {e}")
            raise ValueError(f"Error processing quiz file: {e}")

@method_decorator(csrf_exempt, name='dispatch')
@permission_classes([AllowAny])
class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    parser_classes = [MultiPartParser, FormParser]

@permission_classes([AllowAny])
class CoursesByTeacherView(APIView):
    def get(self, request, teacher_id):
        teacher = get_object_or_404(User, id=teacher_id)
        courses = Course.objects.filter(created_by=teacher)
        serializer = CourseSerializer(courses, many=True, context={'request': request})
        return Response(serializer.data)

@permission_classes([AllowAny])
class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

@permission_classes([AllowAny])
class ElementViewSet(viewsets.ModelViewSet):
    queryset = Element.objects.all()
    serializer_class = ElementSerializer

@permission_classes([AllowAny])
class UploadQuizView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, course_id):
        course = get_object_or_404(Course, id=course_id)
        file = request.FILES.get('file')
        
        if not file:
            return Response({"error": "No file uploaded."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            df = pd.read_excel(file)
            required_columns = ['question', 'response', 'option1', 'option2']
            if not all(column in df.columns for column in required_columns):
                raise ValueError(f"Excel file is missing one of the required columns: {required_columns}")

            quiz = Quiz.objects.create(course=course, title=f"{course.title} Quiz")
            
            for index, row in df.iterrows():
                Element.objects.create(
                    quiz=quiz,
                    question=row['question'],
                    response=row['response'],
                    option1=row['option1'],
                    option2=row['option2']
                )
            
            return Response({"success": "Quiz created successfully."}, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
