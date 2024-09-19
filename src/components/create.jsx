import React, { useState, useEffect, useRef } from "react";

function Create() {
  const [data, setData] = useState({ name: "", password: "", colour1: "" });
  const [items, setItems] = useState([]);

  const ref = useRef(null);

  const handlechange = (e) => {
    //   key value name is kye and value is target the value input
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleClick = () => {
    if (!data.name.trim() || !data.password.trim() || !data.colour1.trim())
      return;
    const newitem = {
      id: Date.now(),
      name: data.name,
      password: data.password,
      colour1: data.colour1,
    };
    const addedData = [...items, newitem];
    setItems(addedData);
    localStorage.setItem("item", JSON.stringify(addedData));
    console.log("addedData: " + JSON.stringify(addedData));
    setData({ name: "", password: "", colour1: "" });
  };

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("item"));
    if (storedItems) setItems(storedItems);
  }, []);

  useEffect(() => {
    ref.current.focus();
  }, []);

  const [bgClr, setBgClr] = useState("#eaeaea");

  useEffect(() => {
    const addclr = localStorage.getItem(item);
    setBgClr(addclr);
  }, []);

  return (
    <>
      <div className="grid-grid-cols-1">
        <h1> create user </h1>
      </div>
      <div className="grid-cols-1 gap-2">
        <input
          type="text"
          name="name"
          placeholder="enter name"
          value={data.name}
          ref={ref}
          className="border-black border"
          onChange={handlechange}
        />
        <input
          type="password"
          name="password"
          value={data.password}
          placeholder="enter password"
          className="border-black border "
          onChange={handlechange}
        />
        <input
          type="color"
          name="colour1"
          onChange={handlechange}
          value={data.colour1}
        />
        <button
          className="px-5 py-2 rounded-lg  text-white font-bold text-[16px]"
          onClick={handleClick}
          style={{ bgClr }}
        >
          Add User
        </button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>password</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Create;
