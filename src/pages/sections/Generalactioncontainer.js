import React from "react";
import Generalaction from "../snippets/GeneralAction";

function Generalactioncontainer(props) {

  return (
    <div className="overflow-visible mb-4 flex justify-end rounded-lg bg-white drop-shadow-sm border ctm-border-color-2 p-4">
      <Generalaction CustomData={props.CustomData} SetPopup={props.SetPopup} />
    </div>
  );
}

export default Generalactioncontainer;
