from datetime import datetime, date
from dateutil.relativedelta import relativedelta
from random import randrange, shuffle
from take_me_there.apps.venues.models import Venue
from take_me_there.apps.events.models import Event

now = datetime.now()

start_date = date.today()
end_date = start_date + relativedelta(days=90)

# Delete existing venues
Venue.objects.all().delete()

venues = [
    Venue.objects.create(
        name="The Fillmore",
        address="1805 Geary Blvd, San Francisco, CA 94115",
        url="https://www.livenation.com/venue/KovZpZAE6eeA/the-fillmore-events"
    ),
    Venue.objects.create(
        name="The Warfield",
        address="982 Market St, San Francisco, CA 94102",
        url="https://www.thewarfieldtheatre.com/"
    ),
    Venue.objects.create(
        name="Bill Graham Civic Auditorium",
        address="99 Grove St, San Francisco, CA 94102",
        url="https://billgrahamcivic.com/"
    ),
    Venue.objects.create(
        name="The Fox Theatre",
        address="1807 Telegraph Avenue, Oakland, CA 94612",
        url="https://thefoxoakland.com/"
    ),
    Venue.objects.create(
        name="The Independent",
        address="628 Divisadero St, San Francisco, CA 94117",
        url="http://theindependentsf.com/"
    ),
    Venue.objects.create(
        name="The Midway",
        address="900 Marin St, San Francisco, CA 94124",
        url="https://themidwaysf.com/"
    ),
    Venue.objects.create(
        name="Chase Center",
        address="1 Warriors Way, San Francisco, CA 94158",
        url="https://www.chasecenter.com/"
    ),
    Venue.objects.create(
        name="Rickshaw Stop",
        address="155 Fell St, San Francisco, CA 94102",
        url="https://rickshawstop.com/"
    ),
    Venue.objects.create(
        name="Bimbo's 365",
        address="1025 Columbus Ave, San Francisco, CA 94133",
        url="https://bimbos365club.com/"
    ),
    Venue.objects.create(
        name="The Regency Ballroom",
        address="1300 Van Ness Ave, San Francisco, CA 94109",
        url="https://www.theregencyballroom.com/"
    ),
    Venue.objects.create(
        name="August Hall",
        address="420 Mason St, San Francisco, CA 94102",
        url="https://www.augusthallsf.com/"
    ),
    Venue.objects.create(
        name="Great American Music Hall",
        address="420 Mason St, San Francisco, CA 94102",
        url="https://www.augusthallsf.com/"
    )
]


artists = [
    ("Beyonce", "https://www.beyonce.com/"),
    ("Lady Gaga", "https://www.ladygaga.com/"),
    ("Taylor Swift", "https://www.taylorswift.com/"),
    ("The Rolling Stones", "https://rollingstones.com/"),
    ("Eminem", "https://www.eminem.com/"),
    ("Fred Again...", "https://www.fredagain.com/"),
    ("Guns N' Roses", "https://www.gunsnroses.com/"),
    ("Radiohead", "https://www.radiohead.com/"),
    ("Arcade Fire", "https://www.arcadefire.com/"),
    ("Jamie XX", "https://www.jamiexx.com/"),
    ("Disclosure", "https://www.disclosureofficial.com/"),
    ("LCD Soundsystem", "https://lcdsoundsystem.com/"),
    ("Florence + The Machine", "https://florenceandthemachine.net/"),
    ("Kendrick Lamar", "https://oklama.com/"),
    ("Tame Impala", "https://tameimpala.com/"),
    ("Oliva Rodrigo", "https://www.oliviarodrigo.com/"),
    ("Gorillaz", "https://www.gorillaz.com/"),
    ("Massive Attack", "https://massiveattack.ie/"),
    ("The Chemical Brothers", "https://www.thechemicalbrothers.com/"),
    ("Dua Lipa", "https://www.dualipa.com/"),
    ("Billie Eilish", "https://www.billieeilish.com/"),
    ("Post Malone", "https://www.postmalone.com/"),
    ("Bruce Springsteen", "https://brucespringsteen.net/"),
    ("Skrillex", "https://www.skrillex.com/"),
    ("Tool", "https://www.toolband.com/"),
    ("Harry Styles", "https://www.hstyles.co.uk/"),
    ("Foo Fighers", "https://foofighters.com/"),
    ("Adele", "https://www.adele.com/")
]

max_number_of_events_per_venue = len(artists)

# Clear events data
Event.objects.all().delete()

for venue in venues:
    number_of_events_for_venue = randrange(1, max_number_of_events_per_venue)
    shuffle(artists)
    for i in range(0, number_of_events_for_venue):
        event_date = start_date + relativedelta(days=randrange(0, 90))
        artist_name, url = artists[i]
        Event.objects.create(
            artist_name=artist_name,
            date=event_date,
            venue=venue,
            url=url,
        )





