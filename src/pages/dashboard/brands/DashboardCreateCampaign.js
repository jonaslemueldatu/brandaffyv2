import React, { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";

//Section imports
import Dashboardnav from "../../../sections/Dashboardnav";
import Dashboardheader from "../../../sections/Dashboardheader";
import Createcampaignform from "../../../sections/Createcampaignform";

function Dashboardcreatecampaign() {
  const auth = useAuthUser();

  const [viewerUserType] = useState(auth().user_type);
  const [loggedInUserId] = useState(auth().id);
  const [boxList, setBoxList] = useState([]);

  //UseEffect triggers
  const [getBoxListTrigger, setGetBoxListTrigger] = useState(true);

  //Getbox list to automatically send invitations
  useEffect(() => {
    setGetBoxListTrigger(true);
    const getBoxList = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/brand/box/getlist`,
          {
            params: {
              brand_owner_id: loggedInUserId,
            },
          }
        );
        if (res.data.err) {
          console.log(res.data.err);
          setGetBoxListTrigger([]);
          setGetBoxListTrigger(false);
        } else {
          setBoxList(res.data.brandbox_list);
          setGetBoxListTrigger(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBoxList();
  }, [loggedInUserId]);

  return (
    <div className="h-screen flex relative">
      <Dashboardnav ViewerUserType={viewerUserType} />
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        <Dashboardheader Title="Campaign - New Campaign" />
        {!getBoxListTrigger && (
          <Createcampaignform Box={boxList} OwnerId={loggedInUserId} />
        )}
      </div>
    </div>
  );
}

export default Dashboardcreatecampaign;
