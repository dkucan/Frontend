import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import izbornik from './components/izbornik.component';
import pocetna from './components/pocetna.component';
import nadzornaploca from './components/nadzornaploca.component';
import kazeta from './components/kazeta/kazeta.component';
import dodajkazetu from './components/kazeta/dodajkazetu.component';
import promjenikazetu from './components/kazeta/promjenikazetu.component';
import clan from './components/clan/clan.component';
import dodajclan from './components/clan/dodajclan.component';
import promjeniclan from './components/clan/promjeniclan.component';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Router>

    <izbornik />
    <Routes>
    
      <Route path='/' element={<pocetna />} />
      <Route path='/nadzornaploca' element={<nadzornaploca/>} />
      <Route path='/kazeta' element={<kazeta />} />
      <Route path="/kazeta/dodaj" element= {<dodajkazetu />} />
      <Route path="/kazeta/:sifra" element={<promjenikazetu />} />
      <Route path="/clan" element={<clan />} />
      <Route path="/clan/dodaj" element={<dodajclan />} />
      <Route path="/clan/:sifra" element={<promjeniclan />} />

    </Routes>
  </Router>
  );

}
