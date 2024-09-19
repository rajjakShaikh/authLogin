import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Close } from "../assets/close";
import { Shwoeye } from "../assets/showeye";
import { ToastContainer, toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const emailref = useRef();
  const passwordref = useRef();
  const [signupdata, setSignupdData] = useState({
    email: "",
    password: "",
  });

  const handleSignUpData = (e) => {
    setSignupdData({
      ...signupdata,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    emailref.current.focus();
    passwordref.current.value = "";
    emailref.current.value = "";
  }, []);

  const handleSignUp = (e) => {
    e.preventDefault();
    localStorage.setItem("userSignup", JSON.stringify(signupdata));
    toast.success("successfully login", {
      autoClose: 700,
      position: "top-center",
    });
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <ToastContainer />
        <form onSubmit={handleSignUp}>
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            ></a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create An Account
                </h1>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    ref={emailref}
                    value={signupdata.email}
                    onChange={handleSignUpData}
                    autoComplete="off"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={visible ? "text" : "password"}
                      name="password"
                      ref={passwordref}
                      value={signupdata.password}
                      autoComplete="off"
                      onChange={handleSignUpData}
                      id="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer eyeicon"
                      onClick={() => setVisible(!visible)}
                    >
                      {visible ? <Close /> : <Shwoeye />}
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign up
                </button>
              </div>
              <p className="text-sm text-gray-500 capitalize text-center w-full mb-5">
                Already have an account?
                <Link to="/login" className="text-sm  text-blue-700 mx-2">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Signup;
