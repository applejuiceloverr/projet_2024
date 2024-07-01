from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CourseViewSet, CategoryViewSet, CoursesByCategoryView, 
    CategoryListCreateView, CategoryDetailView, 
    CourseListCreateView, CourseDetailView, 
    QuizViewSet, ElementViewSet, UploadQuizView,
    CoursesByTeacherView
)
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'quizzes', QuizViewSet)
router.register(r'elements', ElementViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('categories/<int:category_id>/courses/', CoursesByCategoryView.as_view(), name='courses-by-category'),
    path('categories/list/', CategoryListCreateView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', CategoryDetailView.as_view(), name='category-detail'),
    path('courses/list/', CourseListCreateView.as_view(), name='course-list-create'),
    path('courses/<int:pk>/', CourseDetailView.as_view(), name='course-detail'),
    path('courses/teacher/<int:teacher_id>/', CoursesByTeacherView.as_view(), name='courses-by-teacher'),
    path('courses/<int:course_id>/upload-quiz/', UploadQuizView.as_view(), name='upload-quiz'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)