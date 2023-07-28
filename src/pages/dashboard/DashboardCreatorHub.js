import React, { useState, useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";

// Section imports
import NavigationDashboard from "../../sections/NavigationDashboard";
import ContainerHeader from "../../sections/ContainerHeader";
import ListCreators from "../../sections/ListCreators";

//Snippet imports
import PopupAddTobox from "../../snippets/PopupAddToBox";
import PopupInviteCampaign from "../../snippets/PopupInviteCampaign";

function Dashboardcreatorhub() {
  const auth = useAuthUser();

  const [loggedInUserType] = useState(auth().user_type);
  const [creatorList, setCreatorList] = useState({});

  // Trigger the useEffect
  const [getCreatorListTrigger, setGetCreatorListTrigger] = useState(true);

  // Popup information
  const [addToBoxPopup, setAddToBoxPopup] = useState(false);
  const [inviteCampaignPopup, setInviteCampaignPopup] = useState(false);

  const [clickedProfileId, setClickedProfileId] = useState("");
  // Action displayed may differ based on Viewer user type
  const [customData] = useState({
    action:
      loggedInUserType === "Brand"
        ? "Creator Hub - Brand"
        : "Creator Hub - Creator",
    displayActionButtons: loggedInUserType === "Brand" ? true : false,
  });

  useEffect(() => {
    setGetCreatorListTrigger(true);
    const getCreatorList = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/profile/getlist`,
          {
            params: {},
          }
        );
        setCreatorList(res.data.creator_list);
        setGetCreatorListTrigger(false);
      } catch (error) {
        console.log(error);
      }
    };

    getCreatorList();
  }, []);

  return (
    <div className="h-screen flex relative">
      <NavigationDashboard
        ActiveLink="Creator Hub"
        LoggedInUserType={loggedInUserType}
      />
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        <ContainerHeader Title="Creator Hub" />
        {!getCreatorListTrigger && (
          <ListCreators
            CreatorList={creatorList}
            CustomData={customData}
            SetPopup1={setAddToBoxPopup}
            SetPopup2={setInviteCampaignPopup}
            SetClickedProfileId={setClickedProfileId}
          />
        )}
      </div>
      {addToBoxPopup && !getCreatorListTrigger && (
        <PopupAddTobox
          SetAddToBoxPopup={setAddToBoxPopup}
          ViewedProfileId={clickedProfileId}
        />
      )}
      {inviteCampaignPopup && !getCreatorListTrigger && (
        <PopupInviteCampaign
          SetInviteCampaignPopup={setInviteCampaignPopup}
          ViewedProfileId={clickedProfileId}
        />
      )}
    </div>
  );
}

export default Dashboardcreatorhub;
