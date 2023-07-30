//Props
//PaymentMethods - list of paymentmethdos linked
//CustomId - xendit customer Id
//ReferenceId - Subscription mongoose string ID

import React, { useState } from "react";
import axios from "axios";

function PaymentPaymaya(props) {
  //Assts
  const mayaLogo =
    "https://brandaffy.s3.ap-southeast-2.amazonaws.com/website+assets/Maya_logo.png";

  //Main snippet states
  const [paymaya] = useState(props.PaymentMethods.indexOf("PAYMAYA") >= 0);

  //Functions
  const handleLink = async (e) => {
    const res = await axios.post(
      `${process.env.REACT_APP_ROUTE}/api/subscription/createmethod`,
      {
        payment_type: "PAYMAYA",
        reference_id: props.ReferenceId,
        customer_id: props.CustomerId,
      }
    );
    if (res.data.err) {
      console.log(res.data.err);
    } else {
      window.location.replace(res.data.actionLink);
    }
  };

  const handleUnLink = async (e) => {
    const res = await axios.post(
      `${process.env.REACT_APP_ROUTE}/api/subscription/createmethod`,
      {
        payment_type: "EXPIRE",
        payment_id: props.PaymentId.id,
        reference_id: props.ReferenceId,
      }
    );
    if (res.data.err) {
      console.log(res.data.err);
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex h-8 justify-between">
      <img alt="Paymaya icon" src={mayaLogo}></img>
      {paymaya ? (
        <div className="ctm-btn ctm-btn-2" onClick={(e) => handleUnLink(e)}>
          Unlink
        </div>
      ) : (
        <div className="ctm-btn ctm-btn-3" onClick={(e) => handleLink(e)}>
          Link
        </div>
      )}
    </div>
  );
}

export default PaymentPaymaya;
