import React, { useEffect, useState } from "react";

function Formvalidate() {
  const initialState = {
    name: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [submittedData, setSubmittedData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation: check if name and password fields are empty
    if (!formData.name.trim() || !formData.password.trim()) {
      alert("Please fill in both fields.");
      return;
    }

    const updatedData = [...submittedData, formData];
    setSubmittedData(updatedData);
    setOriginalData(updatedData); // Ensure originalData is updated with new data
    localStorage.setItem("storedData", JSON.stringify(updatedData));
    setFormData(initialState);
  };

  // Load data from localStorage on component mount
  useEffect(() => {
    const getLocalData = localStorage.getItem("storedData");
    if (getLocalData) {
      const parsedData = JSON.parse(getLocalData);
      setSubmittedData(parsedData);
      setOriginalData(parsedData);
    }
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    if (!searchQuery) {
      setSubmittedData(originalData);
      return;
    }
    const filteredData = originalData.filter((data) =>
      data.name.toLowerCase().includes(searchQuery)
    );
    if (filteredData.length === 0) {
      alert("No search results found");
    }

    setSubmittedData(filteredData);
  };

  // Handle delete action
  const handleDelete = (index) => {
    const updatedData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(updatedData);
    setOriginalData(updatedData);
    localStorage.setItem("storedData", JSON.stringify(updatedData));
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="search"
          placeholder="Search user"
          className="border p-2 mb-2 w-full"
          onChange={handleSearch}
        />
        <br />
        <label className="block">Name</label>
        <input
          type="text"
          placeholder="Enter name"
          className="border p-2 mb-2 w-full"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label className="block">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          className="border p-2 mb-2 w-full"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="px-4 py-2 bg-sky-500 text-white rounded-md w-full mt-2"
        >
          Submit
        </button>
      </form>

      {submittedData.length > 0 && (
        <div>
          <ul className="list-disc pl-5">
            {submittedData.map((user, index) => (
              <li key={index} className="mb-2">
                <p className="font-bold">Name: {user.name}</p>
                <p>Password: {user.password}</p>
                <button
                  onClick={() => handleDelete(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded-md mt-1"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Formvalidate;
