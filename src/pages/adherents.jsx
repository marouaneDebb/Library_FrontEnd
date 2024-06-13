import React, { useState, useEffect } from "react";
import video from "../assets/video/1472527_Culture_Building_1920x1080.mp4";
import SideBar from "../components/sidebar";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Adherents() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [activeRoute, setActiveRoute] = useState("");
  const [adherents, setAdherents] = useState([]);
  const [adherent, setAdherent] = useState({});
  const [contact, setContact] = useState({
    mail: "",
    téléphone: "",
    adresse: "",
  });
  const [password, setPassword] = useState("");
  const attribus = [
    { label: "prenom", name: "prénom" },
    { label: "nom", name: "nom" },
    { label: "username", name: "username" },
    { label: "email", name: "mail" },
    { label: "téléphone", name: "téléphone" },
    { label: "adresse", name: "adresse" },
  ];

  const menuItems = [
    { path: "/adherent", label: "Add Adherent" },
    { path: "/adherent/all", label: "All Adherent" },
  ];

  const formatDate = (date) => {
    const year = String(date.getFullYear()).slice(2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };
  async function preparingPassword(event) {
    const date = new Date();
    const formattedDate = formatDate(date);
    setPassword(`${formattedDate}${(1).toString().padStart(3, "0")}`);
    try {
      const response = await axios.get("http://localhost:2000/users");

      let count = response.data.length;
      setPassword(`${formattedDate}${count.toString().padStart(3, "0")}`);
    } catch (error) {
      console.error("Error fetching users", error);
    }

    try {
      const response = await axios.get("http://localhost:2000/adherents");

      setAdherents(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser);
    handleRoutes();
    preparingPassword();
  }, [location]);

  const deleteAdherent = async (adherent) => {
    const username = adherent.username;

    try {
      const response = await axios.delete(
        `http://localhost:2000/adherents/${username}`
      );
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const sendEmail = async (to, subject, text) => {
    try {
      const response = await axios.post("http://localhost:3001/send-email", {
        to,
        subject,
        text,
      });
      console.log(response.data);
    } catch (error) {
      console.log("Error sending email: " + error.message);
    }
  };

  const adherentMapping = adherents.map((adherent) => {
    return (
      <tr>
        <td>{adherent.prénom}</td>
        <td>{adherent.nom}</td>
        <td>{adherent.username}</td>
        <td>{adherent.contact.mail}</td>
        <td>{adherent.contact.téléphone}</td>
        <td>{adherent.contact.adresse}</td>
        <td
          onClick={() => {
            deleteAdherent(adherent);
          }}
        >
          delete
        </td>
      </tr>
    );
  });
  const handleRoutes = () => {
    const currentPath = location.pathname;
    const matchingItem = menuItems.find((item) => currentPath === item.path);
    setActiveRoute(matchingItem ? matchingItem.path : "");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "mail" || name === "téléphone" || name === "adresse") {
      setContact((prevContact) => ({
        ...prevContact,
        [name]: value,
      }));
      setAdherent((prevAdherent) => ({
        ...prevAdherent,
        contact: contact,
      }));
    } else {
      setAdherent((prevAdherent) => ({
        ...prevAdherent,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: adherent.username,
      role: "adherent",
      motDePasse: password,
    };
    try {
      const response = await axios.post(
        "http://localhost:2000/users/add",
        user
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error inserting user", error);
    }
    console.log(adherent);
    try {
      const response = await axios.post(
        "http://localhost:2000/adherents/add",
        adherent
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error inserting user", error);
    }

    sendEmail(
      adherent.contact.mail,
      "Welcome to EmiBook",
      `
        Dear ${adherent.nom + " " + adherent.prénom},

        Welcome to EmiBook!

        We are pleased to inform you that your account has been created successfully. Please find your login credentials below:

        Username: ${adherent.username}
        Temporary Password: ${password}

        For your security, please log in to your account as soon as possible and change your password.

        If you have any questions or need further assistance, feel free to contact our support team.

        Best regards,
        The EmiBook Team
        `
    );

    setAdherent({});
    window.location.reload();
  };
  const myFunction = (e) => {
    e.preventDefault();
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.querySelector("table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
      for (var j = 0; j < td.length; j++) {
        let tdata = td[j];
        if (tdata) {
          txtValue = tdata.textContent || tdata.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
            break;
          } else {
            tr[i].style.display = "none";
          }
        }
      }
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
          <div className="grid grid-cols-2 gap-0">
            {menuItems.map((item) => (
              <a
                key={item.path}
                className={`button ${
                  activeRoute === item.path ? "btn-active" : ""
                }`}
                href={item.path}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div>
            {activeRoute === "/adherent" && (
              <div className=" py-20">
                <form className="form-book grid grid-cols-6 gap-5">
                  {attribus.map((e) => (
                    <React.Fragment>
                      <label>{e.label}</label>
                      <input
                        name={e.name}
                        onChange={handleInputChange}
                        className="  col-span-2"
                        type={e.name == "mail" ? "email" : "text"}
                        placeholder={e.label}
                      />
                    </React.Fragment>
                  ))}
                  <label>password</label>
                  <input
                    name="password"
                    onChange={handleInputChange}
                    className="password col-span-2"
                    type="text"
                    placeholder={password}
                    disabled
                  />
                  <button
                    onClick={handleSubmit}
                    className="col-start-5 col-span-2"
                  >
                    Add Adherent
                  </button>
                </form>
              </div>
            )}
            {activeRoute === "/adherent/all" && (
              <div className="table">
                <input
                  type="text"
                  id="myInput"
                  onChange={(e) => {
                    myFunction(e);
                  }}
                  placeholder="Search .."
                  title="Type in a name"
                />
                <table>
                  <thead>
                    <tr>
                      {attribus.map((attribu) => (
                        <th>{attribu.label}</th>
                      ))}
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>{adherentMapping}</tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
      <footer>
        <p>&copy; 2024 Bibliothèque. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default Adherents;
