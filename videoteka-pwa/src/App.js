import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Izbornik from './components/izbornik.component';
import Pocetna from './components/pocetna.component';
import Nadzornaploca from './components/nadzornaploca.component';
import Kazeta from './components/kazeta/kazeta.component';
import Dodajkazetu from './components/kazeta/dodajkazetu.component';
import Promjenikazetu from './components/kazeta/promjenikazetu.component';
import Clan from './components/clan/clan.component';
import Dodajclan from './components/clan/dodajclan.component';
import Promjeniclan from './components/clan/promjeniclan.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import Posudba from './components/posudba/posudba.component';
import Dodajposudbu from './components/posudba/dodajposudbu.component';
import Promjeniposudbu from './components/posudba/promjeniposudbu.component';
import Login from './components/login.component';


export default function App() {
  return (
    <Router>

   <Izbornik />     
    <Routes>
    

      <Route path='/' Component={Pocetna} />
      <Route path='/nadzornaploca' Component={Nadzornaploca} />
      <Route path='/kazeta' Component={Kazeta} />
      <Route path="/kazeta/dodajkazetu" Component= {Dodajkazetu} />
      <Route path="/kazeta/:sifra" Component={Promjenikazetu} />
      <Route path="/clan" Component={Clan} />
      <Route path="/clan/dodajclan" Component ={Dodajclan} /> 
      <Route path="/clan/:sifra" Component={Promjeniclan} />
      <Route path="/posudba" Component = {Posudba} />
      <Route path="/posudba/dodajposudbu" Component={Dodajposudbu} />
      <Route path="/posudba/:sifra" Component={Promjeniposudbu} />
      <Route path="/login" element={<Login />} />

    </Routes>
  </Router>
  );

}
