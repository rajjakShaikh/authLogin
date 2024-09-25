import React, { useMemo, useState } from "react";
import useCustomHookExample from "./customhookexample";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "flowbite-react";

function Tenstackexample() {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const ShowLoggeduser = JSON.parse(localStorage.getItem("userSignup")) || {};
  const userEmail = ShowLoggeduser.email;

  // Call the hook to get data and states
  const { data, isLoading, isError, error } = useCustomHookExample({
    staleTime: 1000 * 60 * 5,
  });
  const memoizedData = useMemo(() => data, [data]);

  // Handle loading state
  if (isLoading) {
    return (
      <>
        <div className="grid place-items-center fixed inset-0 ">
          <Spinner aria-label="Large spinner example" size="xl" />
        </div>
      </>
    );
  }

  // Handle error state
  if (isError) {
    return <p>Error: {error?.message || "Something went wrong."}</p>;
  }

  const handleShowConfirmation = () => {
    setShowConfirmation(true);
  };

  const handlelogout = () => {
    localStorage.removeItem("user");
    toast.success("Logout successfully", {
      autoClose: 700,
      position: "top-center",
    });
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const handlebuttonclick = () => {
    navigate(`/test`, {
      state: { userEmail },
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-2 p-5">
        <div className="grid justify-end">
          <h2 className="font-bold">Hii,{userEmail}</h2>
          <button className="px-3 py-1 bg-red-500" onClick={handlebuttonclick}>
            goto toggle
          </button>
        </div>
        <div className="grid justify-end ">
          <button
            className="bg-blue-700 rounded-md text-white text-[18px] px-4 py-2"
            // onClick={handlelogout}
            onClick={handleShowConfirmation}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-flow-row grid-cols-5 aspect-square">
        {memoizedData.map((productData) => (
          <div
            key={productData.id}
            className="flex flex-col items-center justify-center"
          >
            <img
              className="h-[100px] w-[100px]"
              src={productData.image}
              alt={productData.title}
            />
            <button className="px-3 py-2 bg-green-600 rounded-md text-white font-medium mt-2">
              Price:{productData.price}
            </button>
          </div>
        ))}
      </div>
      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-medium mb-4">
              Are you sure you want to log out?
            </h3>
            <div className="flex justify-center mt-4">
              <button
                className="bg-blue-500 px-7 py-2 text-white font-medium rounded-md mr-4"
                onClick={handlelogout}
              >
                Yes
              </button>
              <button
                className="bg-gray-500 px-7 py-2 text-white font-medium rounded-md"
                onClick={() => setShowConfirmation(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Tenstackexample;
