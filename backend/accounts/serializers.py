from rest_framework import serializers

from .models import CustomUser


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "email", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data: list):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password:
            instance.set_password(password)
        instance.save()
        return instance

    def validate(self, data: dict):
        password = data.get("password")
        confirm_password = self.context["confirm_password"]
        if password != confirm_password:
            raise serializers.ValidationError("Passwords do not match.")

        return data
