import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function TermsOfService() {
  const navigate = useNavigate();

  const [brandlogo] = useState(
    "https://brandaffy.s3.ap-southeast-2.amazonaws.com/website+assets/Brandaffy+Logo.png"
  );
  const [purpleBottomCurvedDesign] = useState(
    "https://brandaffy.s3.ap-southeast-2.amazonaws.com/website+assets/design-purple-bottom-curve.svg"
  );

  const [blueBottomCurvedDesign] = useState(
    "https://brandaffy.s3.ap-southeast-2.amazonaws.com/website+assets/design-curve-top.svg"
  );

  const [mobileMenu, setMobileMenu] = useState(false);
  const { type } = useParams();
  const [linkBack] = useState(type === "brand" ? "/" : "/creator");

  const handleLink = (e, link) => {
    navigate(link);
  };

  return (
    <div className="relative">
      {/* Top Navigation bar */}
      <div className="sticky p-0  top-0 xl:relative justify-between ctm-bg-color-7 w-full xl:p-4 flex xl:justify-evenly z-10">
        <div onClick={(e) => handleLink(e, linkBack)}>
          <img
            alt="Brandaffy logo"
            src={brandlogo}
            className="h-28 w-28 cursor-pointer"
          ></img>
        </div>
        <div className="hidden xl:flex">
          <ul className="flex items-center">
            <li className="mx-5 font-semibold hover:underline cursor-pointer">
              <a href={linkBack}> What is Brandaffy</a>
            </li>
            <li className="mx-5 font-semibold hover:underline cursor-pointer">
              <a href={linkBack}>Features</a>
            </li>
            {/* <li className="mx-5 font-semibold hover:underline cursor-pointer">
              How it Works
            </li> */}
            {/* <li className="mx-5 font-semibold hover:underline cursor-pointer">
              Why We
            </li> */}
            <li className="mx-5 font-semibold hover:underline cursor-pointer">
              <a href={linkBack}>Pricing</a>
            </li>
            {/* <li className="mx-5 font-semibold hover:underline cursor-pointer">
              Upcoming Features
            </li> */}
            <li className="mx-5 font-semibold hover:underline cursor-pointer">
              {" "}
              <div onClick={(e) => handleLink(e, linkBack)}>
                UGC Creator Portal
              </div>
            </li>
          </ul>
        </div>
        <div
          className="flex xl:hidden items-center px-4 cursor-pointer"
          // Toggle mobile Menu on Click
          onClick={() => setMobileMenu(true)}
        >
          <FontAwesomeIcon icon={faBars} className="text-4xl" />
        </div>
        <div className="hidden xl:flex items-center">
          <div
            onClick={(e) => handleLink(e, `/${type}/login`)}
            className="mx-5 font-bold cursor-pointer text-lg  hover:underline"
          >
            Login
          </div>
          <div
            onClick={(e) => handleLink(e, `/${type}/register`)}
            className="shadow-lg ctm-bg-1 text-white ctm-btn text-lg"
          >
            Sign Up
          </div>
        </div>
      </div>
      <img
        className="w-screen"
        alt="Purple Curved Design Separator"
        src={purpleBottomCurvedDesign}
      ></img>
      {/* Page content */}

      <div>
        <h1 className="text-center font-extrabold leading-none text-5xl mt-16">
          BrandAffy Terms of Service
        </h1>
        <div className="mx-auto max-w-7xl space-y-4 my-24 text-base">
          <p>
            <strong>Effective Date:</strong> July 15, 2023
          </p>
          <p>
            Welcome to BrandAffy ("we," "our," or "us"). BrandAffy is a
            subscription-based Software-as-a-Service (SAAS) tool designed to
            connect brands ("Brand(s)") with user-generated content ("UGC(s)").
            By accessing and using the website http://brandaffy.com/ (the
            "Site") and its services (the "Services"), you agree to be bound by
            these Terms of Service ("Terms") and any additional terms and
            conditions referenced herein. Please read these Terms carefully
            before using our Services.
          </p>
          <h2 className="font-bold">1. Acceptance of Terms</h2>
          <p>
            1.1. By accessing or using the Site and Services, you acknowledge
            that you have read, understood, and agree to be bound by these
            Terms. If you do not agree with any part of these Terms, you may not
            access or use the Site or Services.
          </p>
          <p>
            1.2. These Terms, along with our Privacy Policy, govern your use of
            BrandAffy's Site and Services. Please review our Privacy Policy to
            understand our practices concerning your privacy.
          </p>
          <h2 className="font-bold">2. Account Registration</h2>
          <p>
            2.1. To use our Services, you must create an account ("Account") on
            BrandAffy. You agree to provide accurate, complete, and current
            information during the registration process and to keep your Account
            information updated.
          </p>
          <p>
            2.2. You are solely responsible for safeguarding your Account
            credentials and are liable for all activities performed under your
            Account. Notify us immediately of any unauthorized use or suspected
            breach of security.
          </p>
          <h2 className="font-bold">3. Subscription and Billing</h2>
          <p>
            {" "}
            3.1. BrandAffy offers subscription plans with varying features and
            durations. By subscribing to our Services, you agree to pay the
            applicable fees associated with your selected plan.
          </p>{" "}
          <p>
            3.2. Payment is due in advance for the chosen billing cycle. Failure
            to make timely payments may result in suspension or termination of
            your Account.{" "}
          </p>
          <p>
            3.3. All fees are non-refundable, and we do not provide refunds or
            credits for partial subscription periods.{" "}
          </p>
          <h2 className="font-bold">4. Use of Services</h2>
          <p>
            {" "}
            4.1. BrandAffy grants you a non-exclusive, non-transferable, and
            revocable license to access and use the Services for your internal
            business purposes only.
          </p>{" "}
          <p>4.2. You agree not to:</p>
          <p>
            a. Modify, copy, reproduce, distribute, or create derivative works
            based on the Site or Services;<br></br>
            b. Reverse engineer, decompile, or disassemble any portion of the
            Site or Services;<br></br>
            c. Use the Site or Services for any unlawful or unauthorized
            purpose;<br></br>
            d. Engage in any activity that interferes with or disrupts the
            integrity or performance of the Site or Services;<br></br>
            e. Upload or transmit any harmful, infringing, or otherwise
            objectionable content;<br></br>
            f. Use automated tools or software to access the Site or Services
            without our express written consent;<br></br>
            g. Violate any applicable laws, regulations, or third-party rights.
          </p>
          <h2 className="font-bold">5. User-Generated Content</h2>
          <p>
            {" "}
            5.1. BrandAffy facilitates the connection between Brands and UGCs.
            However, we do not endorse, guarantee the accuracy of, or assume any
            responsibility for the UGCs posted by users.
          </p>
          <p>
            5.2. By using the Services, you grant BrandAffy a worldwide,
            royalty-free, non-exclusive license to use, reproduce, modify,
            distribute, and display UGCs solely for the purpose of providing the
            Services.
          </p>
          <p>
            5.3. You represent and warrant that you have the necessary rights,
            permissions, and consents to post UGCs on the Site and to grant the
            license specified in Section 5.2.
          </p>
          <h2 className="font-bold">6. Intellectual Property Rights</h2>
          <p>
            {" "}
            6.1. BrandAffy and its licensors own all rights, title, and interest
            in the Site and Services, including all intellectual property
            rights. You may not use our trademarks, logos, or copyrighted
            material without our prior written consent.
          </p>
          <h2 className="font-bold">7. Termination</h2>
          <p>
            7.1. You may terminate your Account at any time by following the
            instructions on the Site. Upon termination, your access to the
            Services will cease.
          </p>{" "}
          <p>
            7.2. We reserve the right to suspend or terminate your Account and
            access to the Services at our sole discretion, with or without
            cause.
          </p>
          <h2 className="font-bold">8. Disclaimer of Warranties</h2>
          <p>
            8.1. The Site and Services are provided "as is" and "as available,"
            without warranties of any kind, either express or implied. We do not
            warrant that the Services will be uninterrupted, error-free, or
            secure.
          </p>{" "}
          <h2 className="font-bold">9. Limitation of Liability</h2>
          <p>
            9.1. To the maximum extent permitted by law, BrandAffy and its
            affiliates, directors, officers, employees, and agents shall not be
            liable for any direct, indirect, incidental, special, or
            consequential damages arising out of or related to the use or
            inability to use the Services.
          </p>
          <h2 className="font-bold">10. Modifications to the Terms</h2>
          <p>
            10.1. We reserve the right to update or modify these Terms from time
            to time. Any changes will be effective upon posting the revised
            Terms on the Site. Your continued use of the Services following the
            posting of changes constitutes your acceptance of such changes.
          </p>
          <h2 className="font-bold">
            11. Governing Law and Dispute Resolution
          </h2>
          <p>
            11.1. These Terms shall be governed by and construed in accordance
            with the laws of the country of Philippines, without regard to its
            conflict of laws principles.
          </p>
          <p>
            11.2. Any dispute arising out of or relating to these Terms or the
            Services shall be subject to the exclusive jurisdiction of the
            courts located in the country of Philippines.
          </p>
        </div>
        <div className="text-center mb-16">
          Thank you for choosing BrandAffy. If you have any questions or
          concerns regarding these Terms or our Services, please contact us at{" "}
          <span className="font-bold">
            <a href="mailto:jonas.lemuel.datu@eee.upd.edu.ph">
              jonas.lemuel.datu@eee.upd.edu.ph
            </a>
          </span>
        </div>
      </div>

      {/* Tag Phrase */}
      <img
        className="w-screen"
        alt="Purple Curved Design Separator"
        src={blueBottomCurvedDesign}
      ></img>
      <div id="features" className="ctm-bg-color-11">
        <div className="p-8 lg:p-20 xl:px-24 xl:py-10 max-w-7xl m-auto flex flex-col items-center">
          <h2 className="text-center font-extrabold leading-none text-5xl text-white">
            Try Brandaffy today
          </h2>
          <p className="my-8 text-lg text-white text-center">
            Join Brandaffy today and enjoy your 1 MONTH FREE TRIAL while having
            complete access to all existing and upcoming features.
          </p>
          <div
            onClick={(e) => handleLink(e, `/${type}/register`)}
            className="shadow-lg bg-indigo-100 text-indigo-700 ctm-btn text-lg my-4 w-fit"
          >
            Sign Up Today
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-10 sm:p-18 flex flex-col sm:flex-row bg-white justify-evenly">
        <div>
          <img alt="Brandaffy logo" src={brandlogo} className="h-28 w-28"></img>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="sm:mx-10">
            <h3 className="my-4 font-bold">Product</h3>
            <ul className="">
              <li className="my-4 hover:underline cursor-pointer">
                <a href={"/#what-is-brandaffy"}> What is Brandaffy</a>
              </li>
              <li className="my-4 hover:underline cursor-pointer">
                <a href={"/#features"}>Features</a>
              </li>
              {/* <li className="my-4 hover:underline cursor-pointer">
                How it Works
              </li> */}
              {/* <li className="mx-5 font-semibold hover:underline cursor-pointer">
              Why We
            </li> */}
              <li className="my-4 hover:underline cursor-pointer">
                {" "}
                <a href={"/#pricing"}>Pricing</a>
              </li>
              {/* <li className="mx-5 font-semibold hover:underline cursor-pointer">
              Upcoming Features
            </li> */}
              <li className="my-4 hover:underline cursor-pointer">
                {" "}
                <div onClick={(e) => handleLink(e, `/creator`)}>
                  UGC Creator Portal
                </div>
              </li>
            </ul>
          </div>
          <div className="sm:mx-10">
            <h3 className="my-4 font-bold">Support</h3>
            <ul className="">
              <li className="my-4 hover:underline cursor-pointer">
                <a href={"mailto:jonas.lemuel.datu@eee.upd.edu.ph"}>
                  Contact Us
                </a>
              </li>
              <li className="my-4 hover:underline cursor-pointer">
                Terms of Service
              </li>
              <li className="my-4 hover:underline cursor-pointer">
                <div onClick={(e) => handleLink(e, `/${type}/pages/privacy`)}>
                  Privacy Policy
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Display component only when mobileMenu is set to true */}
      {mobileMenu && (
        <div
          className="fixed w-full h-full top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 cursor-pointer"
          // Hide mobile Menu on overlay click
          onClick={() => setMobileMenu(false)}
        >
          <div className="bg-white w-52 h-full flex-col px-4 py-4 border-r ctm-border-color-1">
            <img
              alt="Brandaffy logo"
              src={brandlogo}
              className="h-28 w-28 mx-auto"
            ></img>
            <ul className="flex flex-col gap-6 my-20">
              <a href={linkBack} className="font-semibold hover:underline">
                What is Brandaffy
              </a>
              <li className="font-semibold hover:underline">
                <a href={linkBack}>Features</a>
              </li>
              {/* <li className="font-semibold hover:underline">How it Works</li> */}
              {/* <li className="font-semibold hover:underline">Why We</li> */}
              <li className="font-semibold hover:underline">
                {" "}
                <a href={linkBack}>Pricing</a>
              </li>
              {/* <li className="font-semibold hover:underline">
                Upcoming Features
              </li> */}
              <li className="font-semibold hover:underline">
                <div onClick={(e) => handleLink(e, linkBack)}>
                  UGC Creator Portal
                </div>
              </li>
            </ul>
            <div className="flex flex-col">
              <div
                onClick={(e) => handleLink(e, `/${type}/login`)}
                className="font-bold mx-auto  hover:underline"
              >
                Login &#x28;Brands&#x29;
              </div>
              <div
                onClick={(e) => handleLink(e, `/${type}/register`)}
                className="shadow-lg ctm-bg-1 text-white ctm-btn text-lg my-4"
              >
                Sign Up
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TermsOfService;
