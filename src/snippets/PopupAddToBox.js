//Props
//1. ViewedProfileId = Id of the profile being viewed
//2. SetAddToBoxPopup = Trigger the display of the AddToBoxPopup

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";

function PopupAddTobox(props) {
  const auth = useAuthUser();

  const [getBoxListTrigger, setGetBoxListTrigger] = useState(true);
  //Box owner ID which is the same ID as the logged-in brand
  const [boxOwnerId] = useState(auth().id);
  //List of Boxes from the API
  const [boxList, setBoxList] = useState([]);
  //Chosen box to add user
  const [boxChoice, setBoxchoice] = useState();
  const [error, setError] = useState("");

  const handleAddButton = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ROUTE}/api/brand/box/addaffiliate`,
        {
          id: props.ViewedProfileId,
          box_id: boxChoice,
        }
      );
      if (res.data.err) {
        console.log(res.data.err);
        setError(res.data.err);
      } else {
        props.SetAddToBoxPopup(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setGetBoxListTrigger(true);
    const getBoxList = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/brand/box/getlist`,
          {
            params: {
              brand_owner_id: boxOwnerId,
            },
          }
        );
        if (res.data.err) {
          console.log(res.data.err);
          setError(res.data.err);
          setGetBoxListTrigger(false);
        } else {
          setBoxList(res.data.brandbox_list);
          setBoxchoice(res.data.brandbox_list[0]._id.toString());
          setGetBoxListTrigger(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBoxList();
  }, [boxOwnerId]);

  return (
    <div
      onClick={() => props.SetAddToBoxPopup(false)}
      className="flex justify-center items-center fixed w-full h-full top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50"
    >
      {" "}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-80 sm:w-1/2 max-w-xl rounded-md bg-white drop-shadow-sm  ctm-border-color-2 p-4 absolute"
      >
        <div className="font-bold">Add Influencer to box:</div>

        {!getBoxListTrigger &&
          (boxList.length === 0 ? (
            <div className="text-center my-8 ctm-font-color-1">
              No available boxes to choose from
            </div>
          ) : (
            <div>
              {" "}
              <select
                required
                className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border w-full my-4"
                onChange={(e) => setBoxchoice(e.target.value)}
                defaultValue={boxChoice}
              >
                {boxList.map((box) => {
                  return (
                    <option key={box._id.toString()} value={box._id.toString()}>
                      {box.box_label}
                    </option>
                  );
                })}
              </select>
              <div className="mb-4 text-red-500">{error}</div>
            </div>
          ))}
        <div className="flex justify-end">
          <button
            onClick={() => props.SetAddToBoxPopup(false)}
            className="ctm-btn ctm-btn-2 mx-4"
          >
            Cancel
          </button>
          {!getBoxListTrigger && boxList.length > 0 && (
            <button
              onClick={() => handleAddButton()}
              className="ctm-btn ctm-btn-3"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PopupAddTobox;
