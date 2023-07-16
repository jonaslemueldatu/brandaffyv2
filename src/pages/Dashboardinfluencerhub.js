import React from "react";
import { useState, useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
import axios from "axios";

import Dashboardnav from "./sections/Dashboardnav";
import Dashboardheader from "./sections/Dashboardheader";
import Affiliatelist from "./sections/Affiliatelist";

function Dashboardinfluencerhub() {
  const auth = useAuthUser();

  const [link] = useState("Influencer Hub");
  const [usertype] = useState(auth().user_type);
  const [affiliatelist, setAffiliatelist] = useState({});
  const [isbusy, setIsbusy] = useState(true);

  useEffect(() => {
    setIsbusy(true);
    const getProfilelist = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/getaffiliate`,
          {
            params: {},
          }
        );
        setAffiliatelist(res.data.affiliate_list);
        setIsbusy(false);
      } catch (error) {
        console.log(error);
      }
    };

    getProfilelist();
  }, []);

  return (
    <div className="h-screen flex">
      <Dashboardnav link={link} Type={usertype} />
      <div className="flex flex-col flex-1 p-4 overflow-y-auto">
        <Dashboardheader Title="Influencer Hub" />
        {!isbusy && <Affiliatelist AffiliateList={affiliatelist} />}
      </div>
    </div>
  );
}

export default Dashboardinfluencerhub;
