import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "simple-datatables";
// import "simple-datatables/src/style.css";

function DataTablecomp() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("https://reqres.in/api/users?page=2")
      .then((response) => {
        setUsers(response.data.data); // Set the user data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Initialize the DataTable
    if (users.length > 0) {
      const dataTable = new DataTable("#data-table", {
        searchable: true,
        sortable: true,
      });
    }
  }, [users]);

  return (
    <div>
      <table
        id="data-table"
        className="min-w-full border border-gray-500 text-center"
      >
        <thead>
          <tr>
            <th>
              <span className="flex items-center">ID</span>
            </th>
            <th>
              <span className="flex items-center">First Name</span>
            </th>
            <th>
              <span className="flex items-center">Last Name</span>
            </th>
            <th>
              <span className="flex items-center">Email</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.id}
              </td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTablecomp;
