from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('account/', include('Account.urls')), 
    path('subscriptions/', include('subscriptions.urls')),
    path('courses/', include('courses.urls')),
    path('chatbot/', include('chatbot.urls')),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)