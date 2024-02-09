import "./Events.css";
import { useState, useEffect, useContext } from "react";
import { Venue } from "../../components/venue/Venue";
import { DatePicker } from "../../components/date_picker/DatePicker";
import { VenuePicker } from "../../components/venue_picker/VenuePicker";
import userContext from "../../UserContext";

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

const fetchEvents = (queryParams, onSuccess, onError) => {
  const eventsQueryParams = new URLSearchParams(queryParams);

  const url = `http://localhost:8000/api/events?${eventsQueryParams}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch((error) => {
      onError(error);
    });
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

    fetchEvents({}, onSuccess, onError);
  }, []);

  const onClickFilterVenues = (filteredVenues) => {
    const eventsDiv = document.getElementById("events");
    fadeOut(eventsDiv);
    const onSuccess = (data) => {
      setTimeout(() => {
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

    fetchEvents(queryParams, onSuccess, onError);
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
              <Venue venueInformation={venue} user={user} setUser={setUser} />
            ),
        )}
      </div>
    </div>
  );
};
