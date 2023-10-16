import React, { Component } from "react";
import ClanDataService from "../../services/clan.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";


export default class dodajClan extends Component {

constructor (props) {
    super(props);
    this.dodajClan=this.dodajClan.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
}
async dodajClan(kazeta) {
    const odgovor=await ClanDataService.post(kazeta);
    if (odgovor.ok){
        //routing na kazete
        window.location.href='/clanovi';
    }else{
        //pokaži grešku
        console.log(odgovor);
    }
}


    handlesubmit(e) {
        e.preventDefault();
        const podaci=new FormData(e.target);

        this.dodajClan({
           ime: podaci.get('ime'),
           Prezime: podaci.get('prezime'),
           OIB: podaci.get('OIB'),
           Mobitel: podaci.get('Mobitel'),
           Datum_uclanjenja: podaci.get('Datum_uclanjenja'),
        });
    }

    
    
    render () {
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
  
                <Form.Group className="mb-3" controlId="Prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="Prezime" placeholder="Perić" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="mobitel">
                        <Form.Label>Mobitel</Form.Label>
                        <Form.Control type="text" name="mobitel" placeholder="0911234567" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="OIB">
                        <Form.Label>OIB</Form.Label>
                        <Form.Control type="text" name="OIB" placeholder="12345678910" />
                    </Form.Group>


                    <Row>
                        <Col>
                        <Link className="btn btn-danger gumb" to={'/clanovi'}>Odustani</Link>
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