import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import logo from '../logo.svg';


export default class izbornik extends React.Component{


    render(){

      const token = localStorage.getItem('Bearer');
      //console.log(token);
      const autoriziran =  token!==null && token!=='';
  
    //  console.log(autoriziran);
  
        return (

            <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Brand href="/"> <img className="App-logo" src={logo} alt="" /> Videoteka App</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/nadzornaploca">Nadzorna ploča</Nav.Link>
                  <NavDropdown title="Aplikacija" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/kazeta">kazeta</NavDropdown.Item>
                    <NavDropdown.Item href="/clan">
                      clanovi
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/posudba">posudba</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item target="_blank" href="/swagger/index.html">
                      Swagger
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="/odjava">Odjava</Nav.Link>
          
          </Nav>   
        </Navbar.Collapse>
         

        { !autoriziran && 
        <Nav.Link href="/login">Prijava</Nav.Link>
         }
      </Container>
    </Navbar>


        );
    }
}