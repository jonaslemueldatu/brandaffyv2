//Props
//1. CreatorList = List affilaites to be displayed on the section - Array
//2. SetPopup1 = Used to toggle the display of the Add to Box Popup
//3. SetPopup2
//3. SetClickedProfileId = Used to set the ID of the clicked Creator. This will be passed onto the parent
//4. CustomData = Will contain custom data for usage when configuring the Table Action
//5. SetTrigger1 = Assign a setState to trigger parent useEffect
//6. Trigger1 = goes hand in hand with SetTrigger1
//7. Title

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";

//Snippet imports
import IndicatorActive from "../snippets/IndicatorActive";
import IndicatorGender from "../snippets/IndicatorGender";
import ActionTable from "../snippets/ActionTable";
import IndicatorPlatform from "../snippets/IndicatorPlatform";
import TablesPagination from "../snippets/TablesPagination";
import FormatterNumber from "../snippets/FormatterNumber";

function ListCreators(props) {
  const navigate = useNavigate();
  const auth = useAuthUser();

  const handleRowClick = (id) => {
    id === auth().id.toString()
      ? navigate(`/dashboard/profile`)
      : navigate(`/dashboard/profile/${id}`);
  };

  return (
    <div className="flex-col flex rounded-lg bg-white drop-shadow-sm border ctm-border-color-2 p-4 mb-4 overflow-visible">
      <div className="overflow-x-scroll flex flex-col">
        {props.Title ? (
          <span className="px-4 font-bold mb-4 ">{props.Title}</span>
        ) : (
          ""
        )}
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={props.State4}
            onChange={(e) => props.SetState2(e.target.value)}
            className="p-4 rounded-lg ctm-border-color-3 border drop-shadow-sm w-3/12 bg-gray-100"
          ></input>
        </div>
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
                Occupation
              </th>
              <th className="w-80 ctm-min-width-1 whitespace-nowrap px-4 text-left">
                Niche
              </th>
              <th className="w-80 ctm-min-width-1 whitespace-nowrap px-4 text-left">
                Province
              </th>
              <th className="w-12 px-4 text-center">Online</th>
              <th className="w-12 px-4 text-center">Tiktok</th>
              <th className="w-12 px-4 text-center">Followers</th>
              <th className="w-80 px-4 text-center">Action</th>
            </tr>
          </thead>
          {!props.State5 && (
            <tbody>
              {props.CreatorList.map((creator) => {
                return (
                  <tr
                    key={creator._id.toString()}
                    onClick={() => handleRowClick(creator._id.toString())}
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
                          alt="Creator profile per row"
                          src={creator.profile_picture}
                        />{" "}
                        <span className="mx-4">
                          {creator.first_name} {creator.last_name}
                        </span>
                      </div>
                    </td>
                    <td className="w-80 ctm-min-width-15 whitespace-nowrap overflow-ellipsis px-4 text-left">
                      {creator.email}
                    </td>
                    <td className="w-12 px-4 text-center">
                      <IndicatorGender Gender={creator.gender} />
                    </td>
                    <td className="w-12 px-4 text-center">{creator.age}</td>
                    <td className="w-80 ctm-min-width-1 whitespace-nowrap overflow-ellipsis px-4 text-left">
                      {creator.occupation}
                    </td>
                    <td className="w-80 ctm-min-width-1 whitespace-nowrap overflow-ellipsis px-4 text-left">
                      {creator.niche}
                    </td>
                    <td className="w-80 ctm-min-width-1 whitespace-nowrap overflow-ellipsis px-4 text-left">
                      {creator.province}
                    </td>
                    <td className="w-12 px-4 text-center">
                      <IndicatorActive Status={creator.logged_in} />
                    </td>
                    <td className="w-12 px-4 text-center">
                      {" "}
                      <IndicatorPlatform
                        Platform={creator.social_tiktok ? "Tiktok" : ""}
                      />
                    </td>
                    <td className="w-12 px-4 text-center font-bold">
                      {creator.social_tiktok_follower_count ? (
                        <FormatterNumber
                          Number={creator.social_tiktok_follower_count}
                        />
                      ) : (
                        <div>--</div>
                      )}
                    </td>
                    <td className="w-80 px-4">
                      {props.CustomData.displayActionButtons && (
                        <ActionTable
                          CustomData={props.CustomData}
                          ClickedProfileId={creator._id.toString()}
                          SetPopup1={props.SetPopup1}
                          SetPopup2={props.SetPopup2}
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
          )}
        </table>
      </div>
      {props.CreatorList.length <= 0 && (
        <div className="text-center my-8 ctm-font-color-1">
          No Data to display
        </div>
      )}
      {!props.State5 && (
        <TablesPagination
          Page={props.State1}
          Total={props.State2}
          Limit={props.State3}
          SetState1={props.SetState1}
        />
      )}
    </div>
  );
}

export default ListCreators;
