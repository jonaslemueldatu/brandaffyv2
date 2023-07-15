//accepts the following props:
//1. Title - Title to be displayed
import React from "react";

function Dashboardheader(props) {
  return (
    <div className="my-4">
      <div className="text-2xl font-bold">{props.Title}</div>
    </div>
  );
}

export default Dashboardheader;
