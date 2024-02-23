import "./Events.css";
import { useState, useEffect, useContext } from "react";
import { Venue } from "../../components/venue/Venue";
import { DatePicker } from "../../components/date_picker/DatePicker";
import { VenuePicker } from "../../components/venue_picker/VenuePicker";
import userContext from "../../UserContext";
import { FetchEventsAPI } from "../../apis/FetchEventsAPI";

const fadeIn = (element) => {
  if (element.classList.contains("fade-out")) {
    element.classList.replace("fade-out", "fade-in");
  } else {
    element.classList.add("fade-in");
  }
};

const fadeOut = (element) => {
  if (element.classList.contains("fade-in")) {
    element.classList.replace("fade-in", "fade-out");
  } else {
    element.classList.add("fade-out");
  }
};

export const EventsPage = () => {
  const [venues, setVenues] = useState([]);
  const { user, setUser } = useContext(userContext);

  useEffect(() => {
    const onSuccess = (data) => {
      setVenues(data);
      fadeIn(document.getElementById("events"));
    };

    const onError = (error) => {
      console.log(error);
    };

    FetchEventsAPI(onSuccess, onError);
  }, []);

  const onClickFilterVenues = (filteredVenues) => {
    const eventsDiv = document.getElementById("events");
    fadeOut(eventsDiv);
    const onSuccess = (data) => {
      setTimeout(() => {

        data.reduce((venuesMap, currentEvent) => {
          if(!(currentEvent.venue.name in venuesMap)) {
            venuesMap[currentEvent.venue.name] = [currentEvent]
            return venuesMap
          }
          venuesMap[currentEvent.venue.name] = venuesMap[currentEvent.venue.name].append(currentEvent)
        }, {})

        setVenues(data);
        fadeIn(document.getElementById("events"));
      }, 1100);
    };

    const onError = (error) => {
      console.log(error);
    };

    const queryParams = {
      include: encodeURI(
        filteredVenues
          .filter((venue) => venue.selected)
          .map((venue) => venue.name)
          .join(","),
      ),
    };

    FetchEventsAPI(onSuccess, onError, queryParams);
  };

  return (
    <div className="events-content-container">
      <div className="buttons-container">
        <DatePicker />
        <VenuePicker onClickApply={onClickFilterVenues} />
      </div>
      <div id="events">
        {venues.map(
          (venue) =>
            !venue.hidden && (
              <Venue venueInformation={venue} user={user} setUser={setUser} key={venue.name}/>
            ),
        )}
      </div>
    </div>
  );
};
