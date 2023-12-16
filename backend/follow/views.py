from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import CustomUser
from .models import Follow


class FollowingAmount(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        user = get_object_or_404(CustomUser, id=user_id)
        followers_count = Follow.objects.filter(follower=user).count()
        return Response({"following_count": followers_count})


class FollowersAmount(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        user = get_object_or_404(CustomUser, id=user_id)
        followers_count = Follow.objects.filter(followed=user).count()
        return Response({"followers_count": followers_count})


class FollowCheckView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, follower_username, followed_username):
        follower_user = get_object_or_404(CustomUser, username=follower_username)
        followed_user = get_object_or_404(CustomUser, username=followed_username)

        is_following = Follow.objects.filter(
            follower=follower_user, followed=followed_user
        ).exists()

        return Response(is_following)
