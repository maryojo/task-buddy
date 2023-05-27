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
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();


  const fetchUserData = (userID) => {
    const params = userID;

    fetch(`https://task-buddy.onrender.com/api/user/${params}`)
      .then((response) => response.json())
      .then((data) => {
        sessionStorage.setItem("userData", JSON.stringify(data));
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
    
    setLoading(true);
    fetch("https://task-buddy.onrender.com/api/login", {
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
          setLoading(false);
          toast.error("Something went wrong, check your details and try again! If you are new, please register your account");
          throw new Error("Request failed");
        }
      })
      .then((data) => {
        setLoading(false);
        const token = data.token;
        const userId = data.userId;
        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token);
        fetchUserData(userId);
        navigate("/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row  bg-[#222222] text-neutral-300">
      <section className="h-[30vh] md:h-screen w-full md:w-2/6 lg:w-3/6">
        <img src={pattern} className="h-full w-full object-cover object-top" alt=""/>
      </section>
      <section className="h-screen w-full md:w-4/6 lg:w-3/6 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-4/6">
          <div className="flex justify-center mb-5">
            <img src={logo} className="w-[9rem]" alt="logo"/>
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

          <PrimaryButton type="submit" text={loading ? 'Loading...' : 'Login'} disabled={loading}/>
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
    </div>
  );
};

export default Login;
