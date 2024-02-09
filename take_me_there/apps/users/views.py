from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from rest_framework.serializers import (
    ModelSerializer,
    Serializer,
    CharField,
    EmailField
)
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_401_UNAUTHORIZED


from .models import UserProfile


class UserProfileModelSerializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'


# Create your views here.
class LoginView(APIView):
    def post(self, request: Request) -> Response:
        if request.user.is_authenticated:
            serializer = UserProfileModelSerializer(instance=request.user)

            return Response(data=serializer.data)

        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user is not None:
            login(request=request, user=user)
            serializer = UserProfileModelSerializer(instance=user)

            return Response(data=serializer.data)

        return Response(status=HTTP_401_UNAUTHORIZED)


class CreateUserProfileAPIRequestSerializer(Serializer):
    username = CharField()
    password = CharField()
    first_name = CharField()
    last_name = CharField()
    email = EmailField()


class CreateUserProfileAPI(APIView):
    def post(self, request: Request) -> Response:
        return Response()
