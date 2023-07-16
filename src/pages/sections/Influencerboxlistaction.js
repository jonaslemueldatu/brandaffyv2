import React from "react";

function Influencerboxlistaction(props) {

  return (
    <div className="flex justify-end rounded-lg bg-white drop-shadow-sm border ctm-border-color-2 p-4 overflow-x-scroll">
      <button onClick={() => props.SetPopup(true)} className="ctm-btn ctm-btn-1">Create Box </button>
    </div>
  );
}

export default Influencerboxlistaction;
