import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";

import axios from "axios";

// Section imports
import Dashboardnav from "../../sections/Dashboardnav";
import Dashboardheader from "../../sections/Dashboardheader";
import InfoCardAffiliate from "../../sections/InfoCardAffiliate";
import InfoCardBrand from "../../sections/InfoCardBrand";
import Generalactioncontainer from "../../sections/Generalactioncontainer";

// Snippet imports
import Addtoboxpopup from "../../snippets/Addtoboxpopup";

function DashboardProfile() {
  const auth = useAuthUser();
  // Get logged-in user ID from params
  const { id } = useParams();

  const [isThisMyProfile] = useState(id ? false : true);
  const [viewedProfileId] = useState(id ? id : auth().id);
  const [viewedProfileUserType] = useState(id ? "Affiliate" : auth().user_type);
  const [viewerUserType] = useState(auth().user_type);
  const [profileToDisplay, setProfileToDisplay] = useState({});

  // Trigger the useEffect
  const [GetProfileTrigger, setGetProfileTrigger] = useState(true);

  // Popup information
  const [addToBoxPopup, setAddToBoxPopup] = useState(false);
  const [customData] = useState({
    action: "Influencer Profile - Brand"
  });

  useEffect(() => {
    setGetProfileTrigger(true);

    const getProfileToDisplay = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/getprofile`,
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
      <Dashboardnav
        ActiveLink={id ? "" : "My Profile"}
        ViewerUserType={viewerUserType}
      />
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        <Dashboardheader
          Title={
            viewedProfileUserType === "Affiliate"
              ? "Influencer Profile"
              : "Brand Profile"
          }
        />
        {!GetProfileTrigger &&
          viewerUserType === "Brand" &&
          !isThisMyProfile && (
            <Generalactioncontainer
              SetPopup1={setAddToBoxPopup}
              CustomData={customData}
            />
          )}

        {!GetProfileTrigger && viewedProfileUserType === "Affiliate" && (
          <InfoCardAffiliate
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
      </div>
      {addToBoxPopup && !GetProfileTrigger && (
        <Addtoboxpopup
          SetAddToBoxPopup={setAddToBoxPopup}
          ViewedProfileId={viewedProfileId}
        />
      )}
    </div>
  );
}

export default DashboardProfile;
