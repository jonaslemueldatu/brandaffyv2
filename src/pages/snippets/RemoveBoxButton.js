import React from "react";
import axios from "axios";

function RemoveBoxButton(props) {
  const handleBoxRemove = async (e, id) => {
    e.stopPropagation();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ROUTE}/api/brand/box/removeAffiliate`,
        {
          id: props.Id,
          boxId: props.CustomData.boxId
        }
      );
      if (res.data.err) {
        console.log(res.data.err);
      } else {
        props.SetTrigger(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {props.CustomData.action === "removeFromBox" && (
        <button
          onClick={(e) => handleBoxRemove(e)}
          className="ctm-btn ctm-btn-2"
        >
          Remove
        </button>
      )}
    </div>
  );
}

export default RemoveBoxButton;
