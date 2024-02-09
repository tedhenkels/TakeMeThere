from urllib.parse import parse_qs, unquote

from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer, Serializer

from .models import Venue
from take_me_there.apps.events.views import EventModelSerializer


class VenueModelSerializer(ModelSerializer):
    events = EventModelSerializer(many=True, read_only=True)

    class Meta:
        model = Venue
        fields = '__all__'


class ListVenuesRequestSerializer(Serializer):
    pass


# Create your views here.
class ListVenuesAPI(APIView):
    def get(self, request: Request) -> Response:
        query_params = {}
        if request.query_params:
            include_qs = unquote(request.query_params.get('include'))
            query_params['name__in'] = include_qs.split(",")

        venues = Venue.objects.filter(**query_params)
        serializer = VenueModelSerializer(instance=venues, many=True)

        return Response(serializer.data)