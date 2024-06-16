from django.contrib import admin
from .models import Course, Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)  # Only 'name' exists in Category
    search_fields = ('name',)

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'category', 'image', 'created_at')
    search_fields = ('title', 'description')
    list_filter = ('category', 'created_at')
    ordering = ('created_at',)