from unittest.mock import MagicMock

from random import randrange
from datetime import date
from dateutil.relativedelta import relativedelta
from take_me_there.apps.events.models import Event
from take_me_there.apps.venues.models import Venue


def get_venue(**kwargs) -> Venue:
    today = date.today()

    return MagicMock(
        spec=Venue,
        creeated=kwargs.get("created", today),
        modified=kwargs.get("modified", today),
        name=kwargs.get("name", "The Fillmore"),
        address=kwargs.get("address", "123 Fake Street, San Francisco, CA"),
        url=kwargs.get("url", "https://www.the_fillmore.com/")
    )


def get_event(**kwargs) -> Event:
    today = date.today()

    return MagicMock(
        spec=Event,
        pk=randrange(0, 100),
        artist_name=kwargs.get("artist_name", "The Beets"),
        created=kwargs.get("created", today),
        modified=kwargs.get("modified", today),
        date=kwargs.get("date", today + relativedelta(days=randrange(7, 90))),
        venue=kwargs.get("venue", get_venue()),
        url=kwargs.get("url", "https://wwww.theBeets.com/")
    )
