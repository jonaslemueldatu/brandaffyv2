import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";

import axios from "axios";

// Section imports
import NavigationDashboard from "../../sections/NavigationDashboard";
import ContainerHeader from "../../sections/ContainerHeader";
import InfoCardCreator from "../../sections/InfoCardCreator";
import InfoCardBrand from "../../sections/InfoCardBrand";
import ContainerActionGeneral from "../../sections/ContainerGeneralAction";
import ConnectorTiktok from "../../sections/ConnectorTiktok";

// Snippet imports
import PopupAddTobox from "../../snippets/PopupAddToBox";
import PopupInviteCampaign from "../../snippets/PopupInviteCampaign";
import InfoCardTiktok from "../../sections/InfoCardTiktok";

function DashboardProfile() {
  const auth = useAuthUser();
  // Get logged-in user ID from params
  const { id } = useParams();

  const [isThisMyProfile] = useState(id ? false : true);
  const [viewedProfileId] = useState(id ? id : auth().id);
  const [viewedProfileUserType] = useState(id ? "Creator" : auth().user_type);
  const [viewerUserType] = useState(auth().user_type);
  const [profileToDisplay, setProfileToDisplay] = useState({});

  // Trigger the useEffect
  const [GetProfileTrigger, setGetProfileTrigger] = useState(true);

  //State trigger
  const [linkedTiktok, setLinkedTiktok] = useState(false);

  // Popup information
  const [addToBoxPopup, setAddToBoxPopup] = useState(false);
  const [inviteCampaignPopup, setInviteCampaignPopup] = useState(false);

  const [customData] = useState({
    action: "Influencer Profile - Brand",
  });

  useEffect(() => {
    setGetProfileTrigger(true);

    const getProfileToDisplay = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/profile/get`,
          {
            params: {
              _id: viewedProfileId,
              option_type: viewedProfileUserType,
            },
          }
        );
        if (res.data.err) {
          console.log(res.data.err);
        } else {
          setProfileToDisplay(res.data.user_profile);
          setLinkedTiktok(res.data.user_profile.social_tiktok);
          setGetProfileTrigger(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getProfileToDisplay();
  }, [viewedProfileId, viewedProfileUserType]);

  return (
    <div className="h-screen flex relative">
      <NavigationDashboard
        ActiveLink={id ? "" : "My Profile"}
        ViewerUserType={viewerUserType}
      />
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        <ContainerHeader
          Title={
            viewedProfileUserType === "Creator"
              ? "Influencer Profile"
              : "Brand Profile"
          }
        />
        {!GetProfileTrigger &&
          viewerUserType === "Brand" &&
          !isThisMyProfile && (
            <ContainerActionGeneral
              SetPopup2={setInviteCampaignPopup}
              SetPopup1={setAddToBoxPopup}
              CustomData={customData}
            />
          )}

        {!GetProfileTrigger && viewedProfileUserType === "Creator" && (
          <InfoCardCreator
            ProfileToDisplay={profileToDisplay}
            IsThisMyProfile={isThisMyProfile}
            ViewedProfileId={viewedProfileId}
          />
        )}
        {!GetProfileTrigger && viewedProfileUserType === "Brand" && (
          <InfoCardBrand
            ProfileToDisplay={profileToDisplay}
            IsThisMyProfile={isThisMyProfile}
            ViewedProfileId={viewedProfileId}
          />
        )}
        {!GetProfileTrigger &&
          isThisMyProfile &&
          viewedProfileUserType === "Creator" &&
          !linkedTiktok && <ConnectorTiktok />}
        {!GetProfileTrigger && linkedTiktok && (
          <InfoCardTiktok ViewedProfileId={viewedProfileId} />
        )}
      </div>
      {addToBoxPopup && !GetProfileTrigger && (
        <PopupAddTobox
          SetAddToBoxPopup={setAddToBoxPopup}
          ViewedProfileId={viewedProfileId}
        />
      )}
      {inviteCampaignPopup && !GetProfileTrigger && (
        <PopupInviteCampaign
          SetInviteCampaignPopup={setInviteCampaignPopup}
          ViewedProfileId={viewedProfileId}
        />
      )}
    </div>
  );
}

export default DashboardProfile;
