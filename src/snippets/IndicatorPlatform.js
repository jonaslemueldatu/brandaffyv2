//Props
//1. Platform = the platform of the line item

import React from "react";

//import snippets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTiktok} from "@fortawesome/free-brands-svg-icons"

function IndicatorPlatform(props) {
  return (
    <div>
      {props.Platform === "Tiktok" && <FontAwesomeIcon icon={faTiktok} />}
    </div>
  );
}

export default IndicatorPlatform;
