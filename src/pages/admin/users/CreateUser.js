import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();

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
      const response = await fetch(`http://localhost:4000/users`, {
        method: "POST",
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
          <h2 className="text-center mb-5">Create User</h2>
          <form onSubmit={handleSubmit}>
            <div className="row  mb-3">
              <label className="col-sm-4 col-form-label">Name</label>
              <div className="col-sm-8">
                <input className="form-control" name="name" required></input>
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
                ></input>
                <span className="text-danger"></span>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Email</label>
              <div className="col-sm-8">
                <input className="form-control" name="email" required></input>
                <span className="text-danger"></span>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">city</label>
              <div className="col-sm-8">
                <input className="form-control" name="city" required></input>
                <span className="text-danger"></span>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label" required>
                Phone
              </label>
              <div className="col-sm-8">
                <input className="form-control" type="tel" name="phone"></input>
                <span className="text-danger"></span>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label" required>
                Website
              </label>
              <div className="col-sm-8">
                <input className="form-control" name="website"></input>
                <span className="text-danger"></span>
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label" required>
                Company Name
              </label>
              <div className="col-sm-8">
                <input className="form-control" name="companyname"></input>
                <span className="text-danger"></span>
              </div>
            </div>
            <div className="row ">
              <div className="offset-sm-4 col-sm-4 d-grid">
                <button type="submit" className="btn btn-primary">
                  Submit
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
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
