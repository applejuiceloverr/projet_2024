from django.urls import path
from .views import CreateAccountView, LoginView, current_user, UserLogout
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', CreateAccountView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('current-user/', current_user),
    path('logout/', UserLogout.as_view(), name='logout'),
]