# Generated by Django 4.2.7 on 2023-12-13 18:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userprofiles', '0003_alter_userprofile_profile_pic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='bio',
            field=models.TextField(blank=True, max_length=150, null=True),
        ),
    ]