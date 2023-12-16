from django.db import models

from accounts.models import CustomUser


class Follow(models.Model):
    follower = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="following"
    )
    followed = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="followers"
    )
