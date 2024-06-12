import React, { useState } from "react";
import "./auth.css";
import video from "../assets/video/1472560_Education_People_1920x1080.mp4";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [credentials, setCredentials] = useState();
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    try {
      console.log("salam");
      // const response = await axios.post(
      //   "http://192.168.198.73:2000/users/authenticate",
      //   {
      //     username: username,
      //     motDePasse: password,
      //   }
      // );
      const response = {
        data: {
          password: "password",
          role: "adherent",
          username: "admin",
        },
      };

      localStorage.setItem("token", response.data.password);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("user", response.data.username);
      localStorage.setItem("password", password );
      window.location.href = `/${response.data.username}`;
    } catch (error) {
      console.error("Error:", error.message);
      if (error.response.status === 404) {
        // Handle 404 error here
        setError("Invalid username or password");
        console.error("User not found");
      } else {
        // Handle other errors

        console.error("Error:", error.message);
      }
    }
  }
  return (
    <div className="">
      <nav className=" nav grid grid-cols-10 gap-3">
        <h1 className="col-span-8 logo">EmiBook</h1>

        <ul className=" col-span-2 grid grid-cols-4 gap-10">
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li className=" col-span-2">
            {localStorage.getItem("token") ? (
              <a
                className="login"
                href="/"
                onClick={() => {
                  localStorage.setItem("token", "");
                }}
              >
                logout
              </a>
            ) : (
              <a className="login" href="/auth">
                Login
              </a>
            )}
          </li>
        </ul>
      </nav>
      <div class="fullscreen-video-wrap">
        <video src={video} autoPlay autoFocus loop></video>
      </div>
      <main>
        <h1 className="intro">Login</h1>
        <div
          className={error ? "highlight news lg er " : "highlight news lg  "}
        >
          <form className="grid grid-cols-4   gap-7" onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              className="col-span-3"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
            />

            <label>Password</label>
            <input
              className="col-span-3 "
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
            {error && <p className="error col-span-4 ">{error}</p>}

            <button className="col-span-4 " type="submit">
              Login
            </button>
          </form>
        </div>
      </main>

      <footer>
        <p>&copy; 2024 Bibliothèque. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default Login;
