from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

import httpx

from ..serializers import RegisterUserSerializer


class RegisterUser(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        reg_serializer = RegisterUserSerializer(
            data=request.data,
            context={"confirm_password": request.data["confirmPassword"]},
            many=False,
        )
        if reg_serializer.is_valid():
            new_user = reg_serializer.save()
            if new_user:
                httpx.post(
                    f"http://localhost:8000/profile/create-profile/{new_user.id}",
                )
                return Response(status=status.HTTP_201_CREATED)
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
