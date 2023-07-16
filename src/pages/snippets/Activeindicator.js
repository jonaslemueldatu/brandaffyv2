import React from "react";
import { useState } from "react";

function ActiveIndicator(props) {
  const [status] = useState(props.Status);

  return (
    <div
      className={`h-4 w-4 rounded-full m-auto ${
        status ? "ctm-bg-color-3" : "ctm-bg-color-4"
      }`}
    >
      <span
        className={`block h-4 w-4 rounded-full opacity-70 ctm-animation-1 ${
          status ? "ctm-bg-color-3" : "ctm-bg-color-4"
        }`}
      ></span>
    </div>
  );
}

export default ActiveIndicator;
