from rest_framework import generics, viewsets
from rest_framework.decorators import permission_classes, parser_classes, api_view
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import Course, Category, Quiz, Question, Option
from .serializers import CourseSerializer, CategorySerializer, QuizSerializer, QuestionSerializer, OptionSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

@permission_classes([AllowAny])
class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        user_id = self.request.data.get('created_by')
        user = get_object_or_404(User, id=user_id)
        serializer.save(created_by=user)

    def get_queryset(self):
        queryset = super().get_queryset()
        category_id = self.request.query_params.get('category_id')
        if category_id:
            queryset = queryset.filter(category_id=category_id)
        return queryset

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
        serializer.save(created_by=user)

@method_decorator(csrf_exempt, name='dispatch')
@permission_classes([AllowAny])
class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    parser_classes = [MultiPartParser, FormParser]


class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class OptionViewSet(viewsets.ModelViewSet):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer

@permission_classes([AllowAny])
class CoursesByTeacherView(APIView):
    def get(self, request, teacher_id):
        teacher = get_object_or_404(User, id=teacher_id)
        courses = Course.objects.filter(created_by=teacher)
        serializer = CourseSerializer(courses, many=True, context={'request': request})
        return Response(serializer.data)

