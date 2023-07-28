import React, { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";

//Section imports
import NavigationDashboard from "../../../sections/NavigationDashboard";
import ContainerHeader from "../../../sections/ContainerHeader";
import FormCreateCampaign from "../../../sections/FormCreateCampaign";

function Dashboardcreatecampaign() {
  const auth = useAuthUser();

  const [loggedInUserType] = useState(auth().user_type);
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
          `${process.env.REACT_APP_ROUTE}/api/box/getlist`,
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
      <NavigationDashboard LoggedInUserType={loggedInUserType} />
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        <ContainerHeader Title="Campaign - New Campaign" />
        {!getBoxListTrigger && (
          <FormCreateCampaign Box={boxList} OwnerId={loggedInUserId} />
        )}
      </div>
    </div>
  );
}

export default Dashboardcreatecampaign;
