//Props
//1. AffiliateList = List affilaites to be displayed on the section - Array
//2. SetAddToBoxPopup = Used to toggle the display of the Add to Box Popup
//3. SetClickedProfileId = Used to set the ID of the clicked Affiliate. This will be passed onto the parent
//4. CustomData = Will contain custom data for usage when configuring the Table Action
//5. SetTrigger1 = Assign a setState to trigger parent useEffect
//6. Trigger1 = goes hand in hand with SetTrigger1

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";

//Snippet imports
import IndicatorActive from "../snippets/IndicatorActive";
import IndicatorGender from "../snippets/IndicatorGender";
import ActionTable from "../snippets/ActionTable";

function ListAffiliates(props) {
  const navigate = useNavigate();
  const auth = useAuthUser();

  const [affiliateList] = useState(props.AffiliateList);

  const handleRowClick = (id) => {
    id === auth().id.toString()
      ? navigate(`/dashboard/profile`)
      : navigate(`/dashboard/profile/${id}`);
  };

  return (
    <div className="flex-col flex rounded-lg bg-white drop-shadow-sm border ctm-border-color-2 p-4 overflow-visible">
      <div className="overflow-x-scroll flex">
        <table className="flex-1">
          <thead>
            <tr className="h-20 ctm-border-color-3 border-b">
              <th className="w-12 px-4 text-center">Select</th>
              <th className="w-80 ctm-min-width-15 whitespace-nowrap px-4 text-left">
                User
              </th>
              <th className="w-80 ctm-min-width-15 whitespace-nowrap px-4 text-left">
                Email
              </th>
              <th className="w-12 px-4 text-center">Gender</th>
              <th className="w-12 px-4 text-center">Age</th>
              <th className="w-80 ctm-min-width-1 whitespace-nowrap px-4 text-left">
                Province
              </th>
              <th className="w-12 px-4 text-center">Online</th>
              <th className="w-12 px-4 text-center">Tiktok</th>
              <th className="w-80 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {affiliateList.map((affiliate) => {
              return (
                <tr
                  key={affiliate._id.toString()}
                  onClick={() => handleRowClick(affiliate._id.toString())}
                  className="h-20 cursor-pointer ctm-border-color-3 border-b"
                >
                  <td
                    className="w-12 px-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      className="block m-auto cursor-pointer"
                      type="checkbox"
                    ></input>
                  </td>
                  <td className="w-80 ctm-min-width-15 whitespace-nowrap px-4">
                    <div className="flex justify-left items-center">
                      <img
                        className="rounded-full h-16"
                        alt="Affiliate profile per row"
                        src={affiliate.profile_picture}
                      />{" "}
                      <span className="mx-4">
                        {affiliate.first_name} {affiliate.last_name}
                      </span>
                    </div>
                  </td>
                  <td className="w-80 ctm-min-width-15 whitespace-nowrap overflow-ellipsis px-4 text-left">
                    {affiliate.email}
                  </td>
                  <td className="w-12 px-4 text-center">
                    <IndicatorGender Gender={affiliate.gender} />
                  </td>
                  <td className="w-12 px-4 text-center">{affiliate.age}</td>
                  <td className="w-80 ctm-min-width-1 whitespace-nowrap overflow-ellipsis px-4 text-left">
                    {affiliate.province}
                  </td>
                  <td className="w-12 px-4 text-center">
                    <IndicatorActive Status={affiliate.logged_in} />
                  </td>
                  <td className="w-12 px-4"></td>
                  <td className="w-80 px-4">
                    {props.CustomData.displayActionButtons && (
                      <ActionTable
                        CustomData={props.CustomData}
                        ClickedProfileId={affiliate._id.toString()}
                        SetAddToBoxPopup={props.SetAddToBoxPopup}
                        SetClickedProfileId={props.SetClickedProfileId}
                        SetTrigger1={props.SetTrigger1}
                        Trigger1={props.Trigger1}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {affiliateList.length <= 0 && (
        <div className="text-center my-8 ctm-font-color-1">
          No Data to display
        </div>
      )}
    </div>
  );
}

export default ListAffiliates;
