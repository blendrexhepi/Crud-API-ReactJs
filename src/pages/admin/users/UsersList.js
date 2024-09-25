import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const UsersList = () => {
  const [userData, setUserData] = useState([]);
  const { id } = useParams();

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:4000/users`);
      const data = await response.json();
      console.log(data);
      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const response = await fetch("http://localhost:4000/users/" + id, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Deleted Successfuly");
        fetchUsers();
      } else {
        alert("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container my-4">
      <h2>Users</h2>
      <div className="row mb-3">
        <div className="col">
          <Link
            className="btn btn-primary me-1"
            to="/admin/users/createuser"
            role="button"
          >
            Create Product
          </Link>
          <button
            type="button"
            onClick={fetchUsers}
            className="btn btn-outline-primary"
          >
            Refresh
          </button>
        </div>
        <div className="col"></div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>UserName</th>
            <th>Email</th>
            <th>City</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company Name</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user?.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.address.city}</td>
                <td>{user.phone}</td>
                <td>{user.website}</td>
                <td>{user.company.name}</td>
                <td></td>
                <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                  <Link
                    className="btn btn-primary btn-sm me-1"
                    to={"/admin/users/edituser/" + user.id}
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => deleteUser(user.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
