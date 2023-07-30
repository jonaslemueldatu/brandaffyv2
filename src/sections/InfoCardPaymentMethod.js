//TEst

import React, { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//Snippet Imports
import PaymentPaymaya from "../snippets/PaymentPaymaya";

function InfoCardPaymentMethod() {
  const auth = useAuthUser();
  const navigate = useNavigate();

  //Util States
  const [loggedInUser] = useState(auth().id);
  const [loggedInUserType] = useState(auth().user_type);

  //Main section state
  const [subscriptionData, setSubscriptionData] = useState({});

  //UseEfect states
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
        setSubscriptionData(res.data.subscription_data);
        setIsGettingPlanData(false);
      }
    };
    getSubscriptionDetails();
  }, [loggedInUser, loggedInUserType, navigate]);

  return (
    <div className="flex flex-col w-full bg-white shadow-lg rounded-2xl mb-4">
      <div className="text-2xl p-6 border-b-2 ctm-border-color-1 font-semibold mb-2">
        Payment Method
      </div>
      <div className="mx-[5%] py-5 overflow-scroll">
        <ul>
          {!isGettingPlanData && (
            <li>
              <PaymentPaymaya
                PaymentMethods={subscriptionData.plan_payment_methods}
                CustomerId={subscriptionData.xendit_reference_id}
                ReferenceId={subscriptionData._id.toString()}
                PaymentId={subscriptionData.plan_payment_methods_object.find(
                  (method) => method.ewallet.channel_code === "PAYMAYA"
                )}
              />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default InfoCardPaymentMethod;
