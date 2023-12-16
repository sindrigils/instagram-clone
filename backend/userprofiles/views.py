from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from dotenv import load_dotenv
from jwt import decode
from os import getenv

from .serializers import UserProfileSerializer, CreateUserProfileSerializer
from .profile_utils import fetch_user_profile_data
from accounts.models import CustomUser

load_dotenv()
KEY = getenv("SECRET_KEY")


class UserProfileDetails(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, username):
        user = CustomUser.objects.filter(username=username).first()

        if not user:
            return Response("User not found!", status=status.HTTP_404_NOT_FOUND)

        token_header = request.headers["Authorization"]
        header = {"Authorization": token_header}

        token = token_header.split()[1]

        decoded_token = decode(token, key=KEY, algorithms=["HS256"])
        authenticated_user = decoded_token["username"]

        data = fetch_user_profile_data(user, authenticated_user, header)

        return Response(data)


class CreateUserProfile(APIView):
    def post(self, request, id):
        user = CustomUser.objects.filter(id=id).first()

        if not user:
            return Response("User not found!", status=status.HTTP_404_NOT_FOUND)

        data = {"user": user.id, **request.data}
        profile_serializer = CreateUserProfileSerializer(data=data)
        if profile_serializer.is_valid():
            profile_serializer.save()
            return Response(profile_serializer.data, status=status.HTTP_201_CREATED)
        return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfilePicView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        user = CustomUser.objects.filter(id=id).first()
        profile_serializer = UserProfileSerializer(user.profile.first())
        return Response(profile_serializer.data, status=status.HTTP_200_OK)
