from django.urls import path

from .views import FollowersAmount, FollowingAmount, FollowCheckView

urlpatterns = [
    path(
        "followers/count/<int:user_id>",
        FollowersAmount.as_view(),
        name="get followers",
    ),
    path(
        "following/count/<int:user_id>",
        FollowingAmount.as_view(),
        name="get following",
    ),
    path(
        "check/<str:follower_username>/<str:followed_username>",
        FollowCheckView.as_view(),
        name="check if the user is following the other user",
    ),
]
