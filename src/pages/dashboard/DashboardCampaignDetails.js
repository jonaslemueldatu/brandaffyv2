import React, { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useParams } from "react-router-dom";
import axios from "axios";

//Section imports
import NavigationDashboard from "../../sections/NavigationDashboard";
import ContainerHeader from "../../sections/ContainerHeader";
import InfoCardCampaign from "../../sections/InfoCardCampaign";
import ConnectorTiktokPosts from "../../sections/ConnectorTiktokPosts";
import ContainerGeneralAction from "../../sections/ContainerGeneralAction";

//Snippet Imports
import PopupLinkTiktokVid from "../../snippets/PopupLinkTiktokVid"

function DashboardCampaignDetails() {
  const auth = useAuthUser();
  const { campaignid } = useParams();

  const [viewerUserType] = useState(auth().user_type);

  //Main data states
  const [campaignDetails, setCampaignDetails] = useState({});

  //useEffect states
  const [gettingCampaignDetails, setGettingCampaignDetails] = useState(true);

  //Popup States
  const [linkTiktokPopup, setLinkTiktokPopup] = useState(false)

  //Action states
  const [customData] = useState({
    action: "Campaign Details - Link Post",
  });
  useEffect(() => {
    setGettingCampaignDetails(true);
    const getCampaignDetails = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_ROUTE}/api/campaign/getdetails`,
        {
          params: {
            _id: campaignid,
          },
        }
      );
      if (res.data.err) {
        console.log(res.data.err);
      } else {
        setCampaignDetails(res.data.campaign_details);
        setGettingCampaignDetails(false);
      }
    };

    getCampaignDetails();
  }, [campaignid]);

  return (
    <div className="h-screen flex relative">
      <NavigationDashboard ViewerUserType={viewerUserType} />
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        {!gettingCampaignDetails && (
          <ContainerHeader
            Title={`Campaign - ${campaignDetails.campaign_name}`}
          />
        )}
        {!gettingCampaignDetails && viewerUserType === "Affiliate" && (
          <ContainerGeneralAction CustomData={customData} SetPopup1={setLinkTiktokPopup} />
        )}
        {!gettingCampaignDetails && (
          <InfoCardCampaign CampaignDetails={campaignDetails} />
        )}
        {!gettingCampaignDetails && viewerUserType === "Affiliate" && (
          <ConnectorTiktokPosts />
        )}
      </div>
      {linkTiktokPopup && !gettingCampaignDetails && (
        <PopupLinkTiktokVid
          SetLinkTiktokPopup={setLinkTiktokPopup}
          BrandOwnerId={campaignDetails.brand_owner_id}
        />
      )}
    </div>
  );
}

export default DashboardCampaignDetails;
