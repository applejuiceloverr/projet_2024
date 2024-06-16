from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, CategoryViewSet, CoursesByCategoryView
from django.conf import settings
from django.conf.urls.static import static


router = DefaultRouter()
router.register(r'courses', CourseViewSet)
router.register(r'categories', CategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('categories/<int:category_id>/courses/', CoursesByCategoryView.as_view(), name='courses-by-category'),] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

