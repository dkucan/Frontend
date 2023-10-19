import React, { Component } from "react";
import clandataservice from "../../services/clan.service";
import Container from 'react-bootstrap/Container';
import {Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";


export default class dodajclan extends React.Component {

constructor (props) {
    super(props);
    this.dodajclan=this.dodajclan.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
}
async dodajclan(kazeta) {
    const odgovor=await clandataservice.post(kazeta);
    if (odgovor.ok){
        //routing na kazete
        window.location.href='/clan';
    }else{
        //pokaži grešku
        console.log(odgovor);
    }
}


    handlesubmit(e) {
        e.preventDefault();
        const podaci=new FormData(e.target);

        this.dodajclan({
           ime: podaci.get('ime'),
           Prezime: podaci.get('prezime'),
           oib: podaci.get('oib'),
           mobitel: podaci.get('mobitel'),
           datum_uclanjenja: podaci.get('datum_uclanjenja'),
           adresa: podaci.get('adresa'),
     
        });
    }

    
    
    render () {
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>

                <Form.Group className="mb-3" controlId="ime">
                    <Form.Label>ime</Form.Label>
                    <Form.Control type="text" name="ime" placeholder="Pero" required />
                    </Form.Group>

                <Form.Group className="mb-3" controlId="prezime">
                    <Form.Label>prezime</Form.Label>
                    <Form.Control type="text" name="prezime" placeholder="Perić" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="mobitel">
                        <Form.Label>mobitel</Form.Label>
                        <Form.Control type="text" name="mobitel" placeholder="0911234567" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="oib">
                        <Form.Label>oib</Form.Label>
                        <Form.Control type="text" name="oib" placeholder="12345678910" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="adresa">
                        <Form.Label>adresa</Form.Label>
                        <Form.Control type="text" name="adresa" placeholder="Dodina 16" />
                    </Form.Group>


                    <Row>
                        <Col>
                        <Link className="btn btn-danger gumb" to={'/clan'}>Odustani</Link>
                        </Col>
                        <Col>
                        <Button variant="primary" className="gumb" type = "submit">
                            DodajClana
                        </Button>
                        </Col>
                    </Row>


                </Form>
            </Container>
        
        );
    }
}