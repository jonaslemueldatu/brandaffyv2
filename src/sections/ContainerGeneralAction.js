// Props
// 1. SetPopup1 = Toggle the display of the Add to Cart Popup
// 2. SetPopup2 = Toggle the display of the 2nd Popup
// 2. CustomData = can contain Custom Data to configure the display of the action buttons

import React from "react";

//Snippet import
import Generalaction from "../snippets/ActionGeneral";

function ContainerActionGeneral(props) {
  return (
    <div className="overflow-visible mb-4 flex justify-end rounded-lg bg-white drop-shadow-sm border ctm-border-color-2 p-4">
      <Generalaction
        CustomData={props.CustomData}
        SetPopup1={props.SetPopup1}
        SetPopup2={props.SetPopup2}
      />
    </div>
  );
}

export default ContainerActionGeneral;
