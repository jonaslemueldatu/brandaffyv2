//Props
//1. VideoList = List of Videos
//2. SetTrigger1 = Trigger 1
//3. Trigger1
//4. CampaignStatus

import React, { useState } from "react";

//Snippet Imports
import FormatterNumber from "../snippets/FormatterNumber";
import ActionTable from "../snippets/ActionTable";

function ListTiktokVideos(props) {
  const [videoList] = useState(props.VideoList);

  return (
    <div className="flex-col flex rounded-lg bg-white drop-shadow-sm border ctm-border-color-2 p-4 overflow-visible">
      <div className={`font-bold mb-4 px-4`}>Linked Tiktok Posts</div>
      <div className="overflow-x-scroll flex flex-col">
        <table className="flex-1">
          <thead>
            <tr className="h-20 ctm-border-color-3 border-b">
              <th className="w-12 px-4 text-center">Select</th>
              <th className="w-80 ctm-min-width-15 whitespace-nowrap px-4 text-left">
                Title
              </th>
              <th className="w-80 ctm-min-width-15 whitespace-nowrap px-4 text-left">
                Description
              </th>
              <th className="w-12 px-4 text-center">Views</th>
              <th className="w-12 px-4 text-center">Likes</th>
              <th className="w-12 px-4 text-center">Comments</th>
              <th className="w-12 px-4 text-center">Shares</th>
              <th className="w-80 whitespace-nowrap px-4 text-center ctm-max-width-1">
                Create Date
              </th>
              <th className="w-80 whitespace-nowrap px-4 text-center ctm-max-width-1">
                Post
              </th>
              <th className="w-80 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {videoList.map((videos) => {
              return (
                <tr
                  key={videos._id.toString()}
                  className="h-20 cursor-pointer ctm-border-color-3 border-b"
                >
                  <td className="w-12 px-4 text-center">
                    <input
                      className="block m-auto cursor-pointer"
                      type="checkbox"
                    ></input>
                  </td>
                  <td className="w-80 ctm-min-width-15 whitespace-nowrap px-4 text-left">
                    {videos.title !== "" ? (
                      videos.title
                    ) : (
                      <span className="text-center my-8 ctm-font-color-1">
                        No title available
                      </span>
                    )}
                  </td>
                  <td className="w-80 ctm-min-width-15 whitespace-nowrap px-4 text-left">
                    {videos.video_description !== "" ? (
                      videos.video_description
                    ) : (
                      <span className="text-center my-8 ctm-font-color-1">
                        No description available
                      </span>
                    )}
                  </td>
                  <td className="w-12 px-4 text-center font-semibold">
                    <FormatterNumber Number={videos.view_count} />
                  </td>
                  <td className="w-12 px-4 text-center font-semibold">
                    <FormatterNumber Number={videos.like_count} />
                  </td>
                  <td className="w-12 px-4 text-center font-semibold">
                    <FormatterNumber Number={videos.comment_count} />
                  </td>
                  <td className="w-12 px-4 text-center font-semibold">
                    <FormatterNumber Number={videos.share_count} />
                  </td>
                  <td className="w-80 whitespace-nowrap px-4 text-center ctm-max-width-1">
                    {new Date(videos.create_time).toLocaleDateString("en-CA")}
                  </td>
                  <td className="w-80 whitespace-nowrap px-4 text-center ctm-max-width-1">
                    <a href={videos.share_url} target="_blank" rel="noreferrer">
                      <div className="underline">View Post</div>
                    </a>
                  </td>
                  <td>
                    {props.CampaignStatus === "Ready to Start" && (
                      <ActionTable
                        CustomData={props.CustomData}
                        ClickedVideoId={videos.video_id}
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
      {videoList.length <= 0 && (
        <div className="text-center my-8 ctm-font-color-1">
          No Data to display
        </div>
      )}
    </div>
  );
}

export default ListTiktokVideos;
