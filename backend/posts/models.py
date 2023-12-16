from django.db import models

from datetime import datetime
from os.path import join

from accounts.models import CustomUser


def upload_path(instance, filename):
    date_created = datetime.now().strftime("%Y-%m-%d")
    username = instance.post.user.username
    return join("posts", username, date_created, filename)


class Post(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="posts")
    description = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{str(self.user.username)}: {str(self.created_at)}"


class PostImage(models.Model):
    post = models.ForeignKey(
        "Post", related_name="images", on_delete=models.CASCADE, default=1
    )
    image = models.ImageField(upload_to=upload_path)
