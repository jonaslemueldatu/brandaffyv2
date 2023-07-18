// Libraries
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Brandlandingpage() {
  // Assets
  const [brandlogo] = useState(
    "https://brandaffy.s3.ap-southeast-2.amazonaws.com/website+assets/Brandaffy+Logo.png"
  );
  const [purpleCurvedDesign] = useState(
    "https://brandaffy.s3.ap-southeast-2.amazonaws.com/website+assets/design-purple-bottom-curve.svg"
  );

  // State to handle display of Mobile Menu
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="relative">
      {/* Top Naigation Bar */}
      <div className="justify-between ctm-bg-color-7 w-full p-4 flex xl:justify-evenly">
        <img alt="Brandaffy logo" src={brandlogo} className="h-28 w-28"></img>
        <div className="hidden xl:flex">
          <ul className="flex items-center">
            <li className="mx-5 font-semibold hover:underline cursor-pointer">
              What is Brandaffy
            </li>
            <li className="mx-5 font-semibold hover:underline cursor-pointer">
              How it Works
            </li>
            <li className="mx-5 font-semibold hover:underline cursor-pointer">
              Features
            </li>
            <li className="mx-5 font-semibold hover:underline cursor-pointer">
              Why We
            </li>
            <li className="mx-5 font-semibold hover:underline cursor-pointer">
              Pricing
            </li>
            <li className="mx-5 font-semibold hover:underline cursor-pointer">
              Upcoming Features
            </li>
            <li className="mx-5 font-semibold hover:underline cursor-pointer">
              {" "}
              UGC Creator Portal
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
          <Link
            to={"/brand/login"}
            className="mx-5 font-bold cursor-pointer text-lg  hover:underline"
          >
            Login
          </Link>
          <button className="shadow-lg ctm-bg-color-8 text-white ctm-btn text-lg">
            Sign Up
          </button>
        </div>
      </div>
      {/* Hero Section */}
      <div className="flex-col lg:flex-row ctm-bg-color-7 w-full flex">
        <div className="p-8 lg:p-20 xl:p-28 flex-1">
          <h1 className="font-extrabold leading-none text-5xl">
            Connect With Hundreds Of Creators In Less Than 30 Minutes
          </h1>
          <p className="my-10 text-lg ctm-font-color-6">
            Connect at scale with thousands of active UGC creators, influencers,
            affiliates for your marketing campaigns.
          </p>
          <Link
            to={"/brand/register"}
            className="shadow-lg ctm-bg-color-8 text-white ctm-btn text-lg my-4 w-fit"
          >
            Start Your UGC Campaign Today
          </Link>
        </div>
        <div className="flex-1"></div>
      </div>
      <img alt="Purple Curved Design Separator" src={purpleCurvedDesign}></img>
      {/* What is Brandaffy Section */}
      <div className="p-8 lg:p-20 xl:p-28 max-w-6xl m-auto">
        <h2 className="text-center font-extrabold leading-none text-6xl">
          Discover, Curate, And Amplify<br></br> Authentic Content With Ease
        </h2>
        <div className="flex flex-col-reverse md:flex-row py-8">
          <img alt="placeholder" src={brandlogo} className="flex-1 m-4"></img>
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-2xl font-extrabold">
              Unlock the Potential of UGC
            </h2>
            <p className="my-10 text-lg ctm-font-color-6">
              Are you tired of searching high and low for captivating content
              that resonates with your target audience? Brandaffy empowers
              brands like yours to effortlessly find, collect, and leverage UGC
              that reflects the genuine experiences of your customers.
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row-reverse py-8">
          <img alt="placeholder" src={brandlogo} className="flex-1 m-4"></img>
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-2xl font-extrabold">
              Effortless Campaign Creation
            </h2>
            <p className="my-10 text-lg ctm-font-color-6">
              Say goodbye to complex campaign planning. With Brandaffy, creating
              compelling UGC campaigns is a breeze. Our intuitive campaign
              creation platform enables you to define your goals, set campaign
              parameters, and establish guidelines, all in one centralized hub.
              Unleash your creativity, set the rules, and watch as the UGC
              starts pouring in.
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row py-8">
          <img alt="placeholder" src={brandlogo} className="flex-1 m-4"></img>
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-2xl font-extrabold">
              Seamless Influencer Connections
            </h2>
            <p className="my-10 text-lg ctm-font-color-6">
              Our comprehensive influencer database allows you to seamlessly
              connect and collaborate with top-tier influencers. From
              micro-influencers to industry experts, build lasting partnerships
              that ignite brand advocacy and unlock new levels of growth.
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row-reverse py-8">
          <img alt="placeholder" src={brandlogo} className="flex-1 m-4"></img>
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-2xl font-extrabold">
              Elevate Your Strategy with Influencer Boxes
            </h2>
            <p className="my-10 text-lg ctm-font-color-6">
              Stay ahead of the competition by creating customized influencer
              groups on Brandaffy. Harness the power of targeted
              influencer communities to amplify your campaigns and drive
              exceptional results. Assign specific campaigns to dedicated
              influencer groups and maximize the impact of your UGC initiatives.
              Get ready to witness exponential growth fueled by the collective
              power of your influencers.
            </p>
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
              <li className="font-semibold hover:underline">
                What is Brandaffy
              </li>
              <li className="font-semibold hover:underline">How it Works</li>
              <li className="font-semibold hover:underline">Features</li>
              <li className="font-semibold hover:underline">Why We</li>
              <li className="font-semibold hover:underline">Pricing</li>
              <li className="font-semibold hover:underline">
                Upcoming Features
              </li>
              <li className="font-semibold hover:underline">
                UGC Creator Portal
              </li>
            </ul>
            <div className="flex flex-col">
              <Link
                to={"/brand/login"}
                className="font-bold mx-auto  hover:underline"
              >
                Login &#x28;Brands&#x29;
              </Link>
              <Link
                to={"brand/register"}
                className="shadow-lg ctm-bg-color-8 text-white ctm-btn text-lg my-4"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Brandlandingpage;
