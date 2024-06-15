from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('account/', include('Account.urls')), 
    path('subscriptions/', include('subscriptions.urls')),
    path('courses/', include('courses.urls')),
]