import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Izbornik from './Components/izbornik.component';
import Pocetna from './Components/pocetna.component';
import NadzornaPloca from './Components/nadzornaploca.component';
import Kazete from './Components/Kazeta/Kazete.component'
import DodajKazetu from './Components/Kazeta/DodajKazetu.component';
import PromjeniKazetu from './Components/Kazeta/promjeniKazetu.component';
import Clan from './Components/Clan/clanovi.component';
import DodajClana from './Components/Clan/dodajClan.component';
import PromjeniClan from './Components/Clan/PromjeniClan.component';

export default function App() {
  return (
    <Router>
      <Izbornik />
      <Routes>
        <Route path='/' element={<Pocetna />} />
        <Route path='/nadzornaploca' element={<NadzornaPloca/>} />
        <Route path='/Kazeta' element={<Kazete />} />
        <Route path="/Kazeta/Dodaj" element= {<DodajKazetu />} />
        <Route path="/Kazeta/:sifra" element={<PromjeniKazetu />} />
        <Route path="/Clan" element={<Clan />} />
        <Route path="/Clan/dodaj" element={<DodajClana />} />
        <Route path="/Clan/:sifra" element={<PromjeniClan />} />

      </Routes>
    </Router>
  );
  
}