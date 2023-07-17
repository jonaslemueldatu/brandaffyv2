import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthUser } from "react-auth-kit";

function Addtoboxpopup(props) {
  const auth = useAuthUser();

  const [isBusy, setIsbusy] = useState(true);
  const [userid] = useState(auth().id);
  const [boxes, setBoxes] = useState([]);
  const [boxChoice, setBoxchoice] = useState();
  const [error, setError] = useState("")

  const handleAddButton = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ROUTE}/api/brand/box/addaffiliate`,
        {
          id: props.Popup.id,
          box_id: boxChoice,
        }
      );
      if (res.data.err) {
        console.log(res.data.err);
        setError(res.data.err)
      } else {
        props.SetPopup("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsbusy(true);
    const getBoxList = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/brand/box/getlist`,
          {
            params: {
              brand_owner_id: userid,
            },
          }
        );
        if (res.data.err) {
          console.log(res.data.err);
          setError(res.data.err)
        } else {
          await setBoxes(res.data.brandbox_list);
          await setBoxchoice(res.data.brandbox_list[0]._id.toString())
          setIsbusy(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBoxList();
  }, [userid]);

  return (
    <div
      onClick={() => props.SetPopup("")}
      className="flex justify-center items-center fixed w-full h-full top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50"
    >
      {" "}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-80 sm:w-1/2 max-w-xl rounded-md bg-white drop-shadow-sm  ctm-border-color-2 p-4 absolute"
      >
        <div className="font-bold">Add Influencer to box:</div>

        {!isBusy &&
          (boxes.length === 0 ? (
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
                {boxes.map((box) => {
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
            onClick={() => props.SetPopup("")}
            className="ctm-btn ctm-btn-2 mx-4"
          >
            Cancel
          </button>
          {!isBusy && boxes.length > 0 && (
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

export default Addtoboxpopup;
