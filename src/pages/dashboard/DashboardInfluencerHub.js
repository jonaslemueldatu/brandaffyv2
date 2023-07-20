import React, { useState, useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";

// Section imports
import NavigationDashboard from "../../sections/NavigationDashboard";
import ContainerHeader from "../../sections/ContainerHeader";
import ListAffiliates from "../../sections/ListAffiliates";

//Snippet imports
import PopupAddTobox from "../../snippets/PopupAddToBox";
import PopupInviteCampaign from "../../snippets/PopupInviteCampaign";

function Dashboardinfluencerhub() {
  const auth = useAuthUser();

  const [viewerUserType] = useState(auth().user_type);
  const [affiliateList, setAffiliateList] = useState({});

  // Trigger the useEffect
  const [getAffiliateListTrigger, setGetAffiliateListTrigger] = useState(true);

  // Popup information
  const [addToBoxPopup, setAddToBoxPopup] = useState(false);
  const [inviteCampaignPopup, setInviteCampaignPopup] = useState(false);

  const [clickedProfileId, setClickedProfileId] = useState("");
  // Action displayed may differ based on Viewer user type
  const [customData] = useState({
    action:
      viewerUserType === "Brand"
        ? "Influencer Hub - Brand"
        : "Influencer Hub - Affiliate",
    displayActionButtons: viewerUserType === "Brand" ? true : false,
  });

  useEffect(() => {
    setGetAffiliateListTrigger(true);
    const getAffiliateList = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/profile/getlist`,
          {
            params: {},
          }
        );
        setAffiliateList(res.data.affiliate_list);
        setGetAffiliateListTrigger(false);
      } catch (error) {
        console.log(error);
      }
    };

    getAffiliateList();
  }, []);

  return (
    <div className="h-screen flex relative">
      <NavigationDashboard
        ActiveLink="Influencer Hub"
        ViewerUserType={viewerUserType}
      />
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        <ContainerHeader Title="Influencer Hub" />
        {!getAffiliateListTrigger && (
          <ListAffiliates
            AffiliateList={affiliateList}
            CustomData={customData}
            SetPopup1={setAddToBoxPopup}
            SetPopup2={setInviteCampaignPopup}
            SetClickedProfileId={setClickedProfileId}
          />
        )}
      </div>
      {addToBoxPopup && !getAffiliateListTrigger && (
        <PopupAddTobox
          SetAddToBoxPopup={setAddToBoxPopup}
          ViewedProfileId={clickedProfileId}
        />
      )}
      {inviteCampaignPopup && !getAffiliateListTrigger && (
        <PopupInviteCampaign
          SetInviteCampaignPopup={setInviteCampaignPopup}
          ViewedProfileId={clickedProfileId}
        />
      )}
    </div>
  );
}

export default Dashboardinfluencerhub;
