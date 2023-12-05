import Link from "next/link";
import Navbar from "./components/navbar";
import "../app/globals.css";
import Image from "next/image";
import landingPic from "public/landing.jpeg";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="headerContainer sm:grid sm:grid-cols-1 sm:grid-rows-3 sm:gap-4 md:grid-cols-4 relative">
        <Image
          src={landingPic}
          alt="landing"
          width={500}
          className="headerImage"
        />
        <div className="headerText1 sm:col-span-1 md:col-span-2 absolute top-4 left-0 right-0 bottom-30 flex flex-col justify-center">
          <h2 className="subTitle1 text-3xl pl-3 pb-3 text-white">We are</h2>
          <h1 className="subTitle2 text-4xl font-bold pl-3 pb-4 text-white">
            Tech For Good
          </h1>
          <h4 className="subTitle3 text-xl pl-3 text-white">
            Empowering Causes, Building Futures Tech for Good, Websites for
            Change.
          </h4>
        </div>

        <div className="section flex flex-col justify-center items-center border border-black rounded-lg p-2 m-2 bg-yellow-100">
          <h2 className="subTitle text-2xl font-bold p-2">Charities</h2>
          <p>
            Click Below to Elevate Your Mission, Delete Online Barriers Now.
            Learn more about how to apply.
          </p>
          <button className="button m-3">
            <Link href={"../charity"}>Find out More</Link>
          </button>
        </div>

        <div className="section flex flex-col justify-center items-center border border-black rounded-lg p-2 m-2 bg-yellow-100">
          <h2 className="subTitle text-2xl font-bold p-2">Developers</h2>
          <p>
            Discover How Tech for Good Translates Your Vision into a Dynamic
            Online Presence. Click Below to Explore the Process.
          </p>
          <button className="button m-3">
            <Link href={"../developers"}>Find out More</Link>
          </button>
        </div>
      </div>
    </div>
  );
}