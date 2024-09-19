// import React, { useState, useCallback } from "react";

// const Test = () => {
//   const [count, setCount] = useState(0);

//   // Define a callback function using useCallback
//   const handleClick = useCallback(() => {
//     setCount((prevCount) => prevCount + 1);
//   }, []);

//   return (
//     <div>
//       <p>Count: {count}</p>
//       {/* Pass the callback function to a child component */}
//       <Childtest onClick={handleClick} />
//     </div>
//   );
// };

// // ChildComponent receives the callback function as a prop
// const Childtest = ({ onClick }) => {
//   return <button onClick={onClick}>Increment Count</button>;
// };

// export default Test;

import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import Testchild from "./testchild";
// import Testchild from "./testchild";
// import Childtest from "./childtest";

function Test() {
  const [count, setCount] = useState(0);
  const [todo, setTodo] = useState(["todo1", "todod2"]);

  // const [data, setData] = useState([]);

  // const url = "https://jsonplaceholder.typicode.com/users";

  // const fetchData = useCallback(async () => {
  //   try {
  //     const response = await fetch(url);
  //     const result = await response.json();
  //     setData(result);
  //     console.log(result);
  //   } catch (error) {
  //     console.log(error + "error");
  //   }
  // }, []);

  // const handleClick = useCallback(() => {
  //   setCount((prev) => prev + 1);
  //   console.log(count, "count");
  // }, []);

  const handleClick = useCallback(() => {
    setCount((count) => count + 1);
    console.log(count, "comp rerender ");
  }, []);

  useEffect(() => {
    // fetchData();
    handleClick();
    // console.log("useEffcet call");
  }, []);

  const newtestmemo = useCallback(() => {
    console.log("newtestmemeo");
  }, []);
  
  return (
    <div>
      <Testchild todo={todo} newtestmemo={newtestmemo} />
      {/* <Childtest onClick={handleClick} /> */}
      <button
        onClick={handleClick}
        className="px-5 py-2 my-4 bg-blue-400 rounded-md text-white font-bold"
      >
        increament count
      </button>
      <h1>hello Data</h1>
      {/* {data.map((userdata) => (
        <>
          <ul key={userdata.id}>
            <li>{userdata.name}</li>
            <li>{userdata.username}</li>
            <li>{userdata.email}</li>
          </ul>
        </>
      ))}
      <button onClick={fetchData} style={{ border: "1px solid black;" }}>
        fetchData
      </button> */}
    </div>
  );
}

export default Test;
