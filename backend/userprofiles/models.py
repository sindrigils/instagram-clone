from django.db import models

from os.path import join

from accounts.models import CustomUser


def upload_to(instance, filename):
    username = instance.user.username
    return join("profile-pics", username, filename)


class UserProfile(models.Model):
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="profile"
    )
    profile_pic = models.ImageField(
        upload_to=upload_to,
        blank=True,
        null=True,
        default="profile-pics/default-profile-pic.png",
    )
    bio = models.TextField(blank=True, null=True, max_length=150)

    def __str__(self):
        return str(self.user.username)
