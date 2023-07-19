import React from "react";
import { useState } from "react";

import TableAction from "../snippets/TableAction";

function Campaignlist(props) {
  const [campaignList] = useState(props.Campaigns);

  return (
    <div className="mb-4 flex-col flex rounded-lg bg-white drop-shadow-sm border ctm-border-color-2 p-4 overflow-visible">
      <div className={`font-bold mb-4 ${props.Title.color} px-4`}>
        {props.Title.text}
      </div>
      <div className="overflow-x-scroll flex">
        <table className="flex-1">
          <thead>
            <tr className="h-20 ctm-border-color-3 border-b">
              <th className="px-4 text-center w-24">Select</th>
              <th className="px-4 text-center w-24">Platform</th>
              <th className="px-4 text-left w-40 ctm-min-width-1 ctm-max-width-4">
                Title
              </th>
              <th className="px-4 text-center w-24 ">Influencers</th>
              <th className="px-4 text-center w-32 ctm-min-width-0 ctm-max-width-1">
                Create Date
              </th>
              <th className="px-4 text-center w-32 ctm-min-width-0 ctm-max-width-1">
                Start Date
              </th>
              <th className="px-4 text-center w-32 ctm-min-width-0 ctm-max-width-1">
                End Date
              </th>
              <th className="px-4 text-center w-32 ctm-min-width-0 ctm-max-width-1">
                Status
              </th>
              <th className="px-4 text-center w-32 ctm-min-width-15">Action</th>
            </tr>
          </thead>
          <tbody>
            {campaignList.map((campaign) => {
              return (
                <tr
                  key={campaign._id.toString()}
                  className="h-20 cursor-pointer ctm-border-color-3 border-b"
                >
                  <td className="px-4 text-center"></td>
                  <td className="px-4 text-center"></td>
                  <td className="ctm-min-width-1 ctm-max-width-4 px-4 w-40 text-left whitespace-nowrap overflow-ellipsis max-w-xs overflow-hidden">
                    {campaign.campaign_name}
                  </td>
                  <td className="px-4 text-center">
                    {campaign.affiliate_list_accepted.length}
                  </td>
                  <td className="px-4 text-center w-32 ctm-min-width-0 ctm-max-width-1">
                    {new Date(campaign.create_date).toLocaleDateString("en-CA")}
                  </td>
                  <td className="px-4 text-center w-32 ctm-min-width-0 ctm-max-width-1">
                    {campaign.start_date ? (
                      new Date(campaign.start_date).toLocaleDateString("en-CA")
                    ) : (
                      <span>--</span>
                    )}
                  </td>
                  <td className="px-4 text-center w-32 ctm-min-width-0 ctm-max-width-1">
                    {campaign.end_date ? (
                      new Date(campaign.end_date).toLocaleDateString("en-CA")
                    ) : (
                      <span>--</span>
                    )}
                  </td>
                  <td className="px-4 text-center">{campaign.status}</td>
                  <td className="px-4 text-center">
                    <TableAction
                      Id={campaign._id.toString()}
                      CustomData={props.CustomData}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {campaignList.length <= 0 && (
        <div className="text-center my-8 ctm-font-color-1">
          No Data to display
        </div>
      )}
    </div>
  );
}

export default Campaignlist;
