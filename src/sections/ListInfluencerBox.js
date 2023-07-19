//Props
//1. BoxList = List of Boxes to be displayed
//2. SetGetBoxListTrigger = Initiates the variable to trigger useEffect
//3. GetBoxListTrigger = Variable to trigger the UseEffect

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ListInfluencerBox(props) {
  const navigate = useNavigate();

  const [boxList] = useState(props.BoxList);

  const handleRowClick = (id) => {
    navigate(`${id}`);
  };

  const handleRemoveBox = async (boxId) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ROUTE}/api/box/delete`,
        {
          box_id: boxId,
        }
      );
      if (res.data.err) {
        console.log(res.data.err);
      } else {
        props.SetGetBoxListTrigger(!props.GetBoxListTrigger);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-4 flex-col flex rounded-lg bg-white drop-shadow-sm border ctm-border-color-2 p-4 overflow-visible">
      <div className="overflow-x-scroll flex">
        <table className="flex-1">
          <thead>
            <tr className="h-20 ctm-border-color-3 border-b">
              <th className="w-12 px-4 text-center">Select</th>
              <th className="w-80 ctm-min-width-15 whitespace-nowrap px-4 text-left ctm-min-width-2">
                Label
              </th>
              <th className="px-4 text-left">Description</th>
              <th className="w-12 px-4 text-center">List</th>
              <th className="w-80 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {boxList.map((box) => {
              return (
                <tr
                  key={box._id.toString()}
                  onClick={() => handleRowClick(box._id.toString())}
                  className="h-20 cursor-pointer ctm-border-color-3 border-b"
                >
                  <td
                    className="w-12 px-4 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      className="block m-auto cursor-pointer"
                      type="checkbox"
                    ></input>
                  </td>
                  <td className="ctm-min-width-15 whitespace-nowrap px-4 text-left">
                    {box.box_label}
                  </td>
                  <td className="w-80 ctm-min-width-15 ctm-max-width-4 overflow-hidden whitespace-nowrap overflow-ellipsis px-4 text-left">
                    {box.box_description}
                  </td>
                  <td className="w-12 px-4 text-center">
                    {box.affiliate_list.length.toString()}
                  </td>
                  <td className="w-80 px-4 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveBox(box._id.toString());
                      }}
                      className="ctm-btn ctm-btn-2 mx-auto"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {boxList.length <= 0 && (
        <div className="text-center my-8 ctm-font-color-1">
          No Data to display
        </div>
      )}
    </div>
  );
}

export default ListInfluencerBox;
