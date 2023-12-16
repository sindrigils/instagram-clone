from django.urls import path

from .views import UserProfileDetails, CreateUserProfile, UserProfilePicView

urlpatterns = [
    path("<str:username>", UserProfileDetails.as_view(), name="fetch profile details"),
    path(
        "create-profile/<str:id>",
        CreateUserProfile.as_view(),
        name="create a user profile",
    ),
    path(
        "profile-pic/<str:id>",
        UserProfilePicView.as_view(),
        name="fetch the user profile pic",
    ),
]
