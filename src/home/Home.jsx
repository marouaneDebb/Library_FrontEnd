import "./home.css";
import video from "../assets/video/1472527_Culture_Building_1920x1080.mp4";
import { useEffect, useState } from "react";
import axios from "axios";
function Home() {
  if (localStorage.getItem("token")) {
    window.location.href = `/${localStorage.getItem("user")}`;
  }
  const [books, setBooks] = useState([]);
  const getBooks = async () => {  
    try {
      const response = await axios.get("http://192.168.198.73:2000/books");
  
      setBooks(response.data);

    } catch (error) {
      console.error("Error fetching users", error);
    }
  }
  useEffect(() => {
    getBooks();
  }, []);
  const bookmapping = books.map((book) => {
    return (
      <tr>
        <td>{book.title}</td>
        <td>{book.isbn}</td>
        <td>{book.authors[0].nom}</td>
        <td>{book.datePublication}</td>
        <td>{book.nmbCopie}</td>
      
      </tr>
    );
  });
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
    <div className="">
      <nav className=" nav grid grid-cols-10 gap-3">
        <h1 className="col-span-8 logo">EmiBook</h1>

        <ul className=" col-span-2 grid grid-cols-4 gap-10">
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="#books">Books</a>
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
        <section id="home">
          <p className="intro">Bienvenue,</p>
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
            <p className="special">Ne manquez pas nos prochains événements :</p>
            <ul>
              <li>
                -&nbsp;&nbsp; Atelier de lecture pour enfants &nbsp; -&nbsp; 12
                juin à 14h00
              </li>
              <li>
                -&nbsp;&nbsp; Conférence sur l'histoire locale &nbsp;- &nbsp;20
                juin à 18h00
              </li>
              <li>
                -&nbsp;&nbsp; Club de lecture mensuel &nbsp;-&nbsp; 25 juin à
                17h00
              </li>
            </ul>
          </div>
        </section>

        <div id="books" className="table">
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
                <th>Titre</th>
                <th>ISBN</th>
                <th>Auteurs</th>
                <th>Date de publication</th>
                <th>copies disponibles</th>
              </tr>
            </thead>
            <tbody>{bookmapping}</tbody>
          </table>
        </div>
      </main>

      <footer>
        <p>&copy; 2024 Bibliothèque. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
export default Home;
