import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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
          setIsGeneratingReport(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCampaignReport();
  }, [campaignid]);

  return (
    <div className="mb-4 flex-col flex rounded-lg bg-white drop-shadow-sm border ctm-border-color-2 p-4 ctm-min-height-1 overflow-x-scroll">
      <div className="ctm-min-width-5 h-full">
      {!isGeneratingReport && (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={basicReport}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="views" fill="#e9724d" />
            <Bar dataKey="likes" fill="#d6d727" />
            <Bar dataKey="comments" fill="#92cad1" />
            <Bar dataKey="shares" fill="#79ccb3" />
          </BarChart>
        </ResponsiveContainer>
      )}
      </div>
    </div>
  );
}

export default InfoCardCampaignSummary;
