//TEst

import React, { useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function InfoCardPaymentMethod() {
  const createPaymentMethod2 = async () => {
    let apiKey =
      "xnd_development_NZvxlmIGcBTUDPt65l4IJlj6ZosrwEISS3chz4eS2KXXNojRnIiRTxGMyq47ll:";
    const reqBody = {
      type: "EWALLET",
      reusability: "MULTIPLE_USE",
      reference_id: "123456",
      customer_id: "cust-a551556b-d905-4067-a8b1-f69c18f8eb70",
      country: "PH",
      ewallet: {
        channel_code: "PAYMAYA",
        channel_properties: {
          success_return_url:
            "http://brandaffy.com/dashboard/settings?subsettings=Payment",
          failure_return_url:
            "https://brandaffy.com/dashboard/settings?subsettings=Payment",
          cancel_return_url:
            "https://brandaffy.com/dashboard/settings?subsettings=Payment",
        },
      },
    };
    const result = await axios.post(
      `https://api.xendit.co/v2/payment_methods`,
      reqBody,
      {
        headers: {
          Authorization: `Basic ${btoa(apiKey + ":")}`,
          "Content-Type": "application/json",
        },
      }
    );
    // const result2 = await axios.get(
    //   `${process.env.REACT_APP_ROUTE}/api/subscription/payment/createmethod`,
    //   {
    //     params: {
    //       link: result.data.actions[0].url,
    //     },
    //   }
    // );
    window.location.replace(result.data.actions[0].url);
  };

  // console.log(result2.data);

  // const createPaymentMethod2 = async () = {
  // const reqBody = JSON.stringify({
  //   type: "EWALLET",
  //   reusability: "MULTIPLE_USE",
  //   ewallet: {
  //     channel_code: "OVO",
  //     channel_properties: {
  //       success_return_url: "https://your-redirect-website.com/success",
  //       failure_return_url: "https://your-redirect-website.com/failure",
  //     },
  //   },
  //   customer_id: "cust-a551556b-d905-4067-a8b1-f69c18f8eb70",
  //   metadata: {
  //     sku: "ABCDEFGH",
  //   },
  // });

  // const result = await axios.post(
  //   `https://api.xendit.co/v2/payment_methods`,
  //   reqBody
  // );
  //     }
  return (
    <div className="flex flex-col w-full bg-white shadow-lg rounded-2xl mb-4">
      <div
        className="text-2xl p-6 border-b-2 ctm-border-color-1 font-semibold mb-2"
        onClick={() => createPaymentMethod2()}
      >
        Payment Method
      </div>
      <div className="mx-[5%] py-5 overflow-scroll"></div>
      <div onClick={() => createPaymentMethod2()}>Hi</div>
    </div>
  );
}

export default InfoCardPaymentMethod;
