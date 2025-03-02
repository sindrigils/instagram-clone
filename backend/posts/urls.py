from django.urls import path

from .views import CreatePostView, PostsView, UserProfilePostsView

urlpatterns = [
    path("create-post", CreatePostView.as_view(), name="creates a posts"),
    path("<str:id>", PostsView.as_view(), name="fetch a post by its id"),
    path(
        "profile-page/<str:user_id>",
        UserProfilePostsView.as_view(),
        name="fetches all posts from a user to display on his profile page",
    ),
]
