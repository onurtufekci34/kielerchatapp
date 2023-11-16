import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Kieler Chat App</span>
        <span className="title">Sign up Page</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Your E-Mail" />
          <input required type="password" placeholder="Your Password" />
          <button>Login</button>
          {error && <span>There is an error</span>}
        </form>
        <p>
          If you don not have a membership<Link to="/register"> Sign up</Link>
        </p>
      </div>
    </div>
  );
}
