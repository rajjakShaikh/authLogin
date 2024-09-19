import React, { useCallback, useEffect, useState } from "react";
import Testchild from "./testchild";

function ToggleApihit() {
  const [userData, setUserData] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const url = "https://jsonplaceholder.typicode.com/users";

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetch(url);
      const response = await data.json();
      console.log(response);
      setUserData(response);
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  }, []);

  const onToggle = () => {
    if (!isActive) {
      setShowConfirmation(true);
    } else {
      setIsActive(false);
      setUserData([]);
    }
  };

  const handleConfirmationYes = () => {
    setIsActive(true);
    fetchUserData();
    setShowConfirmation(false);
  };

  const handleConfirmationNo = () => {
    setShowConfirmation(false);
  };

  const addtodo = () => {
    console.log("add todo");
  };

  return (
    <div>
      <h2> test child component </h2>
      <Testchild userData={userData} />

      <label className="inline-flex relative items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isActive}
          onChange={onToggle}
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
        <span className="ml-3 text-sm font-medium text-gray-900">
          {isActive ? "Deactivate" : "Activate"}
        </span>
      </label>
      {loading ? (
        <div className="text-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        isActive &&
        userData.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-medium">User Data:</h3>
            <ul className="list-disc pl-5">
              {userData.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </div>
        )
      )}

      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full z-50 bg-black opacity-50">
          <div className="fixed top-16 left-16 w-64 bg-white rounded-md shadow-md p-8">
            <h3 className="text-lg font-medium text-gray-800">
              Are you sure you want to activate the API call?
            </h3>
            <div className="mt-4">
              <button
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-400 focus:outline-none"
                onClick={handleConfirmationYes}
              >
                Yes
              </button>
              <button
                className="ml-4 inline-flex items-center justify-center px-4 py-2"
                onClick={handleConfirmationNo}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ToggleApihit;
