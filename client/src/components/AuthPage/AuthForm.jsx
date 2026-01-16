import React, { useState } from "react"; 
import "../AuthPage/AuthForm.css"; 
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn, FaHeart } from "react-icons/fa"; 
import { useLocation, useNavigate } from "react-router-dom"; 
import "../../styles/colors.css";

const AuthForm = () => {
  const location = useLocation(); // Get current URL location
  const searchParams = new URLSearchParams(location.search); // Parse URL query parameters
  const defaultForm = searchParams.get("form") || "signIn"; 
  const [isRightPanelActive, setIsRightPanelActive] = useState(defaultForm === "signUp"); // State to toggle panel
  const navigate = useNavigate();

  // Get backend API URL from environment variable
  const API_URL = import.meta.env.VITE_API_URL;

  // Function to handle user sign up
  const handleSignUp = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value; 
    const password = e.target.password.value; 

    try {
      const res = await fetch(`${API_URL}/api/signup`, { // Use env variable
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        localStorage.setItem("userName", name);
        localStorage.setItem("userEmail", email); 
        navigate("/home"); 
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err); 
      alert("Something went wrong during sign up");
    }
  };

  // Function to handle user sign in
  const handleSignIn = async (e) => {
    e.preventDefault();
    const email = e.target.email.value; 
    const password = e.target.password.value; 

    try {
      const res = await fetch(`${API_URL}/api/signin`, { // Use env variable
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Welcome back, ${data.user.name}!`);
        localStorage.setItem("userName", data.user.name); 
        localStorage.setItem("userEmail", data.user.email); 
        navigate("/home"); 
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
            <input type="email" placeholder="Email" name="email" required />
            <input type="password" placeholder="Password" name="password" required />
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
              <p>Enter your personal details and start your journey with us</p>
              <button className="ghost" onClick={() => setIsRightPanelActive(true)}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
