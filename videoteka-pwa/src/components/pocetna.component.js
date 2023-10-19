import React, { Component } from "react";
import { Container } from "react-bootstrap";
import {Button} from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import {Link} from "react-router-dom";



export default class pocetna extends React.Component{


    render(){
        return (
            <Container>
                <p>VIDEOTEKA APLIKACIJA v1!</p>
                <Link className="btn btn-success gumb" to={`/izbornik`}>Dobrodošli - klikni za ulaz</Link>
              </Container>



        );
    }
}