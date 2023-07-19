import React, { useState, useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
import { useParams } from "react-router-dom";
import axios from "axios";

//Section import
import Dashboardnav from "../../../sections/Dashboardnav";
import Dashboardheader from "../../../sections/Dashboardheader";
import Affiliatelist from "../../../sections/Affiliatelist";

function DashboardBoxDetails() {
  const auth = useAuthUser();
  //Get boxid from Link parameters
  const { boxid } = useParams();

  const [viewerUserType] = useState(auth().user_type);
  const [box, setBox] = useState({ box_label: "" });
  const [affiliateList, setAffiliateList] = useState([]);

  //Useeffect Triggers
  const [getBoxDetailsTrigger, setGetBoxDetailsTrigger] = useState(true);
  const [getBoxDetailsExternalTrigger, setGetBoxDetailsExternalTrigger] = useState(false)

  //Popup states/information
  const [customData] = useState({
    action: "Influencer Box - Details - Brand",
    boxId: boxid,
    displayActionButtons: true,
  });

  useEffect(() => {
    setGetBoxDetailsTrigger(true);

    const getBoxDetails = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/brand/box/getbox`,
          {
            params: {
              box_id: boxid,
            },
          }
        );
        if (res.data.err) {
          console.log(res.data.err);
        } else {
          setBox(res.data.box_details);
          if (res.data.box_details.affiliate_list.length !== 0) {
            const res2 = await axios.get(
              `${process.env.REACT_APP_ROUTE}/api/affiliate/getlist`,
              {
                params: {
                  _id: {
                    $in: res.data.box_details.affiliate_list,
                  },
                },
              }
            );
            if (res2.data.err) {
            } else {
              setAffiliateList(res2.data.affiliate_list);
              setGetBoxDetailsTrigger(false);
            }
          } else {
            setAffiliateList([]);
            setGetBoxDetailsTrigger(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    getBoxDetails();
  }, [boxid, getBoxDetailsExternalTrigger]);

  return (
    <div className="h-screen flex relative">
      <Dashboardnav
        ActiveLink="Influencer Box"
        ViewerUserType={viewerUserType}
      />
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        {!getBoxDetailsTrigger && (
          <Dashboardheader Title={`Influencer Box - ${box.box_label}`} />
        )}
        {!getBoxDetailsTrigger && (
          <Affiliatelist
            AffiliateList={affiliateList}
            CustomData={customData}
            SetTrigger1={setGetBoxDetailsExternalTrigger}
            Trigger1={getBoxDetailsExternalTrigger}
          />
        )}
      </div>
    </div>
  );
}

export default DashboardBoxDetails;
