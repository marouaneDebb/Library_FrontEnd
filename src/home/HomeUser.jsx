import React, { useState, useEffect } from "react";
import video from "../assets/video/1472527_Culture_Building_1920x1080.mp4";
import SideBar from "../components/sidebar";

function HomeUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(user);
  }, []);

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
      <div className="grid grid-cols-12 gap-0">
        <div className=" sidebar col-span-2">
          <SideBar />

        </div>

        <main className="mainu col-span-10">
          <section id="home">
            <p className="intro">
              Bienvenue,
              
              
            </p>
            <div class="highlight hours">
              <h3>Heures d'ouverture</h3>
              <p>
                <span className="special">Lundi - Vendredi: </span> 9h00 - 18h00
              </p>
              <p>
                <span className="special">Samedi: </span>10h00 - 16h00
              </p>
              <p>
                <span className="special">Dimanche:</span> Fermé
              </p>
            </div>
            <div class="highlight news">
              <h3>Nouvelles acquisitions</h3>

              <ul>
                <li>
                  <strong>Le dernier roman de Pierre Lemaitre</strong>
                </li>
                <li>
                  <strong>Un guide complet sur le jardinage urbain</strong>
                </li>
                <li>
                  <strong>
                    Des ressources interactives pour apprendre le codage
                  </strong>
                </li>
              </ul>
            </div>
            <div class="highlight events">
              <h3>Événements à venir</h3>
              <p className="special">
                Ne manquez pas nos prochains événements :
              </p>
              <ul>
                <li>
                  -&nbsp;&nbsp; Atelier de lecture pour enfants &nbsp; -&nbsp;
                  12 juin à 14h00
                </li>
                <li>
                  -&nbsp;&nbsp; Conférence sur l'histoire locale &nbsp;-
                  &nbsp;20 juin à 18h00
                </li>
                <li>
                  -&nbsp;&nbsp; Club de lecture mensuel &nbsp;-&nbsp; 25 juin à
                  17h00
                </li>
              </ul>
            </div>
          </section>
        </main>
      </div>
      <footer>
        <p>&copy; 2024 Bibliothèque. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default HomeUser;
