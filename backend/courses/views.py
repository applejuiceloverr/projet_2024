from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from .models import Course, Category
from .serializers import CourseSerializer, CategorySerializer

class CourseViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = CourseSerializer
    queryset = Course.objects.all()

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
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)
