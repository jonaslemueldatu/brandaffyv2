import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function InfluencerBoxList(props) {
  const navigate = useNavigate();

  const [boxeslist] = useState(props.Boxes);

  const handleTrClick = (id) => {
    navigate(`${id}`);
  };

  const handleTdRemove = async (id) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ROUTE}/api/brand/box/delete`,
        {
          id: id,
        }
      );
      if (res.data.err) {
        console.log(res.data.err);
      } else {
        props.SetEffect(true);
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
              <th className="px-4 text-center w-24">Select</th>
              <th className="px-4 text-left ctm-min-width-2">Label</th>
              <th className="px-4 text-left">Description</th>
              <th className="px-4 text-center w-24">List</th>
              <th className="px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {boxeslist.map((box) => {
              return (
                <tr
                  key={box._id.toString()}
                  onClick={() => handleTrClick(box._id.toString())}
                  className="h-20 cursor-pointer ctm-border-color-3 border-b"
                >
                  <td className="px-4"></td>
                  <td className="px-4 text-left whitespace-nowrap overflow-ellipsis max-w-xs overflow-hidden">
                    {box.box_label}
                  </td>
                  <td className="px-4 text-left whitespace-nowrap overflow-ellipsis max-w-xs overflow-hidden">
                    {box.box_description}
                  </td>
                  <td className="px-4 text-center">
                    {box.affiliate_list.length.toString()}
                  </td>
                  <td className="px-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTdRemove(box._id.toString());
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
      {boxeslist.length <= 0 && (
        <div className="text-center my-8 ctm-font-color-1">
          No Data to display
        </div>
      )}
    </div>
  );
}

export default InfluencerBoxList;
