import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function FormCreateCampaign(props) {
  const navigate = useNavigate();

  const [campaignName, setCampaignName] = useState("");
  const [campaignProduct, setCampaignProduct] = useState("");
  const [campaignMarket, setCampaignMarket] = useState("");
  const [campaignObjectives, setCampaignObjectives] = useState("");
  const [paymentType, setPaymenType] = useState("Fixed Rate");
  const [termsConditions, setTermsConditions] = useState("");
  const [invitationBox, setInvitationBox] = useState("");
  const [error, setError] = useState("");

  //Selected box to automatically send invitations to
  const [box] = useState(props.Box);

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ROUTE}/api/campaign/create`,
        {
          brand_owner_id: props.OwnerId,
          campaign_name: campaignName,
          campaign_product: campaignProduct,
          campaign_market: campaignMarket,
          campaign_objectives: campaignObjectives,
          payment_type: paymentType,
          terms_conditions: termsConditions,
          invitation_box: invitationBox,
        }
      );
      if (res.data.err) {
        console.log(res.data.err);
        setError(res.data.err);
      } else {
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-4 flex-col md:flex-row flex rounded-lg bg-white drop-shadow-sm border ctm-border-color-2 p-4">
      <form onSubmit={(e) => handleCreateCampaign(e)} className="w-full">
        <div className="flex gap-3 flex-wrap">
          <div className="flex flex-1 flex-col my-4">
            <label className="my-2 font-bold">Campaign Name</label>
            <input
              type="text"
              required
              onChange={(e) => setCampaignName(e.target.value)}
              onFocus={() => setError("")}
              placeholder="Title of your campaign"
              className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border max-w-lg ctm-min-width-1"
            ></input>
            <div className="text-red-500">{error}</div>
          </div>
          <div className="flex flex-1 flex-col my-4 ctm-min-width-1">
            <label className="my-2 font-bold">Status</label>
            <div className="p-4 w-fit rounded-3xl ctm-bg-color-5">
              Ready to Start
            </div>
          </div>
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="flex flex-1 flex-col my-4">
            <label className="my-2 font-bold">Product</label>
            <input
              type="text"
              required
              onChange={(e) => setCampaignProduct(e.target.value)}
              placeholder="What product do you want to market?"
              className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border max-w-lg ctm-min-width-1"
            ></input>
          </div>
          <div className="flex flex-1 flex-col my-4">
            <label className="my-2 font-bold">Target Market</label>
            <input
              type="text"
              required
              onChange={(e) => setCampaignMarket(e.target.value)}
              placeholder="Describe your target market"
              className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border max-w-lg ctm-min-width-1"
            ></input>
          </div>
        </div>
        <div className="flex flex-1 flex-col my-4">
          <label className="my-2 font-bold">Objectives</label>
          <textarea
            required
            rows="4"
            onChange={(e) => setCampaignObjectives(e.target.value)}
            placeholder="List down your objectives for this campaign"
            className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border"
          ></textarea>
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="flex flex-1 flex-col my-4">
            <label className="my-2 font-bold">Payment Type</label>
            <select
              required
              defaultValue={paymentType}
              onChange={(e) => setPaymenType(e.target.value)}
              className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border ctm-min-width-1 max-w-sm"
            >
              <option value="Fixed Rate">Fixed Rate</option>
              <option value="Retainer Monthly">Retainer Monthly</option>
              <option value="Performance Based">Performance Based</option>
              <option value="Pay per Post">Pay per Post</option>
              <option value="Gifts and Credits">Gifts and Credits</option>
            </select>
          </div>
          <div className="flex flex-1 flex-col my-4">
            <label className="my-2 font-bold">Send Invitation to Box</label>
            {box.length > 0 ? (
              <div>
                <select
                  onChange={(e) => setInvitationBox(e.target.value)}
                  defaultValue=""
                  className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border ctm-min-width-1 max-w-sm"
                >
                  <option value="" hidden disabled>
                    Select a box
                  </option>
                  {box.map((box) => {
                    return (
                      <option
                        key={box._id.toString()}
                        value={box._id.toString()}
                      >
                        {box.box_label}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : (
              <div className="p-4 w-fit rounded-3xl ctm-font-color-1">
                No available boxes to choose from
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col my-4">
          <label className="my-2 font-bold">Terms and Conditions</label>
          <textarea
            required
            rows="4"
            onChange={(e) => setTermsConditions(e.target.value)}
            placeholder="Terms and Conditions between the brand and the Influencer"
            className="p-4 rounded-lg ctm-border-color-3 drop-shadow-sm border"
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => navigate(-1)}
            className="ctm-btn mx-2 ctm-btn-2"
          >
            Cancel
          </button>
          <button type="submit" className="ctm-btn ctm-btn-3">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormCreateCampaign;
