import React, { useEffect, useRef, useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Shwoeye } from "../assets/showeye";
import { Close } from "../assets/close";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const userRef = useRef();
  const passref = useRef();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [hasloggedIn, sethasLoggedIn] = useState(false);

  useEffect(() => {
    const userLoggedIn = JSON.parse(localStorage.getItem("hasloggedIn"));
    if (userLoggedIn) {
      sethasLoggedIn(true);
      toast.success("Welcome back!", {
        autoClose: 500,
        position: "top-center",
      });
    } else {
      sethasLoggedIn(false);
    }
    userRef.current.focus();
    if (userRef.current) userRef.current.value = "";
    if (passref.current) passref.current.value = "";
  }, []);

  const emailRegEx = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  // Define the validation schema using Yup
  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Email address is required")
      .matches(emailRegEx, "Please enter a valid email address")
      .max(55, "Maximum 55 characters are allowed"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values, { setFieldError }) => {
      const loggedUser = JSON.parse(localStorage.getItem("userSignup"));

      if (loggedUser && values.email === loggedUser.email) {
        if (values.password === loggedUser.password) {
          localStorage.setItem("user", true);
          localStorage.setItem("hasloggedIn", true); //set the loggeduser known for the status
          toast.success("successfully login", {
            autoClose: 700,
            position: "top-center",
          });
          setTimeout(() => {
            navigate("/");
          }, 1500);
        } else {
          setFieldError("password", "Password is incorrect");
          toast.error("Password is incorrect", {
            autoClose: 700,
            position: "top-center",
          });
        }
      } else {
        toast.error("Invalid email", {
          autoClose: 700,
          position: "top-center",
        });
      }
    },
  });

  return (
    // <section className="bg-gray-50 dark:bg-gray-900">
    //   <ToastContainer />
    //   <form onSubmit={formik.handleSubmit}>
    //     <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    //       <a
    //         href="#"
    //         className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
    //       ></a>
    //       <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
    //         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
    //           <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
    //             Sign in to your account
    //           </h1>

    //           <div>
    //             <label
    //               htmlFor="email"
    //               className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
    //             >
    //               Your email
    //             </label>
    //             <input
    //               type="email"
    //               name="email"
    //               ref={userRef}
    //               value={formik.values.email}
    //               onChange={formik.handleChange}
    //               autoComplete="off"
    //               id="email"
    //               className={`bg-gray-50 border ${
    //                 formik.touched.email && formik.errors.email
    //                   ? "border-red-500"
    //                   : "border-gray-300"
    //               } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
    //             />
    //             {formik.errors.email ? (
    //               <p className="text-red-500 text-sm">{formik.errors.email}</p>
    //             ) : null}
    //           </div>
    //           <div>
    //             <label
    //               htmlFor="password"
    //               className="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white"
    //             >
    //               Password
    //             </label>
    //             <div className="relative">
    //               <input
    //                 type={visible ? "text" : "password"}
    //                 name="password"
    //                 ref={passref}
    //                 value={formik.values.password}
    //                 onChange={formik.handleChange}
    //                 onBlur={formik.handleBlur}
    //                 autoComplete="off"
    //                 id="password"
    //                 className={`bg-gray-50 border ${
    //                   formik.touched.password && formik.errors.password
    //                     ? "border-red-500"
    //                     : "border-gray-300"
    //                 } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
    //               />
    //               {formik.touched.password && formik.errors.password ? (
    //                 <p className="text-red-500 text-sm">
    //                   {formik.errors.password}
    //                 </p>
    //               ) : null}
    //               <div
    //                 className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer eyeicon"
    //                 onClick={() => setVisible(!visible)}
    //               >
    //                 {visible ? <Close /> : <Shwoeye />}
    //               </div>
    //             </div>
    //           </div>
    //           <div className="flex items-center justify-between">
    //             <div className="flex items-start">
    //               <div className="flex items-center h-5">
    //                 <input
    //                   id="remember"
    //                   aria-describedby="remember"
    //                   type="checkbox"
    //                   className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
    //                 />
    //               </div>
    //               <div className="ml-3 text-sm">
    //                 <label
    //                   htmlFor="remember"
    //                   className="text-gray-500 dark:text-gray-300"
    //                 >
    //                   Remember me
    //                 </label>
    //               </div>
    //             </div>
    //             <a
    //               href="#"
    //               className="text-sm text-blue-600 font-medium text-primary-600 hover:underline dark:text-primary-500"
    //             >
    //               Forgot password?
    //             </a>
    //           </div>
    //           <button
    //             type="submit"
    //             className="w-full bg-blue-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    //           >
    //             Sign in
    //           </button>
    //           <p className="text-sm font-light text-gray-500 dark:text-gray-400">
    //             Don’t have an account yet?{" "}
    //             <Link
    //               to="/signup"
    //               className="font-medium text-primary-600 hover:underline dark:text-primary-500"
    //             >
    //               Sign up
    //             </Link>
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </form>
    // </section>
    <form onSubmit={formik.handleSubmit}>
      <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
        <ToastContainer />
        <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
          <div
            className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
            style={{
              backgroundImage: `url("./src/assets/images/login_img.jpg")`,
            }}
          ></div>
          <div className="w-full p-8 lg:w-1/2">
            <p className="text-xl text-gray-600 text-center">
              {hasloggedIn ? "Welcome back!" : "Login to your account"}
            </p>
            <div className="mt-4">
              <label className="block text-gray-700 text-start text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                ref={userRef}
                value={formik.values.email}
                onChange={formik.handleChange}
                autoComplete="off"
                id="email"
                className={`bg-gray-50 border ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              />
              {formik.errors.email ? (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              ) : null}
            </div>
            <div className="mt-4 flex flex-col justify-between">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  ref={passref}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="off"
                  id="password"
                  className={`bg-gray-50 border ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500"
                      : "border-gray-300"
                  } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="text-red-500 text-sm">
                    {formik.errors.password}
                  </p>
                ) : null}
                <div
                  className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer eyeicon"
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? <Close /> : <Shwoeye />}
                </div>
              </div>
              {/* <a
              href="#"
              className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
            >
              Forget Password?
            </a> */}
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
              >
                Login
              </button>
            </div>
            <a
              href="#"
              className=" flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
            >
              <div className="flex px-5 justify-center w-full py-3">
                <div className="min-w-[30px]">
                  <svg className="h-6 w-6" viewBox="0 0 40 40">
                    <path
                      d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                      fill="#FFC107"
                    />
                    <path
                      d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                      fill="#FF3D00"
                    />
                    <path
                      d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                      fill="#4CAF50"
                    />
                    <path
                      d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                      fill="#1976D2"
                    />
                  </svg>
                </div>
                <div className="flex w-full justify-center">
                  <h1 className="whitespace-nowrap text-gray-600 font-bold">
                    Sign in with Google
                  </h1>
                </div>
              </div>
            </a>
            <div className="mt-4 flex items-center w-full text-center">
              <p
                href="#"
                className="text-sm text-gray-500 capitalize text-center w-full"
              >
                Don&apos;t have any account yet?
                <Link to={"/signup"} className="text-blue-700 mx-2">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
