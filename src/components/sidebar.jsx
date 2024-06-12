import "./sidebar.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function SideBar() {
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState("");
  const menuItems = [
    {
      path: "/" + localStorage.getItem("user"),
      label: "Home",
      role: ["admin", "adherent", "agent"],
    },
    { path: "/books", label: "Books", role: ["admin", "agent"] },
    { path: "/adherent", label: "Adherents", role: ["admin", "agent"] },
    { path: "/pret", label: "prets", role: ["admin", "agent"] },
    {
      path: `/${localStorage.getItem("user")}/mesprets`,
      label: "Mes Prets",
      role: ["adherent"],
    },
    {
      path: `/${localStorage.getItem("user")}/profile`,
      label: "Mon Profile",
      role: ["adherent"],
    },
    { path: "/agent", label: "Agents", role: ["admin"] },
  ];

  useEffect(() => {
    handleRoutes();
  }, [location]);

  const handleRoutes = () => {
    const currentPath = location.pathname;
    var matchingItem = menuItems.find((item) =>
      currentPath==item.path 
    );
    if(!matchingItem){
      matchingItem = menuItems.find((item) =>
        currentPath.includes(item.path) 
      );
    }
    setActiveRoute(matchingItem ? matchingItem.path : "");
  };

  return (
    <div className="py-20">
      <ul className="grid gap-14">
        {menuItems
          .filter((item) => item.role.includes(localStorage.getItem("role")))
          .map((item) => (
            <li
              key={item.path}
              className={`option ${activeRoute === item.path && "active"}`}
            >
              <a
                className={` ${activeRoute === item.path && "aactive"}`}
                href={item.path}
              >
                {item.label}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default SideBar;
