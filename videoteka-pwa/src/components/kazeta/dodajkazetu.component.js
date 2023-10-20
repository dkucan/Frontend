import React, {Component} from "react";
import kazetadataservice from "../../services/kazeta.service";
import Container from 'react-bootstrap/Container';
import {Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from "react-router-dom";




export default class dodajkazetu extends React.Component {

    constructor (props){
        super(props);
        this.dodajkazetu=this.dodajkazetu.bind(this);
        this.handlesubmit=this.handlesubmit.bind(this);
    }

    async dodajkazetu(kazeta){
        const odgovor=await kazetadataservice.post(kazeta);
        if(odgovor.ok){
            //routing na kazete
            window.location.href='/kazeta';
        }else{
            //pokaži grešku
            //console.log(odgovor.poruka.errors);

            let poruke='';
            for(const key in odgovor.poruka.errors){
                if (odgovor.poruka.errors.hasOwnProperty(key)) {
                    poruke +=`${odgovor.poruka.errors[key]}` + '\n';
                    // console.log(`${key}: ${odgovor.poruka.errors[key]}`);
                }
            }

            alert(poruke);
        }
    }

    handlesubmit(e){
        // Prevent the browser from reloading the page
        e.preventDefault();


        // Read the form data
        const podaci=new FormData(e.target);
        // Object.keys(formData). forEach(fieldName=> {
        // console.log(fieldName, formData[fieldName]);
        //})

        //console.log(podaci.get('verificiran));
        // You can pass formData as a service body directly:

        let godina_izdanja=0;
        if(podaci.get('godina_izdanja').trim().length>0){
            godina_izdanja=parseInt (podaci.get('godina_izdanja'))
        }

        this.dodajkazetu({
            naslov: podaci.get('naslov'),
            godina_izdanja: godina_izdanja,
            zanr: podaci.get('zanr'),
            cijena_posudbe: parseFloat(podaci.get('cijena_posudbe')),
            cijena_zakasnine: parseFloat(podaci.get('cijena_zakasnine')),
        })

    }

   
    render (){
        return (
            <Container>
                    
            <Form onSubmit={this.handlesubmit}>

                <Form.Group className="mb-3" controlId="naslov">
                    <Form.Label>naslov</Form.Label>
                    <Form.Control type = "text" name="naslov" placeholder="Naslov kazete" maxLength={255} required/>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="godina_izdanja">
                 <Form.Label>godina_izdanja</Form.Label>
                 <Form.Control type="text" name="godina_izdanja" placeholder="130" />   
                </Form.Group>

                <Form.Group className="mb-3" controlId="zanr">
                <Form.Label>zanr</Form.Label>
                <Form.Control type="text" name="zanr" maxLength={100} required/>
                
                </Form.Group>

                <Form.Group className="mb-3" controlId="cijena_posudbe">
                <Form.Label>cijena posudbe</Form.Label>
                <Form.Control type="text" name="cijena_posudbe" placeholder="100" />
                <Form.Text className="text-muted">
                    ne smije biti negativna
                </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="cijena_zakasnine">
                <Form.Label>cijena_zakasnine</Form.Label>
                <Form.Control type="text" name="cijena_zakasnine" placeholder="100" />
                <Form.Text className="text-muted">
                    ne smije biti negativna
                </Form.Text>
                </Form.Group>

                <Row>
                    <Col>
                    <Link className="btn btn-danger gumb" to={'/kazeta'}>Odustani</Link>
                    </Col>
                    <Col>
                    <Button variant="primary" className="gumb" type="submit">
                        Dodaj Kazetu
                    </Button>
                    </Col>
                </Row>



            </Form>
        </Container>
    );
}
}
