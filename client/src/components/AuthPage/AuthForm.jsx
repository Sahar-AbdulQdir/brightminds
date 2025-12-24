import React, { useState } from "react";
import "../AuthPage/AuthForm.css";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn, FaHeart } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const AuthForm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const defaultForm = searchParams.get("form") || "signIn";
  const [isRightPanelActive, setIsRightPanelActive] = useState(defaultForm === "signUp");
  const navigate = useNavigate();

  // Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch("https://lexiaminds-private-test.onrender.com/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        localStorage.setItem("userName", name);
        localStorage.setItem("userEmail", email);
        navigate("/home"); // Redirect to home
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err); 
      alert("Something went wrong during sign up");
    }
  };

  // Sign In
  const handleSignIn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch("https://lexiaminds-private-test.onrender.com/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Welcome back, ${data.user.name}!`);
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userEmail", data.user.email);
        navigate("/home"); // Redirect to home
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong during sign in");
    }
  };

  return (
 <div className="auth-page">
    <div className="floating-element"></div>
    <div className="floating-element"></div>
    <div className="floating-element"></div>

    <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}>

      {/* Sign Up Form */}
      <div className="form-container sign-up-container">
        <form onSubmit={handleSignUp}>
          <h1>Create Account</h1>
          {/* <div className="social-container">
            <a href="#" className="social"><FaFacebookF /></a>
            <a href="#" className="social"><FaGooglePlusG /></a>
            <a href="#" className="social"><FaLinkedinIn /></a>
          </div> */}
          {/* <span>use your email for registration</span> */}
          <input type="text" placeholder="Name" name="name" required />
          <input type="email" placeholder="Email" name="email" required />
          <input type="password" placeholder="Password" name="password" required />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className="form-container sign-in-container">
        <form onSubmit={handleSignIn}>
          <h1>Sign in</h1>
          {/* <div className="social-container">
            <a href="#" className="social"><FaFacebookF /></a>
            <a href="#" className="social"><FaGooglePlusG /></a>
            <a href="#" className="social"><FaLinkedinIn /></a>
          </div> */}
          {/* <span>use your account</span> */}
          <input type="email" placeholder="Email" name="email" required />
          <input type="password" placeholder="Password" name="password" required />
          {/* <a href="#">Forgot your password?</a> */}
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* Overlay Panels */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" onClick={() => setIsRightPanelActive(false)}>Sign In</button>
          </div>

          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="ghost" onClick={() => setIsRightPanelActive(true)}>Sign Up</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <footer>
        <p>Created with  <FaHeart color="black" />  by sahaxar</p>
      </footer> */}
    </div>
     </div>
  );
};

export default AuthForm;
