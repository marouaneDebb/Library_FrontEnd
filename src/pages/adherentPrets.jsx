import React, { useState, useEffect } from "react";
import video from "../assets/video/1472527_Culture_Building_1920x1080.mp4";
import SideBar from "../components/sidebar";
import { useLocation } from "react-router-dom";
import axios from "axios";
function AdherentPrets() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [activeRoute, setActiveRoute] = useState("");
  const [prets, setPrets] = useState([]);
  const [pret, setPret] = useState({});
  

    const attribus = [
     
      { label: "livre", name: "livreId" },
      { label: "date De Pret", name: "dateDePret" },
      { label: "date De Retour", name: "dateDeRetour" },
  
    ];
  

  const menuItems = [
    { path: "/mesprets", label: "Mes prets" },
  
  ];

  const getPrets = async () => {
    try {
      const response = await axios.get("http://192.168.198.73:2000/loans");
      let l=response.data.filter(
        (pret) => pret.adherentId === localStorage.getItem("user")
      )
      setPrets(l);
    }
    catch (e){
      console.log(e)

    }
  }
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser);
    handleRoutes();
    getPrets();
  }, [location]);
  const pretMapping = prets.map((pret) => {
    return (
      <tr>
       
       
        <td>{pret.livreId}</td>
        <td>{pret.dateDePret}</td>
        <td>{pret.dateDeRetour}</td>
        <td>{pret.status}</td>
      </tr>
    );
  });
  const handleRoutes = () => {
    const currentPath = location.pathname;
    const matchingItem = menuItems.find((item) => currentPath === item.path);
    setActiveRoute(matchingItem ? matchingItem.path : "");
  };
  const handleInputChange = (e) => {
    if (e.target.name === "agent") {
        e.target.value = localStorage.getItem("user");
        setPret((prevPret) => ({
            ...prevPret,
            [e.target.name]: localStorage.getItem("user"),
        }));
        return;
    }
    const { name, value } = e.target;
    setPret((prevPret) => ({
      ...prevPret,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setPret({});
    console.log(pret);
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
          
          <div>
        
          
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
                      <th>status</th>
                    </tr>
                  </thead>
                  <tbody>{pretMapping}</tbody>
                </table>
              </div>
   
          </div>
        </main>
      </div>
      <footer>
        <p>&copy; 2024 Bibliothèque. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default AdherentPrets;
