import React, { useState, useEffect } from "react";
import video from "../assets/video/1472527_Culture_Building_1920x1080.mp4";
import SideBar from "../components/sidebar";
import { useLocation } from "react-router-dom";
import "./pages.css";
import axios from "axios";

function Agents() {
  const location = useLocation();
  const [role, setRole] = useState("");
  const [user, setUser] = useState(null);
  const [activeRoute, setActiveRoute] = useState("");
  const [agents, setAgents] = useState([]);
  const [agent, setAgent] = useState({});
  const attribus = ["username", "role"];
  
  const formatDate = (date) => {
    const year = String(date.getFullYear()).slice(2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const [password, setPassword] = useState("");
  const menuItems = [
    { path: "/agent", label: "Add Agent" },
    { path: "/agent/all", label: "All Agent" },
  ];
  const listRoles = ["admin", "agent"];
  async function preparingPassword(event) {
    const date = new Date();
    const formattedDate = formatDate(date);

    try {
      const response = await axios.get("http://localhost:2000/users");
      setAgents(response.data);
      let count = response.data.length;
      setPassword(`${formattedDate}${(count ).toString().padStart(3, "0")}`);
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


  const deleteAgent = async (e) => {
    e.preventDefault();
    const username = e.target.parentElement.firstChild.textContent;
    try {
      const response = await axios.delete(
        `http://localhost:2000/users/${username}`
      );
      console.log(response);
      window.location.reload();
    }
    catch (error) {
      console.error("Error fetching users", error);
    }
  };
  
  const agentMapping = agents.map((agent) => {
    return (
      <tr>
        <td>{agent.username}</td>
        <td>{agent.role}</td>
      
      </tr>
    );
  });
  const handleSelectChange = (event) => {
    setRole(event.target.value);
    handleInputChange(event);
  };
  const handleRoutes = () => {
    const currentPath = location.pathname;
    const matchingItem = menuItems.find((item) => currentPath === item.path);
    setActiveRoute(matchingItem ? matchingItem.path : "");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAgent((prevAgent) => ({
      ...prevAgent,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    agent.motDePasse = password;
    console.log(agent)
    try {
      const response = await axios.post("http://localhost:2000/users/add", agent);
      console.log(response.data);
    } catch (error) {
      console.error("Error inserting user", error);
    }

    setAgent({});
    window.location.reload()
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
            {activeRoute === "/agent" && (
              <div className=" py-20">
                <form className="form-book grid grid-cols-6 gap-5">
                  <label>username</label>
                  <input
                    name="username"
                    onChange={handleInputChange}
                    className="  col-span-2"
                    type="text"
                    placeholder={"username"}
                  />

                  <label>role</label>
                  <select
                    name="role"
                    id="role"
                    value={role}
                    onChange={handleSelectChange}
                    className="col-span-2"
                  >
                    <option value="">Sélectionnez un rôle</option>
                    {listRoles.map((role, index) => (
                      <option key={index} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                  <label>password</label>
                  <input
                    name="motDePasse"
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
                    Add Agent
                  </button>
                </form>
              </div>
            )}
            {activeRoute === "/agent/all" && (
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
                        <th>{attribu}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>{agentMapping}</tbody>
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

export default Agents;
