import React from "react";
import axios from "axios";

function TableAction(props) {
  const handleBoxRemove = async (e, id) => {
    e.stopPropagation();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ROUTE}/api/brand/box/removeAffiliate`,
        {
          id: props.Id,
          boxId: props.CustomData.boxId,
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

  const handleBoxAdd = async (e) => {
    e.stopPropagation();
    props.SetPopup({
      action: "addBox",
      id: props.Id
    })
  }

  return (
    <div className="flex justify-center">
      {props.CustomData.action === "removeFromBox" && (
        <button
          onClick={(e) => handleBoxRemove(e)}
          className="ctm-btn ctm-btn-2"
        >
          Remove
        </button>
      )}
      {props.CustomData.action === "brandActions" && (
        <div className="flex">
          <button
            onClick={(e) => handleBoxAdd(e)}
            className="ctm-btn mx-2 ctm-btn-4"
          >
            Add to Box
          </button>
          <button className="ctm-btn ctm-btn-1">Invite</button>
        </div>
      )}
    </div>
  );
}

export default TableAction;
