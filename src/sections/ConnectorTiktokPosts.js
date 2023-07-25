import React from "react"

// import React, { useEffect, useState } from "react";
// import { useAuthUser } from "react-auth-kit";
// import axios from "axios";

function ConnectorTiktokPosts() {
  // const auth = useAuthUser();

  // const [loggedInUserID] = useState(auth().id);
  // const [videoList, setVideoList] = useState([]);

  // //UseEffect States
  // const [isGettingVidList, setIsGettingVidList] = useState(true);

  // useEffect(() => {
  //   setIsGettingVidList(true);
  //   const getVideoList = async () => {
  //     try {
  //       const res = await axios.get(
  //         `${process.env.REACT_APP_ROUTE}/api/tiktok/getvideolist`,
  //         {
  //           params: {
  //             user_id: loggedInUserID,
  //           },
  //         }
  //       );
  //       if (res.data.err) {
  //         console.log(res.data.err);
  //       } else {
  //         setVideoList(res.data.video_list.videos);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getVideoList();
  // }, [loggedInUserID]);

  return (
    <div>
      {/* <div>
        {videoList.map((videos) => {
          return (
            <div>
              {videos.id}, {videos.title}{" "}
            </div>
          );
        })}
      </div> */}
    </div>
  );
}

export default ConnectorTiktokPosts;
