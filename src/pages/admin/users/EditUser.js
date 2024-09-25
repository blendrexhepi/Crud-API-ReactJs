import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = useParams();
  console.log(id);
  const [initialData, setInitialData] = useState();

  const getUser = async () => {
    try {
      const response = await fetch("http://localhost:4000/users/" + id);
      const data = await response.json();
      setInitialData(data);
      console.log(data);
      console.log(initialData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    const userdata = {
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      website: user.website,
      address: {
        city: user.city,
        street: "", // Add street if required
        suite: "", // Add suite if required
        zipcode: "", // Add zipcode if required
        geo: {
          lat: "", // Add latitude if required
          lng: "", // Add longitude if required
        },
      },
      company: {
        name: user.companyname,
        catchPhrase: "", // Add if required
        bs: "", // Add if required
      },
    };
    console.log(userdata);

    try {
      const response = await fetch(`http://localhost:4000/users/` + params.id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userdata),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log("User was created Successfully", data);
        navigate("/admin/users/userslist");
      } else {
        console.log("Validation Error: " + JSON.stringify(data.errors || data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h2 className="text-center mb-5">Edit User</h2>

          {initialData && (
            <form onSubmit={handleSubmit}>
              <div className="row  mb-3">
                <label className="col-sm-4 col-form-label">ID</label>
                <div className="col-sm-8">
                  <input
                    className="form-control-plaintext"
                    name="name"
                    readOnly
                    defaultValue={params.id}
                  ></input>
                  <span className="text-danger"></span>
                </div>
              </div>
              <div className="row  mb-3">
                <label className="col-sm-4 col-form-label">Name</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    defaultValue={initialData.name}
                    name="name"
                    required
                  ></input>
                  <span className="text-danger"></span>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">UserName</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    name="username"
                    required
                    defaultValue={initialData.username}
                  ></input>
                  <span className="text-danger"></span>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Email</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    defaultValue={initialData.email}
                    name="email"
                    required
                  ></input>
                  <span className="text-danger"></span>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">city</label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    defaultValue={initialData.address.city}
                    name="city"
                    required
                  ></input>
                  <span className="text-danger"></span>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label" required>
                  Phone
                </label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    type="tel"
                    name="phone"
                    defaultValue={initialData.phone}
                  ></input>
                  <span className="text-danger"></span>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label" required>
                  Website
                </label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    name="website"
                    defaultValue={initialData.website}
                  ></input>
                  <span className="text-danger"></span>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label" required>
                  Company Name
                </label>
                <div className="col-sm-8">
                  <input
                    className="form-control"
                    defaultValue={initialData.company.name}
                    name="companyname"
                  ></input>
                  <span className="text-danger"></span>
                </div>
              </div>
              <div className="row ">
                <div className="offset-sm-4 col-sm-4 d-grid">
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </div>
                <div className="col-sm-4 d-grid">
                  <Link
                    role="button"
                    to="/admin/users"
                    className="btn btn-secondary"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUser;
