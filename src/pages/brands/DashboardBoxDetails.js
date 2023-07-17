import React from "react";
import { useState, useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
import { useParams } from "react-router-dom";
import axios from "axios";

import Dashboardnav from "../../pages/sections/Dashboardnav";
import Dashboardheader from "../../pages/sections/Dashboardheader";
import Affiliatelist from "../../pages/sections/Affiliatelist";

function DashboardBoxDetails() {
  const auth = useAuthUser();
  const { boxid } = useParams();

  const [link] = useState("Influencer Box");
  const [usertype] = useState(auth().user_type);
  const [isbusy, setIsbusy] = useState(true);
  const [affiliateList, setAffiliatelist] = useState([]);
  const [box, setBox] = useState({});
  const [trigger, setTrigger] = useState(false)
  const [customData] = useState({
    action: "removeFromBox",
    boxId: boxid,
    hasAction: true
  })

  useEffect(() => {
    setIsbusy(true);

    const getBoxdetails = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/brand/box/getbox`,
          {
            params: {
              id: boxid,
            },
          }
        );
        if (res.data.err) {
          console.log(res.data.err);
        } else {
          setBox(res.data.box_details);
          console.log("hi");
          console.log(res.data.box_details.affiliate_list.length);
          console.log("hello");
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
              console.log(res2.data.err);
            } else {
              setAffiliatelist(res2.data.affiliate_list);
              setTrigger(false)
              setIsbusy(false);
            }
          } else {
            setIsbusy(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    getBoxdetails();
  }, [boxid, trigger]);

  return (
    <div className="h-screen flex relative">
      <Dashboardnav link={link} Type={usertype} />
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        {!isbusy && (
          <Dashboardheader Title={`Influencer Box - ${box.box_label}`} />
        )}
        {!isbusy && <Affiliatelist AffiliateList={affiliateList} CustomData={customData} SetTrigger={setTrigger} />}
      </div>
    </div>
  );
}

export default DashboardBoxDetails;
