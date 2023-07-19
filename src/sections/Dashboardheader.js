// Props: 
// 1. Title = Title to be displayed on the header
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Dashboardheader(props) {
  return (
    <div className="my-4 flex justify-between">
      <div className="text-2xl font-bold">{props.Title}</div>
      <FontAwesomeIcon icon={faBars} className="lg:hidden text-3xl" />
    </div>
  );
}

export default Dashboardheader;
