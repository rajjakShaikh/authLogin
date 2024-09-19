import React, { useState } from "react";

function LiftingState() {
  const [userName, setUserName] = useState("");
  return (
    <div>
      <h3> hello parent</h3>
      <DisplayValue userName={userName} />
      <ChildComp userName={userName} setUserName={setUserName} />
    </div>
  );
}

export default LiftingState;

const ChildComp = ({ userName, setUserName }) => {
  const [error, setError] = useState("");

  const handlechange = (e) => {
    setUserName(e.target.value);
    console.log(e.target.value);
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const lettersOnly = /^[A-Za-z]+$/;

    if (!userName) {
      setError("please enter a username");
    } else if (!lettersOnly.test(userName)) {
      setError("username can only contain letters");
    } else if (userName.length < 2) {
      setError("username atleast  contain 2 characters");
    } else {
      setError("");
      alert("submit successfully");
      console.log("Form submitted:", userName);
      setUserName("");
    }
  };

  return (
    <div>
      <h3> hello child</h3>
      <form onSubmit={handlesubmit}>
        <input
          type="text"
          value={userName}
          name="username"
          placeholder="enter name"
          onChange={handlechange}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const DisplayValue = ({ userName }) => {
  return (
    <div>
      <h3> the Displayvalue is :{userName}</h3>
    </div>
  );
};
