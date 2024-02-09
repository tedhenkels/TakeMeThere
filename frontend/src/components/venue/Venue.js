import "./Venue.css";
import { useState } from "react";
import { LikeEventAPI } from "../../apis/LikeEventAPI";

export const cleanUpVenueName = (name) => {
  const nameWithoutSpaces = name.replace(/\s+/g, "-");
  const nameWithoutApostrophes = nameWithoutSpaces.replace(/'/g, "");

  return nameWithoutApostrophes.toLowerCase();
};

const EventDate = ({ dateString }) => {
  const date = new Date(dateString);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="event-date">
      <div className="event-date-month">
        {monthNames[date.getMonth()]}&nbsp;
      </div>
      <div className="event-date-day">{date.getDate()},</div>
      <div className="event-date-year">{date.getFullYear()}</div>
    </div>
  );
};

const LikedEvent = ({ event, likedEvents, onClickLikeEvent }) => {
  const isEventLiked = (event) => {
    if (likedEvents?.includes(parseInt(event.id))) {
      return "\u2665";
    }

    return "\u2661";
  };

  return (
    <div
      id={`liked-${event.id}`}
      className="event-liked button"
      onClick={onClickLikeEvent}
    >
      {isEventLiked(event)}
    </div>
  );
};

export const Venue = ({ venueInformation, user, setUser }) => {
  const numOfShowsPerPage = 10;
  const numOfShows = venueInformation.events.length;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastShow = currentPage * numOfShowsPerPage;
  const indexOfFirstShow = indexOfLastShow - numOfShowsPerPage;

  const canClickNextPage =
    currentPage !== Math.ceil(numOfShows / numOfShowsPerPage);
  const canClickPreviousPage = currentPage !== 1;

  const clickPreviousPage = () => {
    if (canClickPreviousPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const clickLikeEvent = (e) => {
    const onSuccess = (data) => {
      setUser(data);
    };
    const onError = (error) => {
      console.log(error);
    };
    const eventId = parseInt(e.target.id.match(/\d+/)[0]);
    const liked = !user?.liked_events?.includes(eventId);

    LikeEventAPI(onSuccess, onError, eventId, liked);
  };

  const displayNav = numOfShows > numOfShowsPerPage;

  const events = [];
  for (
    let i = indexOfFirstShow;
    i < indexOfFirstShow + numOfShowsPerPage;
    i++
  ) {
    if (i < numOfShows) {
      const event = venueInformation.events[i];
      events.push(
        <div key={`event-${event.id}`} className="event">
          <div className="event-name button">{event.artist_name}</div>
          <EventDate dateString={event.date} />
          <LikedEvent
            event={event}
            likedEvents={user?.liked_events}
            onClickLikeEvent={clickLikeEvent}
          />
        </div>,
      );
    } else if (displayNav) {
      events.push(<div className="event" />);
    }
  }

  return (
    <div className={`venue ${cleanUpVenueName(venueInformation.name)}`}>
      <div className="venue-name">{venueInformation.name}</div>
      <div className="Events">{events}</div>
      {displayNav && (
        <div className="Event-nav">
          <div
            className={
              canClickPreviousPage
                ? "navigation-button-enabled"
                : "navigation-button-disabled"
            }
            onClick={clickPreviousPage}
          >
            {"\u25C0"}
          </div>
          <div
            className={
              canClickNextPage
                ? "navigation-button-enabled"
                : "navigation-button-disabled"
            }
            onClick={() => {
              if (canClickNextPage) {
                setCurrentPage(currentPage + 1);
              }
            }}
          >
            {"\u25B6"}
          </div>
        </div>
      )}
    </div>
  );
};
