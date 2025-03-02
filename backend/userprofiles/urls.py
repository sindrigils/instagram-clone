from django.urls import path

from .views import (
    UserProfileDetailsView,
    CreateUserProfileView,
    UserProfileView,
    UpdateProfileView,
)

urlpatterns = [
    path(
        "<str:username>", UserProfileDetailsView.as_view(), name="fetch profile details"
    ),
    path(
        "create-profile/<str:id>",
        CreateUserProfileView.as_view(),
        name="create a user profile",
    ),
    path(
        "profile-details/<str:id>",
        UserProfileView.as_view(),
        name="fetch the userprofile details",
    ),
    path("update-profile/<str:id>", UpdateProfileView.as_view()),
]
