from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CourseViewSet, CategoryViewSet, CoursesByCategoryView, 
    CategoryListCreateView, CategoryDetailView, 
    CourseListCreateView, CourseDetailView, 
    QuizViewSet, ElementViewSet, UploadQuizView,
    CoursesByTeacherView, start_course, complete_course, QuizDetailView,submit_quiz, generate_certificate,StudentsInCoursesView
)
from django.conf import settings
from django.conf.urls.static import static

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
    path('courses/<int:course_id>/start-course/', start_course, name='start-course'),
    path('courses/<int:course_id>/complete-course/', complete_course, name='complete-course'),
    path('courses/<int:course_id>/quiz/', QuizDetailView.as_view(), name='quiz-detail'),  
    path('courses/<int:course_id>/submit-quiz/', submit_quiz, name='submit-quiz'),  
    path('courses/<int:course_id>/generate-certificate/', generate_certificate, name='generate-certificate'),
    path('students-in-courses/<int:teacher_id>/', StudentsInCoursesView.as_view(), name='students-in-courses'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
