import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function InfoCardCampaignSummary() {
  const { campaignid } = useParams();

  const [basicReport, setBasicReport] = useState([]);

  //useEffect indicators
  const [isGeneratingReport, setIsGeneratingReport] = useState(true);

  // useEffect to get report
  useEffect(() => {
    setIsGeneratingReport(true);
    const getCampaignReport = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_ROUTE}/api/campaign/getreport`,
          {
            params: {
              report_type: "daily-data-general",
              campaign_id: campaignid,
            },
          }
        );
        if (res.data.err) {
          console.log(res.data.err);
          setIsGeneratingReport(false);
        } else {
          setBasicReport(res.data.report_array);
          setIsGeneratingReport(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCampaignReport();
  }, []);

  return (
    <div className="mb-4 flex-col md:flex-row flex rounded-lg bg-white drop-shadow-sm border ctm-border-color-2 p-4">
      <div>Hello World</div>
    </div>
  );
}

export default InfoCardCampaignSummary;
