import React, { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";

function ConnectorTiktokPosts() {
  const auth = useAuthUser();

  const [loggedInUserID] = useState(auth().id);
  const [videoList, getVideoList] = useState([]);

  //UseEffect States
  const [isGettingVidList, setIsGettingVidList] = useState(true);

  useEffect(() => {
    setIsGettingVidList(true);
    const getVideoList = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/tiktok/getvideolist`,
          {
            params: {
              user_id: loggedInUserID,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    };

    getVideoList();
  }, [loggedInUserID]);

  return (
    <div>
      <div>Hello World</div>
    </div>
  );
}

export default ConnectorTiktokPosts;
