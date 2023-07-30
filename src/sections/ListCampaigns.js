//Props
// 1. CampaignList = List of campaigns to be listed in this section
// 2. CustomData = CustomData unique to be passed on
// 3. TableTitle = The title of the table, and the color of the header
// 4. Accordion = state if open or not

import React, { useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

//Snippet Imports
import ActionTable from "../snippets/ActionTable";
import IndicatorStatus from "../snippets/IndicatorStatus";
import IndicatorPlatform from "../snippets/IndicatorPlatform";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faCircleChevronUp } from "@fortawesome/free-solid-svg-icons";

function ListCampaigns(props) {
  const navigate = useNavigate();
  const auth = useAuthUser();

  const [loggedInUserType] = useState(auth().user_type);
  const [campaignList] = useState(props.CampaignList);
  const [accordion, setAccordion] = useState(props.Accordion);

  const [error, setError] = useState("");

  const campaignNav = (e, campaignId) => {
    e.preventDefault();
    navigate(campaignId);
  };

  return (
    <div className="mb-4 flex-col flex rounded-lg bg-white drop-shadow-sm border ctm-border-color-2 p-4 overflow-visible">
      <div
        className={`font-bold mb-4 ${props.TableTitle.color} px-4 cursor-pointer flex justify-between items-center`}
        onClick={() => setAccordion(!accordion)}
      >
        {props.TableTitle.text}
        {accordion ? (
          <FontAwesomeIcon icon={faCircleChevronUp} />
        ) : (
          <FontAwesomeIcon icon={faCircleChevronDown} />
        )}
      </div>
      {accordion && (
        <>
          <div className="mb-4 text-red-500">{error}</div>
          <div className="overflow-x-scroll flex">
            <table id="campaignList" className="flex-1">
              <thead>
                <tr className="h-20 ctm-border-color-3 border-b">
                  <th className="w-12 px-4 text-center">Select</th>
                  <th className="w-12 px-4 text-center">Platform</th>
                  <th className="ctm-min-width-1 ctm-max-width-1 overflow-hidden whitespace-nowrap overflow-ellipsis px-4 text-left">
                    Brand
                  </th>
                  <th className="ctm-min-width-3 ctm-max-width-3 overflow-hidden whitespace-nowrap overflow-ellipsis px-4 text-left">
                    Title
                  </th>
                  {(props.TableTitle.text === "Active" ||
                    props.TableTitle.text === "Ready to Start" ||
                    props.TableTitle.text === "Ended" ||
                    props.TableTitle.text === "Cancelled") && (
                    <th className="w-12 px-4 text-center">Accepted</th>
                  )}
                  {(props.TableTitle.text === "Ready to Start" ||
                    props.TableTitle.text === "Cancelled") && (
                    <th className="w-12 px-4 text-center">Invited</th>
                  )}
                  {(props.TableTitle.text === "Ready to Start" ||
                    props.TableTitle.text === "Cancelled") && (
                    <th className="w-12 px-4 text-center">Applied</th>
                  )}
                  {(props.TableTitle.text === "Ready to Start" ||
                    props.TableTitle.text === "Cancelled") && (
                    <th className="w-12 px-4 text-center">Declined</th>
                  )}
                  {(props.TableTitle.text === "Accepted" ||
                    props.TableTitle.text === "Invited") && (
                    <th className="w-40 px-4 text-center">Linked Posts</th>
                  )}
                  {(props.TableTitle.text === "Ready to Start" ||
                    props.TableTitle.text === "Cancelled" ||
                    props.TableTitle.text === "Invited") && (
                    <th className="w-80 whitespace-nowrap px-4 center">
                      Create Date
                    </th>
                  )}
                  {(props.TableTitle.text === "Active" ||
                    props.TableTitle.text === "Ended" ||
                    props.TableTitle.text === "Accepted") && (
                    <th className="w-80 whitespace-nowrap px-4 text-center ctm-max-width-1">
                      Start Date
                    </th>
                  )}
                  {(props.TableTitle.text === "Active" ||
                    props.TableTitle.text === "Ended" ||
                    props.TableTitle.text === "Accepted") && (
                    <th className="w-80 whitespace-nowrap px-4 text-center ctm-max-width-1">
                      End Date
                    </th>
                  )}
                  {props.TableTitle.text === "Cancelled" && (
                    <th className="w-80 whitespace-nowrap px-4 text-center ctm-max-width-1">
                      Cancel Date
                    </th>
                  )}
                  {(props.TableTitle.text === "Active" ||
                    props.TableTitle.text === "Ended") && (
                    <th className="w-12 px-4 text-center">Views</th>
                  )}
                  {(props.TableTitle.text === "Active" ||
                    props.TableTitle.text === "Ended") && (
                    <th className="w-12 px-4 text-center">Likes</th>
                  )}
                  {(props.TableTitle.text === "Active" ||
                    props.TableTitle.text === "Ended") && (
                    <th className="w-12 px-4 text-center">Shares</th>
                  )}
                  {(props.TableTitle.text === "Active" ||
                    props.TableTitle.text === "Ended") && (
                    <th className="w-12 px-4 text-center">Comments</th>
                  )}
                  <th className="w-80 whitespace-nowrap px-4 text-center ctm-max-width-1">
                    Status
                  </th>
                  <th className="px-4 text-center w-32 ctm-min-width-15">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {campaignList.map((campaigns) => {
                  const campaign =
                    loggedInUserType === "Brand"
                      ? campaigns
                      : campaigns.campaign_details[0];
                  return (
                    <tr
                      key={campaign._id.toString()}
                      className="h-20 cursor-pointer ctm-border-color-3 border-b"
                      onClick={(e) => campaignNav(e, campaign._id.toString())}
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
                      <td className="ctm-min-width-1 ctm-max-width-1 overflow-hidden whitespace-nowrap overflow-ellipsis px-4 text-left">
                        {campaign.brand_name}
                      </td>
                      <td className="ctm-min-width-3 ctm-max-width-3 overflow-hidden whitespace-nowrap overflow-ellipsis px-4 text-left">
                        {campaign.campaign_name}
                      </td>
                      {(props.TableTitle.text === "Active" ||
                        props.TableTitle.text === "Ready to Start" ||
                        props.TableTitle.text === "Ended" ||
                        props.TableTitle.text === "Cancelled") && (
                        <td className="w-12 px-4 text-center">
                          {campaign.creator_list_accepted.length}
                        </td>
                      )}
                      {(props.TableTitle.text === "Ready to Start" ||
                        props.TableTitle.text === "Cancelled") && (
                        <td className="w-12 px-4 text-center">
                          {campaign.creator_list_invited.length}
                        </td>
                      )}
                      {(props.TableTitle.text === "Ready to Start" ||
                        props.TableTitle.text === "Cancelled") && (
                        <td className="w-12 px-4 text-center">
                          {campaign.creator_list_applied.length}
                        </td>
                      )}
                      {(props.TableTitle.text === "Ready to Start" ||
                        props.TableTitle.text === "Cancelled") && (
                        <td className="w-12 px-4 text-center">
                          {campaign.creator_list_declined.length}
                        </td>
                      )}
                      {(props.TableTitle.text === "Accepted" ||
                        props.TableTitle.text === "Invited") && (
                        <td className="w-40 font-bold text-red-500 px-4 text-center">
                          {campaigns.video_list.length}
                        </td>
                      )}
                      {(props.TableTitle.text === "Ready to Start" ||
                        props.TableTitle.text === "Cancelled" ||
                        props.TableTitle.text === "Invited") && (
                        <td className="w-80 whitespace-nowrap px-4 text-center ctm-max-width-1 ctm-font-color-1">
                          {new Date(campaign.create_date).toLocaleDateString(
                            "en-CA"
                          )}
                        </td>
                      )}
                      {(props.TableTitle.text === "Active" ||
                        props.TableTitle.text === "Ended" ||
                        props.TableTitle.text === "Accepted") && (
                        <td className="w-80 whitespace-nowrap px-4 text-center ctm-max-width-1 ctm-font-color-1">
                          {campaign.start_date ? (
                            new Date(campaign.start_date).toLocaleDateString(
                              "en-CA"
                            )
                          ) : (
                            <span>--</span>
                          )}
                        </td>
                      )}
                      {(props.TableTitle.text === "Active" ||
                        props.TableTitle.text === "Ended" ||
                        props.TableTitle.text === "Accepted") && (
                        <td className="w-80 whitespace-nowrap px-4 text-center ctm-max-width-1 ctm-font-color-1">
                          {campaign.end_date ? (
                            new Date(campaign.end_date).toLocaleDateString(
                              "en-CA"
                            )
                          ) : (
                            <span>--</span>
                          )}
                        </td>
                      )}
                      {props.TableTitle.text === "Cancelled" && (
                        <td className="w-80 whitespace-nowrap px-4 text-center ctm-max-width-1 ctm-font-color-1">
                          {campaign.cancelled_date ? (
                            new Date(
                              campaign.cancelled_date
                            ).toLocaleDateString("en-CA")
                          ) : (
                            <span>--</span>
                          )}
                        </td>
                      )}
                      {(props.TableTitle.text === "Active" ||
                        props.TableTitle.text === "Ended") && (
                        <td className="w-12 px-4 text-center font-bold text-red-500">
                          {campaign.social_total_views}
                        </td>
                      )}
                      {(props.TableTitle.text === "Active" ||
                        props.TableTitle.text === "Ended") && (
                        <td className="w-12 px-4 text-center font-bold text-red-500">
                          {campaign.social_total_likes}
                        </td>
                      )}
                      {(props.TableTitle.text === "Active" ||
                        props.TableTitle.text === "Ended") && (
                        <td className="w-12 px-4 text-center font-bold text-red-500">
                          {campaign.social_total_shares}
                        </td>
                      )}
                      {(props.TableTitle.text === "Active" ||
                        props.TableTitle.text === "Ended") && (
                        <td className="w-12 px-4 text-center font-bold text-red-500">
                          {campaign.social_total_comments}
                        </td>
                      )}
                      <td className="w-80 whitespace-nowrap px-4 text-center ctm-max-width-1">
                        <IndicatorStatus CampaignStatus={campaign.status} />
                      </td>
                      <td className="px-4 text-center">
                        <ActionTable
                          ClickedCampaignId={campaign._id.toString()}
                          CustomData={props.CustomData}
                          SetTrigger1={props.SetTrigger1}
                          Trigger1={props.Trigger1}
                          Status={campaign.status}
                          SetTrigger2={setError}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
      {campaignList.length <= 0 && (
        <div className="text-center my-8 ctm-font-color-1">
          No Data to display
        </div>
      )}
    </div>
  );
}

export default ListCampaigns;
