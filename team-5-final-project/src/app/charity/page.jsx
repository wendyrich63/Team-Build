import CharityRegistration from "../components/charityRegistration";
import Navbar from "../components/navbar";
import "../globals.css";
import Link from "next/link";
import Image from "next/image";
import charity from "public/charity.jpeg";

export default function Charity() {
  return (
    <section>
      <Navbar />
      <div className="headerContainer sm:grid sm:grid-cols-1 sm:grid-rows-3 sm:gap-4 md:grid-cols-4 relative">
        <h2 className="subTitle text-center text-2xl font-bold p-2 bg-emerald-300">
          Charities
        </h2>
        <Image
          src={charity}
          alt="charity"
          width={500}
          className="headerImage"
        />
      </div>
      <div className="section flex flex-col justify-center items-center border border-black rounded-lg p-2 m-2 bg-yellow-100">
        <h2 className="subTitle text-2xl font-bold p-2">Charities</h2>
        <p>
          At Tech for Good, we are on a mission to empower non-profit
          organisations with impactful online presence. Simultaneously, we
          create opportunities for junior developers to gain hands-on commercial
          experience. Join us in building a better, more connected world through
          technology.
          <br />
          Register an account today to unlock the details on how non-profits can
          apply for a tailored online presence
        </p>
        <button className="button m-3">
          <Link href={"charity/register"}>Register</Link>
        </button>
      </div>
    </section>
  );
}