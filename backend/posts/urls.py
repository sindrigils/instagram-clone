from django.urls import path

from .views import CreatePostView, UserPostsView, UserProfilePostsView

urlpatterns = [
    path("create-post", CreatePostView.as_view(), name="creates a posts"),
    path(
        "<str:user_id>", UserPostsView.as_view(), name="fetches all posts from a user"
    ),
    path(
        "profile-page/<str:user_id>",
        UserProfilePostsView.as_view(),
        name="fetches all posts from a user to display on his profile page",
    ),
]
