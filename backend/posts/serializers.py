from rest_framework import serializers

from .models import Post, PostImage
from .comments.models import Comment
from .likes.models import Like


class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ["image"]


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = []


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = []


class PostSerializer(serializers.ModelSerializer):
    images = PostImageSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    likes = LikeSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ["description", "created_at", "images", "comments", "likes"]


class ProfilePagePostSerializer(serializers.ModelSerializer):
    images = PostImageSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    likes = LikeSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ["images", "comments", "likes"]

    def to_representation(self, instance):
        representation = super(ProfilePagePostSerializer, self).to_representation(
            instance
        )
        representation["likes"] = instance.likes.count()
        representation["comments"] = instance.comments.count()

        first_image = instance.images.first()
        representation["images"] = PostImageSerializer(first_image).data["image"]

        return representation
