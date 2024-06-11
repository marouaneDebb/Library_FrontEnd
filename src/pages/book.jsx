import React, { useState, useEffect } from "react";
import video from "../assets/video/1472527_Culture_Building_1920x1080.mp4";
import SideBar from "../components/sidebar";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Book() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [activeRoute, setActiveRoute] = useState("");
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({});

  const menuItems = [
    { path: "/books", label: "Add Book" },
    { path: "/books/all", label: "All Books" },
  ];

  const getBooks = async () => {  
    try {
      const response = await axios.get("http://192.168.198.73:2000/books");
  
      setBooks(response.data);

    } catch (error) {
      console.error("Error fetching users", error);
    }
  }


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser);
    handleRoutes();
    getBooks();
   
  }, [location]);

  const deleteBook = async (book) => {
 
 
    try {
      const response = await axios.delete(`http://192.168.198.73:2000/books/${book.isbn}`);
      console.log(response);
      window.location.reload()
    }
    catch (error) {
      console.error("Error fetching users", error);
    }
  };
  

  const bookmapping = books.map((book) => {
    return (
      <tr>
        <td>{book.title}</td>
        <td>{book.isbn}</td>
        <td>{book.authors[0].nom}</td>
        <td>{book.datePublication}</td>
        <td>{book.nmbCopie}</td>
        <td className="status-btn" onClick={()=>{deleteBook(book)}}>delete</td>
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
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    book.authors=auteurs;
    
    console.log(book);
    try {
      const response = await axios.post('http://192.168.198.73:2000/books', book);
      console.log(response);
     setBook({});
     window.location.reload()
      
    } catch (error) {
      console.error("Error fetching users", error);
    }
    
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

  const [auteurs, setAuteurs] = useState([]);
  const [auteur, setAuteur] = useState({});
  const handleAuteurs = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAuteur((prevAuteur) => ({
      ...prevAuteur,
      [name]: value,
    }));
  };
  const [inputSets, setInputSets] = useState([{ nom: "", prénom: "", dateNaissance: "" }]);
  const addAuteur = (e) => {
    e.preventDefault();
 
    setAuteurs((prevAuteurs) => [...prevAuteurs, auteur]);
    setAuteur({});

    setInputSets(
      inputSets.concat([{ nom: "", prénom: "", dateNaissance: "" }])
    );
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
            {activeRoute === "/books" && (
              <div className=" py-20">
                <form
                  id="form-book"
                  className="form-book grid grid-cols-6 gap-5"
                >
                  {[
                    { label: "Title", name: "title" },
                    { label: "ISBN", name: "isbn" },
                    { label: "Date de publication", name: "datePublication" },
                    { label: "Copies disponibles", name: "nmbCopie" },
                  ].map((element) => (
                    <React.Fragment>
                      <label>{element.label}</label>
                      <input
                        name={element.name}
                        onChange={handleInputChange}
                        className=" col-span-2"
                        type="text"
                        placeholder={element.label}
                      />
                    </React.Fragment>
                  ))}
                  <label className="col-start-1">Auteurs</label>
                  <button className="col-start-6" onClick={addAuteur}>+</button>
                  {inputSets.map((inputSet, index) => (
                    <React.Fragment key={index}>
                      <input
                        name={"nom"}
                        
                        onChange={(event) => handleAuteurs(event)}
                        className="col-span-2"
                        type="text"
                        placeholder={"Nom Auteur "+(index+1)}
                      />
                      <input
                        name="prenom"
                       
                        onChange={(event) =>
                          handleAuteurs(event)
                        }
                        className="col-span-2"
                        type="text"
                        placeholder={"Prenom Auteur "+(index+1) }
                      />
                      <input
                        name="dateNaissance"
                        
                        onChange={(event) =>
                          handleAuteurs(event)
                        }
                        className="col-span-2"
                        type="text"
                        placeholder={"Date de Naissance Auteur "+(index+1)}
                      />
                    </React.Fragment>
                  ))}
                  
                  <button
                    onClick={handleSubmit}
                    className="col-start-5 col-span-2"
                  >
                    Add Book
                  </button>
                </form>
              </div>
            )}
            {activeRoute === "/books/all" && (
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
                      <th>Titre</th>
                      <th>ISBN</th>
                      <th>Auteurs</th>
                      <th>Date de publication</th>
                      <th>copies disponibles</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>{bookmapping}</tbody>
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

export default Book;
