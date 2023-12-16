from django.db import models

from accounts.models import CustomUser
from posts.models import Post


class Like(models.Model):
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="liked_posts"
    )
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="likes")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} liked this post: {self.post}"
