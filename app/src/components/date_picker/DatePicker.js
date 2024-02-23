import "./DatePicker.css";
import { useState } from "react";

const months = [
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

const getMonthName = (monthShown) => {
  return months[monthShown.month];
};

const getNumberOfDaysForMonth = (monthShown) => {
  switch (monthShown.month) {
    case 0:
      return 31;
    case 1:
      if (monthShown.year % 400 === 0) {
        return 29;
      }
      if (monthShown.year % 100 === 0) {
        return 28;
      }
      if (monthShown.year % 4 === 0) {
        return 29;
      }
      return 28;
    case 2:
      return 31;
    case 3:
      return 30;
    case 4:
      return 31;
    case 5:
      return 30;
    case 6:
      return 31;
    case 7:
      return 31;
    case 8:
      return 30;
    case 9:
      return 31;
    case 10:
      return 30;
    case 11:
      return 31;
    default:
      throw new Error("Invalid month");
  }
};

const getStartDayForMonth = (monthShown) => {
  return new Date(monthShown.year, monthShown.month).getDay();
};

const dateToString = (date) => {
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const CalendarGrid = ({ monthShown, startDate, onClickDay }) => {
  const days = [];
  let i = 0;
  let j = 1;
  const startDayForMonth = getStartDayForMonth(monthShown);
  const numberOfDaysForMonth = getNumberOfDaysForMonth(monthShown);

  while (i < 42) {
    let calendarDayInnerText = "";
    let calendarDayClassList = ["calendar-outline"];

    if (i >= startDayForMonth && j <= numberOfDaysForMonth) {
      calendarDayClassList.push("calendar-day");
      calendarDayInnerText = j;

      if (startDate !== undefined && startDate.day === j && startDate.month === monthShown.month && startDate.year === monthShown.year) {
        calendarDayClassList.push("today")
      }

      j++;
    }

    const calendarDay = (
      <div
          key={`calendar-grid-square-${j}`}
          className={calendarDayClassList.join(" ")}
          onClick={(e) => {
            onClickDay({day: calendarDayInnerText, ...monthShown})
          }}
      >
        {calendarDayInnerText}
      </div>
    );

    days.push(calendarDay);
    i++;
  }

  return <div className="calendar-grid">{days}</div>;
};

const CalendarNavigation = ({ monthShown, setMonthShown }) => {
  const clickNextMonth = () => {
    if (monthShown.month === 11) {
      setMonthShown({ month: 0, year: monthShown.year + 1 });
    } else {
      setMonthShown({ ...monthShown, month: monthShown.month + 1 });
    }
  };

  const canClickPreviousMonth = () => {
    const today = new Date();
    return (
      today.getMonth() !== monthShown.month ||
      today.getFullYear() !== monthShown.year
    );
  };

  const clickPreviousMonth = () => {
    if (canClickPreviousMonth()) {
      if (monthShown.month === 0) {
        setMonthShown({ month: 11, year: monthShown.year - 1 });
      } else {
        setMonthShown({ ...monthShown, month: monthShown.month - 1 });
      }
    }
  };

  return (
    <div className="calendar-month">
      <div
        className={
          canClickPreviousMonth()
            ? "navigation-button-enabled"
            : "navigation-button-disabled"
        }
        onClick={clickPreviousMonth}
      >
        {"\u25C0"}
      </div>
      <div className="calendar-month-name">{getMonthName(monthShown)}</div>
      <div className="navigation-button-enabled" onClick={clickNextMonth}>
        {"\u25B6"}
      </div>
    </div>
  );
};

const Calendar = ({ hidden }) => {
  const month = new Date().getMonth()
  const year = new Date().getFullYear()

  const [monthShown, setMonthShown] = useState({month,  year});
  const [startDate, setStartDate] = useState()

  const onClickDay = (selectedDate) => {
    setStartDate(selectedDate);
  }

  return (
    <>
      {hidden && (
        <div className="calendar">
          <CalendarNavigation
            monthShown={monthShown}
            setMonthShown={setMonthShown}
          />
          <CalendarGrid monthShown={monthShown} startDate={startDate} onClickDay={onClickDay}/>
        </div>
      )}
    </>
  );
};

const Header = ({ startDate, endDate, clickDatePicker }) => {
  return (
    <div className="date-picker-button" onClick={clickDatePicker}>
      <div className="date-picker-label">Dates:&nbsp;</div>
      <div className="date-picker-dates">
        {dateToString(startDate)}&nbsp;-&nbsp;{dateToString(endDate)}
      </div>
    </div>
  );
};

export const DatePicker = () => {
  const [hideCalendar, setHideCalendar] = useState(true);
  const startDate = new Date();
  const endDate = new Date();

  const clickShowCalendar = (e) => {
    setHideCalendar(!hideCalendar);
  };

  return (
    <div className="date-picker">
      <Header
        clickDatePicker={clickShowCalendar}
        startDate={startDate}
        endDate={endDate}
      />
      <Calendar hidden={hideCalendar} />
    </div>
  );
};
