from enum import Enum
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.status import HTTP_401_UNAUTHORIZED
from rest_framework.serializers import ModelSerializer
from urllib.parse import unquote

from .models import Event
from take_me_there.apps.venues.models import Venue
from take_me_there.apps.users.models import UserProfile
from take_me_there.apps.users.views import UserProfileModelSerializer


class GroupBy(Enum):
    VENUE = "venue"
    DATE = "date"


class EventModelSerializer(ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
        depth = 1


class ListEventsByVenueSerializer(ModelSerializer):
    events = EventModelSerializer(many=True)

    class Meta:
        model = Venue
        fields = '__all__'


class ListEventsAPI(APIView):
    def get(self, request: Request) -> Response:
        query_params = {}
        if request.query_params:
            include_qs = unquote(request.query_params.get('include'))
            query_params['name__in'] = include_qs.split(",")

        venues = Event.objects.filter(**query_params)
        serializer = EventModelSerializer(instance=venues, many=True)

        return Response(serializer.data)


# Create your views here.
class LikeEventAPI(APIView):
    def post(self, request: Request, event_id: int) -> Response:
        user: UserProfile = request.user

        if not user.is_authenticated:
            return Response(status=HTTP_401_UNAUTHORIZED, data={"error": "User is not authorized. Please login"})

        liked_event = Event.objects.get(id=event_id)
        user.liked_events.add(liked_event) if request.data.get("liked") else user.liked_events.remove(liked_event)

        serializer = UserProfileModelSerializer(instance=user)

        return Response(data=serializer.data)
