// Libraries
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function Brandlandingpage() {
  // Assets
  const [brandlogo] = useState(
    "https://brandaffy.s3.ap-southeast-2.amazonaws.com/website+assets/Brandaffy+Logo.png"
  );
  const [purpleBottomCurvedDesign] = useState(
    "https://brandaffy.s3.ap-southeast-2.amazonaws.com/website+assets/design-purple-bottom-curve.svg"
  );

  const [purpleTopCurvedDesign] = useState(
    "https://brandaffy.s3.ap-southeast-2.amazonaws.com/website+assets/design-purple-top-curve.svg"
  );

  const [creamTopCurvedDesign] = useState(
    "https://brandaffy.s3.ap-southeast-2.amazonaws.com/website+assets/design-cream-top-curve.svg"
  );

  const [blueBottomCurvedDesign] = useState(
    "https://brandaffy.s3.ap-southeast-2.amazonaws.com/website+assets/design-curve-top.svg"
  );

  const [heroImage] = useState(
    "https://brandaffy.s3.ap-southeast-2.amazonaws.com/website+assets/svg+images/2850942.jpg"
  );

  // State to handle display of Mobile Menu
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="relative">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 p-0 xl:relative justify-between ctm-bg-color-7 w-full xl:p-4 flex xl:justify-evenly">
        <img alt="Brandaffy logo" src={brandlogo} className="h-28 w-28"></img>
        <div className="hidden xl:flex">
          <ul className="flex items-center">
            <li className="mx-5 font-semibold hover:underline cursor-pointer">
              <a href={"/#what-is-brandaffy"}> What is Brandaffy</a>
            </li>
            <li className="mx-5 font-semibold hover:underline cursor-pointer">
              <a href={"/#features"}>Features</a>
            </li>
            {/* <li className="mx-5 font-semibold hover:underline cursor-pointer">
              How it Works
            </li> */}
            {/* <li className="mx-5 font-semibold hover:underline cursor-pointer">
              Why We
            </li> */}
            <li className="mx-5 font-semibold hover:underline cursor-pointer">
              <a href={"/#pricing"}>Pricing</a>
            </li>
            {/* <li className="mx-5 font-semibold hover:underline cursor-pointer">
              Upcoming Features
            </li> */}
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
            className="mx-5 font-semibold hover:underline text-lg underline cursor-pointer"
            to={"/creator"}
          >
            UGC Creator Portal
          </Link>

          <Link
            to={"/brand/login"}
            className="mx-5 font-bold cursor-pointer text-lg  hover:underline"
          >
            Login
          </Link>
          <Link
            to={"/brand/register"}
            className="shadow-lg ctm-bg-1 text-white ctm-btn text-lg"
          >
            Sign Up
          </Link>
        </div>
      </div>
      {/* Hero Section */}
      <div className="flex-col lg:flex-row ctm-bg-color-7 w-full flex">
        <div className="p-8 lg:p-20 xl:px-24 xl:pt-24 xl:pb-4 flex-1 flex flex-col justify-center">
          <h1 className="font-extrabold leading-none text-5xl">
            Connect With Hundreds Of Creators In Less Than 30 Minutes
          </h1>
          <p className="my-10 text-lg ctm-font-color-6">
            Connect at scale with thousands of active UGC creators, influencers,
            affiliates for your marketing campaigns.
          </p>
          <Link
            to={"/brand/register"}
            className="shadow-lg ctm-bg-1 text-white ctm-btn text-lg my-4 w-fit"
          >
            Start Your UGC Campaign Today
          </Link>
        </div>
        <div className="p-8 lg:p-20 xl:px-24 xl:pt-24 xl:pb-4 flex-1">
          <img
            alt="Hero social media"
            className="rounded-l"
            src={heroImage}
          ></img>
        </div>
      </div>
      <img
        className="w-screen"
        alt="Purple Curved Design Separator"
        src={purpleBottomCurvedDesign}
      ></img>
      {/* What is Brandaffy Section */}
      <div
        id="what-is-brandaffy"
        className="p-8 lg:p-20 xl:px-24 xl:py-10 max-w-6xl m-auto"
      >
        <h2 className="text-center font-extrabold leading-none text-5xl">
          Discover, Curate, And Amplify<br></br> Authentic Content With Ease
        </h2>
        <div className="flex flex-col-reverse md:flex-row py-8">
          <img alt="placeholder" src={brandlogo} className="flex-1 m-4"></img>
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-2xl font-extrabold">
              Unlock the Potential of UGC
            </h2>
            <p className="my-4 text-lg ctm-font-color-6">
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
            <p className="my-4 text-lg ctm-font-color-6">
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
            <p className="my-4 text-lg ctm-font-color-6">
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
            <p className="my-4 text-lg ctm-font-color-6">
              Stay ahead of the competition by creating customized influencer
              groups on Brandaffy. Harness the power of targeted influencer
              communities to amplify your campaigns and drive exceptional
              results. Assign specific campaigns to dedicated influencer groups
              and maximize the impact of your UGC initiatives. Get ready to
              witness exponential growth fueled by the collective power of your
              influencers.
            </p>
          </div>
        </div>
      </div>
      {/* Features */}
      <img
        className="w-screen"
        alt="Purple Curved Design Separator"
        src={purpleTopCurvedDesign}
      ></img>
      <div id="features" className="ctm-bg-color-9">
        <div className="p-8 lg:p-20 xl:px-24 xl:py-10 max-w-7xl m-auto flex flex-col items-center">
          <h2 className="text-center font-extrabold leading-none text-5xl">
            A Faster, Simpler UGC Management Tool
          </h2>
          <div className="grid justify-items-center">
            <dl className="mt-12 space-y-6 sm:grid sm:grid-cols-1 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-2 lg:gap-x-6">
              <div className="relative">
                <dt className="my-4 text-lg ctm-font-color-6">
                  <span className="font-bold">
                    Comprehensive UGC Discovery:
                  </span>
                  Effortlessly find compelling content that aligns with your
                  brand's voice and values.
                </dt>
              </div>
              <div className="relative">
                <dt className="my-4 text-lg ctm-font-color-6">
                  <span className="font-bold">
                    Intuitive Campaign Creation:
                  </span>
                  Craft captivating campaigns and watch the UGC flood in with
                  our user-friendly platform.
                </dt>
              </div>
              <div className="relative">
                <dt className="my-4 text-lg ctm-font-color-6">
                  <span className="font-bold">Influencer Collaboration:</span>{" "}
                  Forge valuable relationships with influencers, expanding your
                  brand's reach and impact.
                </dt>
              </div>
              <div className="relative">
                <dt className="my-4 text-lg ctm-font-color-6">
                  <span className="font-bold">
                    Customized Influencer Groups:
                  </span>{" "}
                  Amplify the effectiveness of your campaigns by targeting
                  specific influencer communities.
                </dt>
              </div>
              <div className="relative">
                <dt className="my-4 text-lg ctm-font-color-6">
                  <span className="font-bold">Analytics and Insights:</span>{" "}
                  Access real-time performance metrics to track the success of
                  your UGC initiatives and make data-driven decisions.
                </dt>
              </div>
            </dl>
          </div>
          <Link
            to={"/brand/register"}
            className="shadow-lg ctm-bg-1 text-white ctm-btn text-lg my-4 w-fit"
          >
            Create Your Account Now
          </Link>
        </div>
        <img
          className="w-screen"
          alt="Cream Curved Design Separator"
          src={creamTopCurvedDesign}
        ></img>
      </div>
      {/* Pricing */}
      <div
        id="pricing"
        className="flex-col ctm-bg-color-12 w-full flex p-8 lg:p-20 xl:px-24 xl:py-10"
      >
        <h2 className="text-center font-extrabold leading-none text-5xl">
          Brandaffy: Fast. Simple. Smart
        </h2>
        <p className="my-10 text-lg ctm-font-color-6 text-center">
          Imagine… If you’re not getting buried by links and spreadsheets
          everyday, how many more powerful connections can you make?
        </p>
        <div className="mt-4 pb-4 sm:pb-8 lg:pb-2">
          <div className="relative">
            <div className="absolute inset-0"></div>
            <div className="relative mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-md space-y-4 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:space-y-0">
                <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                  <div className="bg-indigo-500 px-6 pt-8 sm:p-10 sm:pb-2">
                    <div>
                      <h3 className="inline-flex rounded-full py-1 text-xl text-white">
                        Starter Plan
                      </h3>
                    </div>
                    <div className="mt-4 flex items-baseline text-6xl font-bold tracking-tight text-white">
                      ₱1499
                      <span className="ml-1 text-2xl font-medium tracking-normal text-white">
                        /mo
                      </span>
                    </div>
                    <p className="mt-5 text-lg text-white">
                      Best for getting started
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col justify-between space-y-6 bg-indigo-500 px-6 pt-6 pb-8 sm:p-10 sm:pt-6">
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-white"
                          />
                        </div>
                        <p className="ml-3 text-xl text-white">
                          3 Active Campaigns
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-white"
                          />
                        </div>
                        <p className="ml-3 text-xl text-white">
                          5 Influencer Boxes
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-white"
                          />
                        </div>
                        <p className="ml-3 text-xl text-white">
                          Unlimited access to partner influencers
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-white"
                          />
                        </div>
                        <p className="ml-3 text-xl text-white">
                          Tiktok Integration
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-white"
                          />
                        </div>
                        <p className="ml-3 text-xl text-white">
                          1 MONTH FREE trial{" "}
                        </p>
                      </li>
                    </ul>
                    <div className="rounded-md shadow">
                      <Link
                        to={"brand/register"}
                        className="flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-5 py-3 text-xl text-blue hover:bg-gray-100"
                      >
                        Subscribe
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                  <div className="bg-violet-700 px-6 pt-8 sm:p-10 sm:pb-2">
                    <div>
                      <h3 className="inline-flex rounded-full py-1 text-xl text-white">
                        Growth Plan
                      </h3>
                    </div>
                    <div className="mt-4 flex items-baseline text-6xl font-bold tracking-tight text-white">
                      ₱2699
                      <span className="ml-1 text-2xl font-medium tracking-normal text-white">
                        /mo
                      </span>
                    </div>
                    <p className="mt-5 text-lg text-white">
                      Best for your growing teams
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col justify-between space-y-6 bg-violet-700 px-6 pt-6 pb-8 sm:p-10 sm:pt-6">
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-white"
                          />
                        </div>
                        <p className="ml-3 text-xl text-white">
                          7 Active Campaigns
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-white"
                          />
                        </div>
                        <p className="ml-3 text-xl text-white">
                          15 Influencer Boxes
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-white"
                          />
                        </div>
                        <p className="ml-3 text-xl text-white">
                          Unlimited access to partner influencers
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-white"
                          />
                        </div>
                        <p className="ml-3 text-xl text-white">
                          Tiktok Integration
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-white"
                          />
                        </div>
                        <p className="ml-3 text-xl text-white ctm-font-color-1">
                          Instagram Integration{" "}
                          <span className="ml-3 text-sm text-red-400">
                            soon!
                          </span>
                        </p>
                      </li>
                    </ul>
                    <div className="rounded-md shadow">
                      <Link
                        to={"brand/register"}
                        className="flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-5 py-3 text-xl text-blue hover:bg-gray-100"
                      >
                        Subscribe
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                  <div className="bg-blue-700 px-6 pt-8 sm:p-10 sm:pb-2">
                    <div>
                      <h3 className="inline-flex rounded-full py-1 text-xl text-white">
                        Beyond Plan
                      </h3>
                    </div>
                    <div className="mt-4 flex items-baseline text-6xl font-bold tracking-tight text-white">
                      ₱4299
                      <span className="ml-1 text-2xl font-medium tracking-normal text-white">
                        /mo
                      </span>
                    </div>
                    <p className="mt-5 text-lg text-white">
                      Best for going beyond
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col justify-between space-y-6 bg-blue-700 px-6 pt-6 pb-8 sm:p-10 sm:pt-6">
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-white"
                          />
                        </div>
                        <p className="ml-3 text-xl text-white">
                          15 Active Campaigns
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-white"
                          />
                        </div>
                        <p className="ml-3 text-xl text-white">
                          25 Influencer Boxes
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-white"
                          />
                        </div>
                        <p className="ml-3 text-xl text-white">
                          Unlimited access to partner influencers
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-white"
                          />
                        </div>
                        <p className="ml-3 text-xl text-white">
                          Tiktok Integration
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-white"
                          />
                        </div>
                        <p className="ml-3 text-xl text-white ctm-font-color-1">
                          Instagram Integration{" "}
                          <span className="ml-3 text-sm text-red-400">
                            soon!
                          </span>
                        </p>
                      </li>
                    </ul>
                    <div className="rounded-md shadow">
                      <Link
                        to={"brand/register"}
                        className="flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-5 py-3 text-xl text-blue hover:bg-gray-100"
                      >
                        Subscribe
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="my-8 text-lg text-center">
          You don't have to decide now! Enjoy your 1 month free trial and launch
          your UGC campaigns with Brandaffy for FREE!
        </p>
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
          <Link
            to={"/brand/register"}
            className="shadow-lg bg-indigo-100 text-indigo-700 ctm-btn text-lg my-4 w-fit"
          >
            Sign Up Today
          </Link>
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
                <Link to={"/creator"}>UGC Creator Portal</Link>
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
                <Link to={"brand/pages/terms"}>Terms of Service</Link>
              </li>
              <li className="my-4 hover:underline cursor-pointer">
                <Link to={"brand/pages/privacy"}>Privacy Policy</Link>
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
              <a
                href="#what-is-brandaffy"
                className="font-semibold hover:underline"
              >
                What is Brandaffy
              </a>
              <li className="font-semibold hover:underline">
                <a href={"/#features"}>Features</a>
              </li>
              {/* <li className="font-semibold hover:underline">How it Works</li> */}
              {/* <li className="font-semibold hover:underline">Why We</li> */}
              <li className="font-semibold hover:underline">
                {" "}
                <a href={"/#pricing"}>Pricing</a>
              </li>
              {/* <li className="font-semibold hover:underline">
                Upcoming Features
              </li> */}
              <li className="font-semibold hover:underline">
                <Link to={"/creator"}>UGC Creator Portal</Link>
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
                className="shadow-lg ctm-bg-1 text-white ctm-btn text-lg my-4"
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
