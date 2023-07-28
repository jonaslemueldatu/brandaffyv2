//Props
//1. Status = The status of the Creator (isLogged_in? True/false)

import React from "react";
import { useState } from "react";

function IndicatorActive(props) {
  const [status] = useState(props.Status);

  return (
    <div
      className={`h-4 w-4 rounded-full m-auto ${
        status ? "ctm-bg-color-3" : "ctm-bg-color-4"
      }`}
    >
      <span
        className={`block h-4 w-4 rounded-full opacity-70 ctm-animation-blink ${
          status ? "ctm-bg-color-3" : "ctm-bg-color-4"
        }`}
      ></span>
    </div>
  );
}

export default IndicatorActive;
