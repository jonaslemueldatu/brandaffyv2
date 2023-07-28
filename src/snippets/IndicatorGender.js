//Props
//1. Gender = The gender of the Creator (gender? Male/Female/Others)

import React from "react";

//Snippet import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVenus } from "@fortawesome/free-solid-svg-icons";
import { faMars } from "@fortawesome/free-solid-svg-icons";
import { faMarsAndVenus } from "@fortawesome/free-solid-svg-icons";

function IndicatorGender(props) {
  return (
    <div>
      {props.Gender === "Male" && (
        <FontAwesomeIcon icon={faMars} className="ctm-font-color-3" />
      )}
      {props.Gender === "Female" && (
        <FontAwesomeIcon icon={faVenus} className="ctm-font-color-4" />
      )}
      {props.Gender === "Others" && (
        <FontAwesomeIcon icon={faMarsAndVenus} className="ctm-font-color-5" />
      )}
    </div>
  );
}

export default IndicatorGender;
