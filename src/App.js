import React from 'react';
import Home from './home/Home';
import './App.css';
import Auth from './auth/auth';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import HomeUser from './home/HomeUser';
import ProtectedRoute from './auth/ProtectedRoute';
import Book from './pages/book'
import Adherents from './pages/adherents';
import Prets from './pages/prets';
import Agents from './pages/agents';
import AdherentPrets from './pages/adherentPrets';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" Component={Auth} />
        <Route path="/" Component={Home}  />
        <Route path="/about" element={<h1>ce projet est dans le cadre de la matiere NoSql Bds , encadré par Mme A.El Kasiri et Réalisé par : AABOUCHE MOHAMMED ,DEBBAGH MAROUANE , EL HASSANI ADNANE , LAHNIN AYMANE </h1>} />
        <Route path="/contact" element={<h1>"Vous pouvez nous trouver à l'École Mohammadia d'Ingénieurs, ou nous joindre aux numéros suivants : xxxxxxxxxx, xxxxxxxxxx, xxxxxxxxxx, xxxxxxxxxx."</h1>} />
        <Route path="/adherent/*" element={<ProtectedRoute element={<Adherents />} role={["agent","admin"]} />} />
        <Route path="/:id" element={<ProtectedRoute element={<HomeUser />} role={["adherent","agent","admin"]} />} />
        <Route path="/books/*" element={<ProtectedRoute element={<Book />} role={["agent","admin"]}/>} />
        <Route path="/pret/*" element={<ProtectedRoute element={<Prets />}role={["agent","admin"]} /> } />
        <Route path="/agent/*" element={<ProtectedRoute element={<Agents  />}  role={["admin"]}/> } />
        <Route path="/:id/mesprets" element={<ProtectedRoute element={<AdherentPrets />} role={["adherent","agent","admin"]} />} />
        <Route path="*" element={<h1>Not Found</h1>} />


      </Routes>
    </Router>
   
  );
}

export default App;
