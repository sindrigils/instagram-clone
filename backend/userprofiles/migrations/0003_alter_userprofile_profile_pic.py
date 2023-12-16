# Generated by Django 4.2.7 on 2023-12-11 23:34

from django.db import migrations, models
import userprofiles.models


class Migration(migrations.Migration):

    dependencies = [
        ('userprofiles', '0002_alter_userprofile_profile_pic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='profile_pic',
            field=models.ImageField(blank=True, default='/profile-pics/default-profile-pic.png', null=True, upload_to=userprofiles.models.upload_to),
        ),
    ]