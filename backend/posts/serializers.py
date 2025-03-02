from rest_framework import serializers

from .models import Post, PostImage
from .comments.models import Comment
from .likes.models import Like
from .utils import (
    calculate_time_difference_for_comments,
    calculate_time_difference_for_posts,
)


class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ["image"]


class CommentSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    profile_pic = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ["username", "profile_pic", "text", "created_at"]

    def get_username(self, obj):
        return obj.user.username

    def get_profile_pic(self, obj):
        profile = obj.user.profile.first()
        return "/images/" + str(profile.profile_pic)

    def to_representation(self, instance):
        representation = super(CommentSerializer, self).to_representation(instance)
        representation["created_at"] = calculate_time_difference_for_comments(
            instance.created_at
        )
        return representation


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = []


class PostSerializer(serializers.ModelSerializer):
    images = PostImageSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ["description", "created_at", "images", "comments"]

    def to_representation(self, instance):
        representation = super(PostSerializer, self).to_representation(instance)
        representation["created_at_post"] = calculate_time_difference_for_posts(
            instance.created_at
        )
        representation["created_at_comment"] = calculate_time_difference_for_comments(
            instance.created_at
        )
        return representation


class ProfilePagePostSerializer(serializers.ModelSerializer):
    images = PostImageSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    likes = LikeSerializer(many=True, read_only=True)
    post_id = serializers.ReadOnlyField(source="id")

    class Meta:
        model = Post
        fields = ["post_id", "images", "comments", "likes"]

    def to_representation(self, instance):
        representation = super(ProfilePagePostSerializer, self).to_representation(
            instance
        )
        representation["likes"] = instance.likes.count()
        representation["comments"] = instance.comments.count()

        first_image = instance.images.first()
        representation["images"] = PostImageSerializer(first_image).data["image"]

        return representation
