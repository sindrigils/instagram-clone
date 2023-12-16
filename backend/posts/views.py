from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .serializers import PostSerializer, ProfilePagePostSerializer
from accounts.models import CustomUser
from .models import Post, PostImage


class CreatePostView(APIView):
    """Creates a post"""

    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_id = request.data["user_id"]
        description = request.data.get("description", "")
        images = request.FILES.getlist("images")
        user = CustomUser.objects.filter(id=user_id).first()
        post = Post.objects.create(user=user, description=description)

        for image in images:
            PostImage.objects.create(post=post, image=image)

        return Response(
            {"message": "Post created successfully"}, status=status.HTTP_201_CREATED
        )


class UserPostsView(APIView):
    """Fetches all the posts from a particular user"""

    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        """Gets all of the posts from a user"""
        user = CustomUser.objects.filter(id=user_id).first()
        if user:
            posts = user.posts.all()
            serialize_posts = PostSerializer(posts, many=True)
            return Response({"posts": serialize_posts.data})
        return Response(data="User not found!", status=status.HTTP_404_NOT_FOUND)


class UserProfilePostsView(APIView):
    """Fetches all the posts from a user to display on his profile page (only fetches the first image for each post)"""

    permission_classes = [IsAuthenticated]

    def get(self, request, user_id):
        user = CustomUser.objects.filter(id=user_id).first()
        if user:
            posts = user.posts.all()
            serialize_posts = ProfilePagePostSerializer(posts, many=True)
            return Response({"posts": serialize_posts.data})

        return Response(data="User not found!", status=status.HTTP_404_NOT_FOUND)


class FollowingPostsView(APIView):
    """Fetches all of the posts from the people that a particular user follows"""

    permission_classes = [IsAuthenticated]
