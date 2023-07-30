import React, { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function InfoCardBrandPlan() {
  const auth = useAuthUser();
  const navigate = useNavigate();

  const [loggedInUser] = useState(auth().id);
  const [loggedInUserType] = useState(auth().user_type);

  //Main section state
  const [subscriptionData, setSubscriptionData] = useState({});
  const [dateLeft, setDateLeft] = useState(0);

  //useEffect triggers
  const [isGettingPlanData, setIsGettingPlanData] = useState(true);

  //useEffect
  useEffect(() => {
    setIsGettingPlanData(true);
    const getSubscriptionDetails = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_ROUTE}/api/subscription/getdetails`,
        {
          params: {
            brand_profile_id: loggedInUser,
            user_type: loggedInUserType,
          },
        }
      );
      if (res.data.err) {
        console.log(res.data.err);
        setIsGettingPlanData(false);
      } else {
        //Check if plan is active
        if (!res.data.is_plan_active) {
          navigate("/dashboard/plans");
        }
        // Compute for plan end date
        const expirationDate = new Date(
          res.data.subscription_data.plan_expiration_date
        );
        const dateNow = new Date();
        setSubscriptionData(res.data.subscription_data);
        setDateLeft((expirationDate - dateNow) / (1000 * 60 * 60 * 24));
        setIsGettingPlanData(false);
      }
    };
    getSubscriptionDetails();
  }, [loggedInUser, loggedInUserType, navigate]);

  // Functions
  const requestPayment = async (e, amount, new_plan) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ROUTE}/api/subscription/requestpayment`,
        {
          amount: amount,
          reference_id: subscriptionData._id.toString(),
          customer_id: subscriptionData.xendit_reference_id,
          payment_method_id: subscriptionData.plan_payment_methods_object[0].id,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col w-full bg-white shadow-lg rounded-2xl mb-4">
      <div className="text-2xl p-6 border-b-2 ctm-border-color-1 font-semibold mb-2">
        Subscription
      </div>
      <div className="mx-[5%] py-5 overflow-scroll">
        <div className="ctm-table-1">
          <table className="w-full">
            {!isGettingPlanData && (
              <tbody>
                <tr>
                  <td className="ctm-min-width-1 "></td>
                  <td
                    className={`rounded-t-2xl ctm-min-width-1 ${
                      subscriptionData.plan_title === "Starter"
                        ? "border-b-4 bg-[#6C5DD3] text-white"
                        : ""
                    }`}
                  >
                    <div className="font-bold">Starter</div>
                    <div>
                      <span className="text-[30px] font-bold "> ₱1499</span>
                      <small>/mo</small>
                    </div>
                    <div
                      className={`inline-block border border-1 border-[#6C5DD3] cursor-pointer text-sm rounded-md w-[70%] py-1 mt-3 mb-1 ${
                        subscriptionData.plan_title === "Starter"
                          ? " bg-white text-[#6C5DD3]"
                          : "bg-[#6C5DD3] text-white "
                      }`}
                    >
                      {subscriptionData.plan_title === "Starter" ? (
                        <span
                          onClick={(e) => requestPayment(e, 1499, "Starter")}
                        >
                          Renew Plan
                        </span>
                      ) : (
                        "Change Plan"
                      )}
                    </div>
                    <small className="block text-red-500">
                      {subscriptionData.plan_title === "Starter" ? (
                        <span className="text-green-300">{`${dateLeft.toFixed(
                          0
                        )} days before renewal`}</span>
                      ) : (
                        <span>&nbsp;</span>
                      )}
                    </small>
                  </td>
                  <td
                    className={`rounded-t-2xl ctm-min-width-1 ${
                      subscriptionData.plan_title === "Growth"
                        ? "border-b-4 bg-[#6C5DD3] text-white"
                        : ""
                    }`}
                  >
                    {" "}
                    <div className="font-bold">Growth</div>
                    <div>
                      <span className="text-[30px] font-bold"> ₱2699</span>
                      <small>/mo</small>
                    </div>
                    <div
                      className={`inline-block border border-1 border-[#6C5DD3] cursor-pointer text-sm rounded-md w-[70%] py-1 mt-3 mb-1 ${
                        subscriptionData.plan_title === "Growth"
                          ? " bg-white text-[#6C5DD3]"
                          : "bg-[#6C5DD3] text-white "
                      }`}
                    >
                      {subscriptionData.plan_title === "Growth"
                        ? "Your Plan"
                        : "Change Plan"}
                    </div>
                    <small className="block text-red-500">
                      {" "}
                      {subscriptionData.plan_title === "Growth" ? (
                        <span className="text-green-300">{`${dateLeft} days before renewal`}</span>
                      ) : (
                        <span>&nbsp;</span>
                      )}
                    </small>
                  </td>
                  <td
                    className={`rounded-t-2xl ctm-min-width-1 ${
                      subscriptionData.plan_title === "Beyond"
                        ? "border-b-4 bg-[#6C5DD3] text-white"
                        : ""
                    }`}
                  >
                    <div className="font-bold">Beyond</div>
                    <div>
                      <span className="text-[30px] font-bold"> ₱4299</span>
                      <small>/mo</small>
                    </div>
                    <div
                      className={`inline-block border border-1 border-[#6C5DD3] cursor-pointer text-sm rounded-md w-[70%] py-1 mt-3 mb-1 ${
                        subscriptionData.plan_title === "Beyond"
                          ? " bg-white text-[#6C5DD3]"
                          : "bg-[#6C5DD3] text-white "
                      }`}
                    >
                      {subscriptionData.plan_title === "Beyond"
                        ? "Your Plan"
                        : "Change Plan"}
                    </div>
                    <small className="block text-red-500">
                      {" "}
                      {subscriptionData.plan_title === "Beyond" ? (
                        <span className="text-green-300">{`${dateLeft.toFixed(
                          0
                        )} days before renewal`}</span>
                      ) : (
                        <span>&nbsp;</span>
                      )}
                    </small>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="text-left">
                      Number of <br></br> Active Campaigns
                    </p>
                  </td>
                  <td
                    className={`${
                      subscriptionData.plan_title === "Starter"
                        ? "bg-[#6C5DD3] text-white"
                        : ""
                    }`}
                  >
                    {subscriptionData.plan_title === "Starter"
                      ? `${subscriptionData.plan_active_campaigns}`
                      : "3"}
                    <br></br>
                    {subscriptionData.plan_title === "Starter" ? (
                      <small className="text-green-300">
                        {subscriptionData.plan_active_campaigns -
                          subscriptionData.plan_current_active_campaigns}{" "}
                        left
                      </small>
                    ) : (
                      <small>&nbsp;</small>
                    )}
                  </td>
                  <td
                    className={`${
                      subscriptionData.plan_title === "Growth"
                        ? "bg-[#6C5DD3] text-white"
                        : ""
                    }`}
                  >
                    {subscriptionData.plan_title === "Growth"
                      ? `${subscriptionData.plan_active_campaigns}`
                      : "7"}
                    <br></br>
                    {subscriptionData.plan_title === "Growth" ? (
                      <small className="text-green-300">
                        {subscriptionData.plan_active_campaigns -
                          subscriptionData.plan_current_active_campaigns}{" "}
                        left
                      </small>
                    ) : (
                      <small>&nbsp;</small>
                    )}
                  </td>
                  <td
                    className={`${
                      subscriptionData.plan_title === "Beyond"
                        ? "bg-[#6C5DD3] text-white"
                        : ""
                    }`}
                  >
                    {subscriptionData.plan_title === "Beyond"
                      ? `${subscriptionData.plan_active_campaigns}`
                      : "15"}
                    <br></br>
                    {subscriptionData.plan_title === "Beyond" ? (
                      <small className="text-green-300">
                        {subscriptionData.plan_active_campaigns -
                          subscriptionData.plan_current_active_campaigns}{" "}
                        left
                      </small>
                    ) : (
                      <small>&nbsp;</small>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="text-left">
                      Number of <br></br> Creator Boxes
                    </p>
                  </td>
                  <td
                    className={`${
                      subscriptionData.plan_title === "Starter"
                        ? "bg-[#6C5DD3] text-white"
                        : ""
                    }`}
                  >
                    {subscriptionData.plan_title === "Starter"
                      ? `${subscriptionData.plan_active_boxes}`
                      : "5"}{" "}
                    <br></br>
                    {subscriptionData.plan_title === "Starter" ? (
                      <small className="text-green-300">
                        {subscriptionData.plan_active_boxes -
                          subscriptionData.plan_current_active_boxes}{" "}
                        left
                      </small>
                    ) : (
                      <small>&nbsp;</small>
                    )}
                  </td>
                  <td
                    className={`${
                      subscriptionData.plan_title === "Growth"
                        ? "bg-[#6C5DD3] text-white"
                        : ""
                    }`}
                  >
                    {subscriptionData.plan_title === "Growth"
                      ? `${subscriptionData.plan_active_boxes}`
                      : "15"}
                    <br></br>
                    {subscriptionData.plan_title === "Growth" ? (
                      <small className="text-green-300">
                        {subscriptionData.plan_active_boxes -
                          subscriptionData.plan_current_active_boxes}{" "}
                        left
                      </small>
                    ) : (
                      <small>&nbsp;</small>
                    )}
                  </td>
                  <td
                    className={`${
                      subscriptionData.plan_title === "Beyond"
                        ? "bg-[#6C5DD3] text-white"
                        : ""
                    }`}
                  >
                    {subscriptionData.plan_title === "Beyond"
                      ? `${subscriptionData.plan_active_boxes}`
                      : "25"}
                    <br></br>
                    {subscriptionData.plan_title === "Beyond" ? (
                      <small className="text-green-300">
                        {subscriptionData.plan_active_boxes -
                          subscriptionData.plan_current_active_boxes}{" "}
                        left
                      </small>
                    ) : (
                      <small>&nbsp;</small>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="text-left">
                      Unlimited Access to <br></br>Partner Creators
                    </p>
                  </td>
                  <td
                    className={`${
                      subscriptionData.plan_title === "Starter"
                        ? "bg-[#6C5DD3] text-white"
                        : ""
                    }`}
                  >
                    &#10004;
                  </td>
                  <td
                    className={`${
                      subscriptionData.plan_title === "Growth"
                        ? "bg-[#6C5DD3] text-white"
                        : ""
                    }`}
                  >
                    &#10004;
                  </td>
                  <td
                    className={`${
                      subscriptionData.plan_title === "Beyond"
                        ? "bg-[#6C5DD3] text-white"
                        : ""
                    }`}
                  >
                    &#10004;
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="text-left">Tiktok Integration</p>
                  </td>
                  <td
                    className={`${
                      subscriptionData.plan_title === "Starter"
                        ? "bg-[#6C5DD3] text-white"
                        : ""
                    }`}
                  >
                    {" "}
                    &#10004;
                  </td>
                  <td
                    className={`${
                      subscriptionData.plan_title === "Growth"
                        ? "bg-[#6C5DD3] text-white"
                        : ""
                    }`}
                  >
                    &#10004;
                  </td>
                  <td
                    className={`${
                      subscriptionData.plan_title === "Beyond"
                        ? "bg-[#6C5DD3] text-white"
                        : ""
                    }`}
                  >
                    &#10004;
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="text-left">
                      Instagram Integration <br></br>
                      <small>Coming Soon!</small>
                    </p>
                  </td>
                  <td
                    className={`${
                      subscriptionData.plan_title === "Starter"
                        ? "bg-[#6C5DD3] text-white rounded-b-2xl"
                        : ""
                    }`}
                  ></td>
                  <td
                    className={`${
                      subscriptionData.plan_title === "Growth"
                        ? "bg-[#6C5DD3] text-white rounded-b-2xl"
                        : ""
                    }`}
                  >
                    &#10004;
                  </td>
                  <td
                    className={`${
                      subscriptionData.plan_title === "Beyond"
                        ? "bg-[#6C5DD3] text-white rounded-b-2xl"
                        : ""
                    }`}
                  >
                    &#10004;
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
      <p className="text-center my-10">
        *Want to reach out to more people per month? Contact us today for a
        Custom Plan!
      </p>
    </div>
  );
}

export default InfoCardBrandPlan;
