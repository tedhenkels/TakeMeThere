from take_me_there.apps.events.tests import get_event
from take_me_there.apps.events.views import ListEventsByVenueSerializer


class TestListEventsAPIResponseSerializer:
    def test_list_events_response_serializer(self) -> None:
        events = [get_event()]
        serializer = ListEventsByVenueSerializer(data={
            "count": len(events),
            "date_range": "2024/01/24-2024/04/20",
        })
        serializer.is_valid()

        assert serializer.data
