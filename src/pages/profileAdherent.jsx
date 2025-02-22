import React, { useState, useEffect } from "react";
import video from "../assets/video/1472527_Culture_Building_1920x1080.mp4";
import SideBar from "../components/sidebar";
import axios from "axios";
import "./pages.css";

function ProfileAdherent() {
  const [adherent, setAdherent] = useState({});
  const attribus = [
    { label: "prenom", name: "prénom" },
    { label: "nom", name: "nom" },
    { label: "username", name: "username" },
    { label: "mot de passe", name: "motDePasse" },
    { label: "email", name: "mail" },
    { label: "téléphone", name: "téléphone" },
    { label: "adresse", name: "adresse" },
  ];

  const changePassword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:2000/users/updatePassword",
        {
          username: adherent.username,
          oldPassword: adherent.motDePasse,
          newPassword: adherent.newPassword,
        }
      );
      window.location.reload();
    } catch (e) {
      if (e.response.status === 400) {
        // Handle 400 error here
        alert("mot de passe non changé essayez plus tard ");
      } else {
        // Handle other errors
        console.error("Error:", e.message);
      }
    }
  };

  const getAdherent = async () => {
    try {
      const response = await axios.get("http://localhost:2000/adherents");
      const user = response.data.find(
        (adherent) => adherent.username === localStorage.getItem("user")
      );
      if (user) {
        user.motDePasse = localStorage.getItem("password");
        setAdherent(user);
      }
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    getAdherent();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdherent({ ...adherent, [name]: value });
    console.log(adherent);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (adherent.newPassword !== undefined) {
      if (adherent.newPassword === "") {
        alert("new password must be filled");
        return;
      } else if (adherent.newPassword.length < 8) {
        alert("password must be at least 8 characters");
        return;
      } else if (adherent.newPassword === adherent.motDePasse) {
        return;
      }
      changePassword();
    }
  };

  return (
    <div>
      <nav className="nav grid grid-cols-10 gap-3">
        <h1 className="col-span-8 logo">EmiBook</h1>
        <ul className="col-span-2 grid grid-cols-4 gap-10">
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li className="col-span-2">
            {localStorage.getItem("token") ? (
              <a
                className="login"
                href="/"
                onClick={() => localStorage.setItem("token", "")}
              >
                Logout
              </a>
            ) : (
              <a className="login" href="/auth">
                Login
              </a>
            )}
          </li>
        </ul>
      </nav>

      <div className="fullscreen-video-wrap">
        <video src={video} autoPlay loop muted></video>
      </div>
      <div className="wrap grid grid-cols-12 gap-0">
        <div className="sidebar col-span-2">
          <SideBar />
        </div>
        <main className="mainb col-span-10">
          <form className="form-book grid grid-cols-6 gap-5">
            {attribus.map((e) => (
              <React.Fragment key={e.name}>
                <label>{e.label}</label>
                <input
                  placeholder={adherent[e.name] || ""}
                  name={e.name !== "motDePasse" ? e.name : "newPassword"}
                  onChange={handleInputChange}
                  className="col-span-2"
                  type={e.name === "mail" ? "email" : "text"}
                  disabled={e.name !== "motDePasse"}
                />
              </React.Fragment>
            ))}
            <button onClick={handleSubmit} className="col-start-5 col-span-2">
              Update Password
            </button>
          </form>
        </main>
      </div>
      <footer>
        <p>&copy; 2024 Bibliothèque. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default ProfileAdherent