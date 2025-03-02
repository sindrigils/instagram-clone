# Generated by Django 4.2.7 on 2024-01-13 17:35

from django.db import migrations, models
import userprofiles.models


class Migration(migrations.Migration):

    dependencies = [
        ('userprofiles', '0004_alter_userprofile_bio'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='profile_pic',
            field=models.ImageField(blank=True, default='profile-pics/default-profile-pic.png', null=True, upload_to=userprofiles.models.upload_to),
        ),
    ]
