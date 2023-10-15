import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Izbornik from './components/izbornik.component';
import Pocetna from './components/pocetna.component';
import NadzornaPloca from './Components/nadzornaploca.component';
import Kazete from './Components/Kazeta/Kazete.component'
import DodajKazetu from './components/Kazeta/DodajKazetu.component';
import PromjeniKazetu from './Components/Kazeta/promijeniKazetu.component';
import Clan from './components/Clan/clanovi.component';
import DodajClana from './components/Clan/dodajClan.component';
import PromjeniClana from './components/Clan/promijeniClan.component';

export default function App() {
  return (
    <Router>
      <Izbornik />
      <Routes>
        <Route path='/' element={<Pocetna />} />
        <Route path='/nadzornaploca' element={<NadzornaPloca/>} />
        <Route path='/Kazeta' element={<Kazete />} />
        <Route path="/Kazete/dodaj" element= {<DodajKazetu />} />
        <Route path="/Kazete/:sifra" element={<PromjeniKazetu />} />
        <Route path="/Clan" element={<Clan />} />
        <Route path="/Clan/dodaj" element={<DodajClana />} />
        <Route path="/polaznici/:sifra" element={<PromjeniClana />} />

      </Routes>
    </Router>
  );
  
}