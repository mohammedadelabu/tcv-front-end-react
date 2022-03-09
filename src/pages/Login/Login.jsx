import React, { useState, useRef } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const url = `https://tcv-event-planner.herokuapp.com/user/login`;
const HTTPCODE = { success: [200, 201], bad: [400, 401, 403, 404] };
const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      [e.target.email]: e.target.value,
      [e.target.password]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    const { email, password } = values;
    e.preventDefault();
    setLoading("loading");
    if (email && password) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const userData = await response.json();

        if (HTTPCODE.success.includes(response.status)) {
          console.log(userData);
          localStorage.setItem("tweeter", JSON.stringify(userData));
          Swal.fire({
            icon: "success",
            title: "Login successful",
            timer: 1500,
          });
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        }
        if (HTTPCODE.bad.includes(response.status)) {
          setLoading("");

          Swal.fire({
            icon: "error",
            title: "Incorrect Credentials",

            timer: 2500,
          });
        }
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    }
    Swal.fire({
      icon: "warning",
      title: "Both fields are required",
    });

    setValues({ email: "", password: "" });
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
            <br/>
              <button onClick={handleSubmit} className="btn btn-primary">
                {loading === "loading" && <BeatLoader color="#2F80ED" />}
                {loading !== "loading" && "Login"}
              </button>
            </div>
          </form>
        </div>

        <p>
          Don't have an account yet? <Link to="/register">Register </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
