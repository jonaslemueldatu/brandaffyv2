import React, { useState, useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";

// Section imports
import Dashboardnav from "../../sections/Dashboardnav";
import Dashboardheader from "../../sections/Dashboardheader";
import Affiliatelist from "../../sections/Affiliatelist";

//Snippet imports
import Addtoboxpopup from "../../snippets/Addtoboxpopup";

function Dashboardinfluencerhub() {
  const auth = useAuthUser();

  const [viewerUserType] = useState(auth().user_type);
  const [affiliateList, setAffiliateList] = useState({});

  // Trigger the useEffect
  const [getAffiliateListTrigger, setGetAffiliateListTrigger] = useState(true);

  // Popup information
  const [addToBoxPopup, setAddToBoxPopup] = useState(false);
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
          `${process.env.REACT_APP_ROUTE}/api/affiliate/getlist`,
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
      <Dashboardnav
        ActiveLink="Influencer Hub"
        ViewerUserType={viewerUserType}
      />
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        <Dashboardheader Title="Influencer Hub" />
        {!getAffiliateListTrigger && (
          <Affiliatelist
            AffiliateList={affiliateList}
            CustomData={customData}
            SetAddToBoxPopup={setAddToBoxPopup}
            SetClickedProfileId={setClickedProfileId}
          />
        )}
      </div>
      {addToBoxPopup && !getAffiliateListTrigger && (
        <Addtoboxpopup
          SetAddToBoxPopup={setAddToBoxPopup}
          ViewedProfileId={clickedProfileId}
        />
      )}
    </div>
  );
}

export default Dashboardinfluencerhub;
