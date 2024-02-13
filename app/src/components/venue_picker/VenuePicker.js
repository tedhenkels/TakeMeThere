import { useState } from "react";
import "./VenuePicker.css";
import { cleanUpVenueName } from "../venue/Venue";

export const VenuePicker = ({ onClickApply }) => {
  const [venues, setVenues] = useState([
    { name: "The Fillmore", selected: true },
    { name: "The Fox Theatre", selected: true },
    { name: "Bill Graham Civic Auditorium", selected: true },
    { name: "The Warfield", selected: true },
    { name: "The Independent", selected: true },
    { name: "The Midway", selected: true },
    { name: "Chase Center", selected: true },
    { name: "Rickshaw Stop", selected: true },
    { name: "Bimbo's 365", selected: true },
    { name: "The Regency Ballroom", selected: true },
    { name: "August Hall", selected: true },
    { name: "Great American Music Hall", selected: true },
  ]);

  const [selectAll, setSelectAll] = useState(true);

  const clickVenue = (venueName) => {
    setSelectAll(false);
    setVenues(
      venues.map((v) => {
        if (v.name === venueName) {
          v.selected = !v.selected;
        }
        return v;
      }),
    );
  };

  return (
    <div className="venue-picker">
      <div className="venue-picker-label">Venues</div>
      <div className="venue-picker-options">
        <div className="venue-picker-option">
          <label>All</label>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={(event) => {
              setSelectAll(!selectAll);
              setVenues(
                venues.map((v) => {
                  if (selectAll === false) {
                    v.selected = true;
                  }
                  return v;
                }),
              );
            }}
          />
        </div>
        {venues.map((venue) => {
          return (
            <div
              className={`venue-picker-option ${cleanUpVenueName(venue.name)}`}
            >
              <label>{venue.name}</label>
              <input
                type="checkbox"
                checked={venue.selected}
                onChange={() => {
                  clickVenue(venue.name);
                }}
              />
            </div>
          );
        })}
      </div>
      <div
        className="venue-picker-apply-button"
        onClick={() => onClickApply(venues)}
      >
        Apply
      </div>
    </div>
  );
};
