import React from "react";

export default function FormattedDate(props) {
  console.log(props);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
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
  let day = days[props.date.getDay()];
  let date = props.date.getDate();
  let month = months[props.date.getMonth()];
  let year = props.date.getFullYear();
  if (date < 10) {
    date = `0${date}`;
  }
  return (
    <div>
      {day}, {date} {month} {year}
    </div>
  );
}
