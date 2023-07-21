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
  const [linkBack] = useState(type === "brand" ? "/" : "/affiliate");

  const handleLink = (e, link) => {
    navigate(link);
  };

  return (
    <div className="relative">
      {/* Top Navigation bar */}
      <div className="sticky p-0 top-0 xl:relative justify-between ctm-bg-color-7 w-full xl:p-4 flex xl:justify-evenly z-10">
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
          BrandAffy Privacy Policy
        </h1>
        <div className="mx-auto max-w-7xl space-y-4 my-24 text-base">
          <p>
            <strong>Effective Date:</strong> July 15, 2023
          </p>
          <p>
            Thank you for choosing BrandAffy ("we," "our," or "us"). This
            Privacy Policy explains how we collect, use, disclose, and safeguard
            your personal information when you access and use our website
            http://brandaffy.com/ (the "Site") and its services (the
            "Services").
          </p>
          <p>
            By accessing or using the Site and Services, you consent to the
            practices described in this Privacy Policy. If you do not agree with
            the terms of this Privacy Policy, please refrain from using our Site
            and Services.
          </p>
          <h2 className="font-bold">1. Information We Collect</h2>
          <p>
            1.1. Personal Information: When you create an account on BrandAffy,
            we may collect certain personal information, such as your name,
            email address, and billing information.
          </p>
          <p>
            1.2. User-Generated Content (UGC): As a subscription-based SAAS tool
            meant to connect Brands to User-Generated Content (UGC), we collect
            and process the UGCs you post on the Site.
          </p>
          <p>
            1.3. Automatically Collected Information: We may automatically
            collect certain information about your device and usage of the Site,
            such as your IP address, browser type, operating system, and pages
            visited. This information is used for analytical purposes and to
            improve the functionality of our Services.
          </p>
          <h2 className="font-bold">2. Use of Information</h2>
          <p>2.1. We use the collected information to:</p>
          <p>
            a. Provide and maintain the Services;<br></br>
            b. Process and manage your subscriptions;<br></br>
            c. Facilitate the connection between Brands and UGCs;<br></br>
            d. Respond to your inquiries and provide customer support;<br></br>
            e. Send you updates, newsletters, and promotional materials;
            <br></br>
            f. Improve the quality and performance of our Site and Services;
            <br></br>
            g. Enforce our Terms of Service and other applicable policies.
            <br></br>
          </p>
          <h2 className="font-bold">3. Sharing of Information</h2>
          <p>
            3.1. We may share your personal information and UGCs with the
            following parties:
          </p>{" "}
          <p>
            a. Brands: We share UGCs with Brands seeking to connect with
            user-generated content for their marketing and promotional
            activities.<br></br>
            b. Service Providers: We may engage third-party service providers to
            assist with our operations and Services, such as payment processing
            and analytics. These providers are contractually obligated to
            safeguard your information and are not allowed to use it for any
            other purpose.<br></br>
            c. Legal Compliance: We may disclose your information when required
            by law, court order, or government request.<br></br>
          </p>
          <h2 className="font-bold">4. Data Retention</h2>
          <p>
            4.1. We retain your personal information and UGCs for as long as
            necessary to fulfill the purposes outlined in this Privacy Policy,
            or as required by applicable laws and regulations.
          </p>
          <h2 className="font-bold">5. Security</h2>
          <p>
            5.1. We take reasonable measures to protect your information from
            unauthorized access, disclosure, alteration, or destruction.
            However, please be aware that no method of transmission over the
            internet or electronic storage is 100% secure, and we cannot
            guarantee absolute security.
          </p>
          <h2 className="font-bold">6. Third-Party Links</h2>
          <p>
            6.1. Our Site may contain links to third-party websites. We are not
            responsible for the privacy practices or content of these websites.
            We encourage you to review the privacy policies of any third-party
            sites you visit.
          </p>
          <h2 className="font-bold">7. Children's Privacy</h2>
          <p>
            7.1. BrandAffy's Site and Services are not intended for individuals
            under the age of [Insert Minimum Age]. We do not knowingly collect
            personal information from minors. If you are a parent or guardian
            and believe your child has provided us with personal information,
            please contact us immediately.
          </p>
          <h2 className="font-bold">8. Changes to the Privacy Policy</h2>
          <p>
            8.1. We may update this Privacy Policy from time to time. Any
            changes will be effective upon posting the revised Privacy Policy on
            the Site. Your continued use of the Services following the posting
            of changes constitutes your acceptance of such changes.
          </p>
          <h2 className="font-bold">9. Contact Us</h2>
          <p>
            9.1. If you have any questions or concerns about this Privacy Policy
            or our data practices, please contact us at{" "}
            <span className="font-bold">
              <a href="mailto:jonas.lemuel.datu@eee.upd.edu.ph">
                jonas.lemuel.datu@eee.upd.edu.ph
              </a>
            </span>
            .
          </p>
        </div>
        <div className="text-center mb-16">
          Thank you for choosing BrandAffy.
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
                <div onClick={(e) => handleLink(e, `/affiliate`)}>
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
                <div onClick={(e) => handleLink(e, `/brand/pages/terms`)}>
                  Terms of Service
                </div>
              </li>
              <li className="my-4 hover:underline cursor-pointer">
                Privacy Policy
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
