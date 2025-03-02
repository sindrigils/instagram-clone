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


class PostsView(APIView):
    """Fetche a post by its id"""

    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        """Gets all of the posts from a user"""
        post = Post.objects.filter(id=id).first()
        # nota auth headers til að fá user id og athuga hvort hann sé búinn að like þetta post
        if post:
            serialize_post = PostSerializer(post)
            return Response({"post": serialize_post.data})
        return Response(data="Post not found!", status=status.HTTP_404_NOT_FOUND)


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
