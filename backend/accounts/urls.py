from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from django.urls import path

from .views.my_token_obtain import MyTokenObtainPairView
from .views.register import RegisterUser

urlpatterns = [
    path("register", RegisterUser.as_view(), name="create_user"),
    path("token", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify", TokenVerifyView.as_view(), name="verify_token"),
]
