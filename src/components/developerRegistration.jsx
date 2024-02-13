"use client";
import React, { useState } from "react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import insertUser from "@/db-components/insertUser.js";
import insertDevUserPref from "@/db-components/insertDevUserPref";

export default function DeveloperRegistration() {

  const [registration, setRegistration] = useState({
    first_name: "",
    surname: "",
    contact_number: "",
    tech_background: "",
    hours_range: "",
    email: "",
    possible_mentor: false,
    password: "",
    confirm_password: "",
    t_and_c: false,
  });

  const router = useRouter();

  const [regSuccess, setRegSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const submissionMessage = "Thank you for registering with BUILD !";
  
    //HANDLE THE INPUT OF THE TEXT FIELDS
    const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    //Password format is validated at this point
    if (fieldName === "password") {
      validatePassword(fieldValue);}
  
      //Update the form fieldvwith latest value
    setRegistration((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  //VALIDATION FOR PASSWORD FORMAT
  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError("Password must be at least 6 characters and include a number, a capital letter, and a special character.");
     } else {
       setPasswordError("");
     }
  };

  //HANDLE THE INPUT OF THE CHECKBOX FIELDS
  const handleChkBoxInput = (e) => {
    const { name, type, checked, value } = e.target;
   
    setRegistration((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
      }));
  };

  //VALIDATE THE FINAL FORM INPUT
  const validateForm = () => {
    const isValidEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      registration.email
    );

    const isValidForm =
      registration.first_name &&
      registration.surname &&
      registration.contact_number &&
      registration.tech_background &&
      registration.hours_range &&
      registration.email &&
      isValidEmailFormat &&
      registration.password &&
      registration.password === registration.confirm_password;
      registration.t_and_c; 

    if (!isValidEmailFormat) {
      alert("Please enter a valid email address.");
       }

    if (registration.password != registration.confirm_password) {
      alert("Please make sure your passwords match");
      }

    if (!isValidForm) {
      alert("Please complete all required fields");
       }

    return isValidForm;
  };

  
//SUMBIT THE REGISTRATION TO THE DATABASE
  const submitReg = async (e) => {
    e.preventDefault();

    if (!validateForm()) {return;}

    // Pass the registration form data to the database to complete the registration.
    // This is achieved by inserting a main_users row for the new user and then attaching a dev_user_pref table row to that new user

    const usersId = uuidv4();
    // Insert the new user into the main_users table

    const userToAdd = {
      id: usersId,
      email: registration.email,
      type: "DEV",
      password: registration.password,
    };

    const result = await insertUser(userToAdd); 
    if (!result){ 
      return;} 
    else {
     
      // Now Insert the new users preferences into the dev_user_pref table
      const devUserPrefToAdd = {
        id: usersId,
        first_name: registration.first_name,
        surname: registration.surname,
        contact_number: registration.contact_number,
        tech_background: registration.tech_background,
        t_and_c: registration.t_and_c,
        hours_range: registration.hours_range,
        possible_mentor: registration.possible_mentor,
        };
    
      const result = await insertDevUserPref(devUserPrefToAdd); 
        
      if (!result){ 
        return;} 
      else {
                   
        // Both database insets are successful so refresh the page.
        setRegSuccess(true);
        setRegistration({
          first_name: "",
          surname: "",
          contact_number: "",
          tech_background: "",
          hours_range: "",
          email: "",
          possible_mentor: "",
          password: "",
          confirm_password: "",
          t_and_c: "",
          });

          localStorage.setItem("userId", usersId);
  
          setTimeout(() => {
          router.push("/developers/dashboard");
          }, 3000);

          return;
          }
        }
  
  };

  return (
    <div className="text-left mx-3  lg:p-8 lg:flex lg:bg-slate-50 lg:justify-center lg:align-middle lg:text-xl lg:items-center lg:w-7/12 lg:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] lg:rounded-md">
      <div className="">
        <h1 className="text-4xl font-bold mt-3 leading-relaxed">
          Register as a{" "}
          <span className="bg-emerald-400 py-1 px-2 rounded-md">Developer</span>
        </h1>
        {regSuccess ? (
          <div>
            <div className="text-green-500">{submissionMessage}</div>
          </div>
        ) : (
          <form
            className="bg-slate-50 mt-5 tracking-wider flex flex-col w-full lg:grid lg:grid-cols-2 lg:gap-10 gap-5"
            onSubmit={submitReg}
          >
            <div>
              <input
                type="text"
                name="first_name"
                onChange={handleInput}
                value={registration.first_name}
                className="appearance-none bg-transparent border-b pb-2 border-gray-600 placeholder:text-gray-600 placeholder:text-xl w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none"
                placeholder="First Name:"
               // required
              />
            </div>
            <div>
              <input
                type="text"
                name="surname"
                onChange={handleInput}
                value={registration.surname}
                className="appearance-none bg-transparent border-b pb-2 border-gray-600 placeholder:text-gray-600 placeholder:text-xl w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none"
                placeholder="Last Name:"
                //required
              />
            </div>
            <div>
              <input
                type="text"
                name="contact_number"
                onChange={handleInput}
                value={registration.contact_number}
                className="appearance-none bg-transparent border-b pb-2 border-gray-600 placeholder:text-gray-600 placeholder:text-xl w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none"
                placeholder="Contact Number:"
                //required
              />
            </div>

            <div>
              <div></div>

              <div>
                <input
                  type="text"
                  name="email"
                  onChange={handleInput}
                  value={registration.email}
                  className="appearance-none bg-transparent border-b pb-2 border-gray-600 placeholder:text-gray-600 placeholder:text-xl w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none"
                  placeholder="Email:"
                 // required
                />
              </div>
            </div>
            <div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleInput}
                value={registration.password}
                className="appearance-none bg-transparent border-b pb-2 border-gray-600 placeholder:text-gray-600 placeholder:text-xl w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none"
                placeholder="Password:"
                //required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm text-gray-600"
              >
                {showPassword ? "Hide" : "Show"} Passwords
              </button>
              {passwordError && (
                <div className="text-red-500">{passwordError}</div>
              )}
            </div>

            <div>
              <input
                type={showPassword ? "text" : "password"}
                name="confirm_password"
                onChange={handleInput}
                value={registration.confirm_password}
                className="appearance-none bg-transparent border-b pb-2 border-gray-600 placeholder:text-gray-600 placeholder:text-xl w-full text-black mr-3 py-1 px-2 leading-tight focus:outline-none"
                placeholder="Confirm Password:"
               // required
              />
              
            </div>

            <div>
              <select
                name="hours_range"
                onChange={handleInput}
                value={registration.hours_range}
                className="bg-transparent border-b pb-2 border-gray-600 text-xl text-gray-600 placeholder:text-xl w-full mr-3 py-1 leading-tight focus:outline-none"
                placeholder="Select your hour range"
                //required
              >
                <option value="" disabled>
                  Hours you can commit each week?
                </option>
                <option value="1">1 - 2 hours per week</option>
                <option value="2">2 - 5 hours per week</option>
                <option value="3">5 - 10 hours per week</option>
                <option value="4">10 - 20 hours per week</option>
                <option value="5">More than 20 hours per week</option>
              </select>
            </div>
            <div className="flex items-center">
              <label className="text-xl text-gray-600 mr-2">
                Are you willing to commit to our mentorship programme?
                <span className="text-sm text-gray-400 ml-1">
                  (This will involve guiding and assisting a junior developer
                  for at least 30 minutes a week)
                </span>
              </label>
              <input
                type="checkbox"
                name="possible_mentor"
                onChange={handleChkBoxInput}
                value={registration.possible_mentor}
                className="ml-2"
              />
            </div>
            <div>
              <label className="appearance-none border-gray-600 placeholder:text-xl text-xl w-full text-gray-600 mr-3 py-1 px-2 leading-tight focus:outline-none">
                Technical Background:
              </label>
              <textarea
                type="text"
                name="tech_background"
                onChange={handleInput}
                value={registration.tech_background}
                className="appearance-none bg-grey-200 border border-gray-600 bg-slate-50 placeholder:text-gray-600 placeholder:text-xl w-full h-40 text-black mr-3 py-1 px-2 leading-tight focus:outline-none lg:mb-4"
                //required
              />
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex">
                <span className="text-sm text-gray-700">
                  <input
                    type="checkbox"
                    id="terms&conditions"
                    name="t_and_c"
                    onChange={handleChkBoxInput}
                    value={registration.t_and_c}
                    className="mr-2 mt-1 "
                    //required
                  />
                  Click here to agree to the{" "}
                  <Link href="../termsandconditions" target="_blank">
                    <u>
                      <b className="ml">Terms and Conditions</b>
                    </u>
                  </Link>
                </span>
              </div>
              <div>
                {" "}
                <button
                  type="submit"
                  className="button bg-red-400  font-bold rounded w-44 h-10 text-sm lg:w-64 lg:text-md lg:mb-5 "
                >
                  Submit Form
                </button>
              </div>
            </div>
                    </form>
        )}
      </div>
    </div>
  );
}
