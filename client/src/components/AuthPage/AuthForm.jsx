import React, { useState } from "react"; 
import "../AuthPage/AuthForm.css"; 
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn, FaHeart } from "react-icons/fa"; 
import { useLocation, useNavigate } from "react-router-dom"; 
import "../../styles/colors.css" 

const AuthForm = () => {
  const location = useLocation(); // Get current URL location
  const searchParams = new URLSearchParams(location.search); // Parse URL query parameters
  const defaultForm = searchParams.get("form") || "signIn"; 
  const [isRightPanelActive, setIsRightPanelActive] = useState(defaultForm === "signUp"); // State to toggle panel
  const navigate = useNavigate();

  // Function to handle user sign up
  const handleSignUp = async (e) => {
     // Prevent default form submission
    e.preventDefault();
     // Get user inputs
    const name = e.target.name.value;
    const email = e.target.email.value; 
    const password = e.target.password.value; 

    try {
      const res = await fetch("https://lexiaminds-private-test.onrender.com/api/signup", { // Call signup API
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }), // Send user data
      });

      const data = await res.json(); // Parse response

      if (res.ok) { // If signup successful
        alert(data.message); // Show success message
        // Save user info
        localStorage.setItem("userName", name);
        localStorage.setItem("userEmail", email); 
        // Redirect to home page
        navigate("/home"); 
      } else {
        alert(data.message); // Show error message from server
      }
    } catch (err) {
      console.error(err); 
      alert("Something went wrong during sign up"); // Handle network errors
    }
  };

  // Function to handle user sign in
  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent default form submission
      // Get user inputs
    const email = e.target.email.value; 
    const password = e.target.password.value; 

    try {
      const res = await fetch("https://lexiaminds-private-test.onrender.com/api/signin", { // Call signin API
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // Send user credentials
      });

      const data = await res.json(); // Parse response

      if (res.ok) { // If signin successful
        alert(`Welcome back, ${data.user.name}!`); 
        // Save user info
        localStorage.setItem("userName", data.user.name); 
        localStorage.setItem("userEmail", data.user.email); 
        navigate("/home"); 
      } else {
        alert(data.message); 
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong during sign in"); // Handle network errors
    }
  };

  return (
    <div className="auth-page">
      <div className="floating-element"></div> {/* Decorative floating elements */}
      <div className="floating-element"></div>
      <div className="floating-element"></div>

      <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}> {/* Toggle class for overlay effect */}

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
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" onClick={() => setIsRightPanelActive(true)}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm; // Export component
