import React from "react";
import { useState } from "react";

function InfluencerBoxList(props) {
  const [boxeslist] = useState(props.Boxes);

  return (
    <div className="my-4 flex-col flex rounded-lg bg-white drop-shadow-sm border ctm-border-color-2 p-4 overflow-x-scroll">
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
              <tr key={box._id.toString()} className="h-20 cursor-pointer ctm-border-color-3 border-b">
                <td className="px-4"></td>
                <td className="px-4 text-left whitespace-nowrap overflow-ellipsis max-w-xs overflow-hidden">{box.box_label}</td>
                <td className="px-4 text-left whitespace-nowrap overflow-ellipsis max-w-xs overflow-hidden">{box.box_description}</td>
                <td className="px-4 text-center">{box.affiliate_list.length.toString()}</td>
                <td className="px-4"></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {boxeslist.length <= 0 && (
        <div className="text-center my-8 ctm-font-color-1">
          No Data to display
        </div>
      )}
    </div>
  );
}

export default InfluencerBoxList;
