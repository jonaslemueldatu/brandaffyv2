//Props
// 1. CampaignList = List of campaigns to be listed in this section
// 2. CustomData = CustomData unique to be passed on
// 3. TableTitle = The title of the table, and the color of the header

import React, { useState } from "react";
import { useAuthUser } from "react-auth-kit";

//Snippet Imports
import ActionTable from "../snippets/ActionTable";
import IndicatorStatus from "../snippets/IndicatorStatus";
import IndicatorPlatform from "../snippets/IndicatorPlatform"

function ListCampaigns(props) {
  const auth = useAuthUser();

  const [viewerUserType] = useState(auth().user_type);
  const [campaignList] = useState(props.CampaignList);

  return (
    <div className="mb-4 flex-col flex rounded-lg bg-white drop-shadow-sm border ctm-border-color-2 p-4 overflow-visible">
      <div className={`font-bold mb-4 ${props.TableTitle.color} px-4`}>
        {props.TableTitle.text}
      </div>
      <div className="overflow-x-scroll flex">
        <table id="campaignList" className="flex-1">
          <thead>
            <tr className="h-20 ctm-border-color-3 border-b">
              <th className="w-12 px-4 text-center">Select</th>
              <th className="w-12 px-4 text-center">Platform</th>
              <th className="ctm-min-width-3 ctm-max-width-3 overflow-hidden whitespace-nowrap overflow-ellipsis px-4 text-left">
                Title
              </th>
              <th className="w-12 px-4 text-center">Influencers</th>
              <th className="w-80 whitespace-nowrap px-4 center">
                Create Date
              </th>
              <th className="w-80 whitespace-nowrap px-4 text-center ctm-max-width-1">Start Date</th>
              <th className="w-80 whitespace-nowrap px-4 text-center ctm-max-width-1">
                End Date
              </th>
              <th className="w-80 whitespace-nowrap px-4 text-center ctm-max-width-1">
                Cancel Date
              </th>
              <th className="w-80 whitespace-nowrap px-4 text-center ctm-max-width-1">
                Status
              </th>
              <th className="px-4 text-center w-32 ctm-min-width-15">Action</th>
            </tr>
          </thead>
          <tbody>
            {campaignList.map((campaigns) => {
              const campaign =
                viewerUserType === "Brand"
                  ? campaigns
                  : campaigns.campaign_details[0];
              return (
                <tr
                  key={campaign._id.toString()}
                  className="h-20 cursor-pointer ctm-border-color-3 border-b"
                >
                  <td className="w-12 px-4 text-center">
                    {" "}
                    <input
                      className="block m-auto cursor-pointer"
                      type="checkbox"
                    ></input>
                  </td>
                  <td className="w-12 px-4 text-center">
                    <IndicatorPlatform Platform={campaign.platform} />
                  </td>
                  <td className="ctm-min-width-3 ctm-max-width-3 overflow-hidden whitespace-nowrap overflow-ellipsis px-4 text-left">
                    {campaign.campaign_name}
                  </td>
                  <td className="w-12 px-4 text-center">
                    {campaign.affiliate_list_accepted.length}
                  </td>
                  <td className="w-80 whitespace-nowrap px-4 text-center ctm-max-width-1">
                    {new Date(campaign.create_date).toLocaleDateString("en-CA")}
                  </td>
                  <td className="w-80 whitespace-nowrap px-4 text-center ctm-max-width-1">
                    {campaign.start_date ? (
                      new Date(campaign.start_date).toLocaleDateString("en-CA")
                    ) : (
                      <span>--</span>
                    )}
                  </td>
                  <td className="w-80 whitespace-nowrap px-4 text-center ctm-max-width-1">
                    {campaign.end_date ? (
                      new Date(campaign.end_date).toLocaleDateString("en-CA")
                    ) : (
                      <span>--</span>
                    )}
                  </td>
                  <td className="w-80 whitespace-nowrap px-4 text-center ctm-max-width-1">
                    {campaign.cancelled_date ? (
                      new Date(campaign.cancelled_date).toLocaleDateString(
                        "en-CA"
                      )
                    ) : (
                      <span>--</span>
                    )}
                  </td>
                  <td className="w-80 whitespace-nowrap px-4 text-center ctm-max-width-1">
                    <IndicatorStatus CampaignStatus={campaign.status} />
                  </td>
                  <td className="px-4 text-center">
                    <ActionTable
                      ClickedCampaignId={campaign._id.toString()}
                      CustomData={props.CustomData}
                      SetTrigger1={props.SetTrigger1}
                      Trigger1={props.Trigger1}
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

export default ListCampaigns;
