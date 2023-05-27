import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import pattern from "../assets/images/pattern.png";
import logo from "../assets/logo.png";
import PrimaryButton from "../components/PrimaryButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const fetchTasks = (userID) => {
    const params = new URLSearchParams({
      userId: userID,
    });

    fetch(`http://localhost:3001/api/tasks?${params}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        sessionStorage.setItem("userTasks", data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          toast.error("You don't have an account. Create an account");
          throw new Error("Request failed");
        }
      })
      .then((data) => {
        console.log(data);
        const token = data.token;
        const userId = data.userId;
        localStorage.setItem("userId", userId);
        fetchTasks(userId);
        localStorage.setItem("token", token);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <main className="w-screen h-screen flex flex-col md:flex-row">
      <section className="h-[30vh] md:h-screen w-full md:w-2/6 lg:w-3/6">
        <img src={pattern} className="h-full w-full object-cover object-top" />
      </section>
      <section className="h-screen w-full md:w-4/6 lg:w-3/6 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-4/6">
          <div className="flex justify-center mb-5">
            <img src={logo} className="w-[9rem]" />
          </div>

          <div className="flex flex-col">
            <label for="email" className="text-sm">Email</label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="basic-input"
            />
          </div>
          <div className="flex flex-col">
            <label for="password" className="text-sm">Password</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="basic-input"
            />
          </div>

          <PrimaryButton type="submit" text="Login" />
          <p className="text-sm">
            Don't have an account yet?{" "}
            <Link
              to="/register"
              className="text-primary underline font-semibold"
            >
              Register
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Login;
