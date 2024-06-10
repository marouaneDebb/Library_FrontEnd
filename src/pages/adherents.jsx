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
  const [adherent, setAdherent] = useState({
  });
  const [password, setPassword] = useState("");
  const attribus = ["prenom", "nom","username", "email", "telephone", "adresse"];

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

    try {
      const response = await axios.get("http://localhost:5000/users");
      let count = response.data.filter((agent) =>
        agent.password.includes(formattedDate)
      ).length;
      setPassword(`${formattedDate}${(count + 1).toString().padStart(3, "0")}`);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser);
    handleRoutes();
    preparingPassword();
    setAdherents([
      {
        prenom: "Sample Title",
        nom: "Sample Author",
        username: "Sample Date",
        email: "Sample Date",
        telephone:"25",
        adresse:"25 quartier ville pays"
      },
      {
        prenom: "Sample Title",
        nom: "Sample Author",
        username: "Sample Date",
        email: "Sample Date",
        telephone:"25",
        adresse:"25 quartier ville pays"
      },
    ]);

  }, [location]);
  const adherentMapping=adherents.map((adherent) => {
    return (
      <tr>
        <td>{adherent.prenom}</td>
        <td>{adherent.nom}</td>
        <td>{adherent.username}</td>
        <td>{adherent.email}</td>
        <td>{adherent.telephone}</td>
        <td>{adherent.adresse}</td>
        
      </tr>
    );
  }
  );
  const handleRoutes   = () => {
    const currentPath = location.pathname;
    const matchingItem = menuItems.find((item) => currentPath === item.path);
    setActiveRoute(matchingItem ? matchingItem.path : "");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdherent(prevAdherent => ({
      ...prevAdherent,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username:adherent.username,
      role: "adherent",
      password: password,
    };
    try {
      const response = await axios.post("http://localhost:5000/users", user);
      console.log(response.data);
    } catch (error) {
      console.error("Error inserting user", error);
    }

    setAdherent({});
    window.location.reload();
  }
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
                {attribus.map((label) => (
                  <React.Fragment>
                    <label >{label}</label>
                    <input name={label} onChange={handleInputChange} className="  col-span-2" type="text" placeholder={label} />
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
                <button onClick={handleSubmit} className="col-start-5 col-span-2">Add Adherent</button>
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
                <table >
                  <thead>
                    <tr>
                        {attribus.map((attribu) => (
                            <th>{attribu}</th>
                        ))}
                     
                    </tr>
                  </thead>
                  <tbody>
                    {adherentMapping}
                  </tbody>
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
