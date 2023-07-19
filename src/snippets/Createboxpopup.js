//Props
//1. SetCreateBoxPopup = This is used to toggle the popup to display or hide
//2. SetGetBoxListTrigger = Triggers the getboxList use Effect to reflect new boxes added
//3. BoxOwnerId = This is the box owner ID where the created box will be assigned to
//4. GetBoxListTrigger = The status of the trigger

import React, { useState } from "react";
import axios from "axios";

function Createboxpopup(props) {
  const [description, setDescription] = useState("");
  const [boxLabel, setBoxLabel] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ROUTE}/api/brand/box/create`,
        {
          brand_owner_id: props.BoxOwnerId,
          box_label: boxLabel,
          box_description: description,
        }
      );
      if (res.data.err) {
        setError(res.data.err);
      } else {
        props.SetGetBoxListTrigger(!props.GetBoxListTrigger);
        props.SetCreateBoxPopup(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={() => props.SetCreateBoxPopup(false)}
      className="flex justify-center items-center fixed w-full h-full top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-80 sm:w-1/2 max-w-xl rounded-md bg-white drop-shadow-sm  ctm-border-color-2 p-4 absolute"
      >
        <div className="font-bold">Create Box</div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-1 flex-col my-4">
            <label className="my-2 font-medium">Label</label>
            <input
              type="text"
              onChange={(e) => setBoxLabel(e.target.value)}
              onFocus={() => setError("")}
              placeholder="Box label"
              required
              className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border ctm-min-width-1"
            ></input>
          </div>
          <div className="flex flex-1 flex-col my-4">
            <label className="font-medium">Description</label>
            <textarea
              required
              rows="3"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us something about this box"
              className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border"
            ></textarea>
          </div>
          <div className="my-4 text-red-500">{error}</div>

          <div className="flex justify-end">
            <button
              onClick={() => props.SetCreateBoxPopup(false)}
              className="ctm-btn ctm-btn-2 mx-4"
            >
              Cancel
            </button>
            <button className="ctm-btn ctm-btn-3">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Createboxpopup;
