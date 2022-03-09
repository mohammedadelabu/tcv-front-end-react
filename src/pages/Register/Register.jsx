import React, { useState, useRef } from "react";
import Swal from "sweetalert2";
import { BeatLoader } from "react-spinners";
import {Link} from 'react-router-dom';

const url = `https://tcv-event-planner.herokuapp.com/user/signup`;
const Register = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [loadingMsg, setLoadingMsg] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.email]: e.target.value, [e.target.password]: e.target.value });
  };

  const handleSubmit = async (e) => {
    const { email, password } = values;
    setLoadingMsg("loading");
    if( email && password) {

        try {
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
    
          if (response.status === 201 || response.status === 200) {
            // const data = await response.json();
            Swal.fire({
              icon: "success",
              title: "Registeration Successful",
    
              timer: 2500,
            });
            setTimeout(() => {
              window.location.href = "login";
            }, 3000);
            // notify("success", "Registeration Successful", "login");
          }
          if (response.status === 400 || response.status === 500 || response.status === 404) {
            // const data = await response.json();
            // console.log(data);
            Swal.fire({
              icon: "warning",
              title: "Failed to register account",
    
              timer: 2500,
            });
            setLoadingMsg("");
          }
    
          console.log(response);
        } catch (err) {
          console.error(err);
        }
    }
    Swal.fire({
        icon: 'warning',
        title: "Both fields are required"
    })

    setValues({email: '', password: ''})
  };

  return (
    <div>
      <div className="container">
        <br />
        <div className="card">
          <form className="card-body">
            <div>
              <label htmlFor="email" className="email">
                Email
              </label>
              <div className="col-12 form-group">
                <input
                  class="form-control"
                  type="text"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  name="email"
                  ref={emailRef}
                  placeholder="Enter Your Email"
                  required
                ></input>
              </div>
            </div>
            <div>
              <label htmlFor="password" className="password">
                Password
              </label>
              <input
                class="form-control"
                type="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                name="password"
                ref={passwordRef}
                placeholder="Enter Your Password"
                required
              ></input>
            </div>
            <div>
              <br />
              <button onClick={handleSubmit} className="btn btn-primary">
                {loadingMsg === "loading" && <BeatLoader color="#2F80ED" />}
                {loadingMsg !== "loading" && "Register"}
              </button>
            </div>
          </form>
        </div>

        <p>
          Already have an account? <Link to="/login">Register </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
