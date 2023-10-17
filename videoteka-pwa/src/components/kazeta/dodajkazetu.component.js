import React, {component} from "react";
import kazetadataservice from "../../services/kazeta.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from "react-router-dom";




export default class dodajkazetu extends component {

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
        // OBject.keys(formData). forEach(fieldName=> {
        // console.log(fieldName, formData[fieldName]);
        //})

        //console.log(podaci.get('verificiran));
        // You can pass formData as a service body directly:

        let Godina_izdanja=0;
        if(podaci.get('Godina_izdanja').trim().length>0){
            Godina_izdanja=parseInt (podaci.get('Godina_izdanja'))
        }

        this.dodajkazetu({
            Naslov: podaci.get('Naslov'),
            Godina_izdanja: Godina_izdanja,
            Žanr: podaci.get('Žanr'),
            Cijena_posudbe: parseFloat(podaci.get('Cijena_posudbe')),
            Cijena_zakasnine: parseFloat(podaci.get('Cijena_zakasnine')),
        })

    }

    render (){
        return (
            <Container>
                    
            <Form onSubmit={this.handleSubmit}>

                <Form.Group className="mb-3" controlId="Naslov">
                    <Form.Label>Naslov</Form.Label>
                    <Form.Control type = "text" name="Naslov" placeholder="Naslov kazete" maxLength={255} required/>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="Godina_izdanja">
                 <Form.Label>Godina_izdanja</Form.Label>
                 <Form.Control type="text" name="Godina_izdanja" placeholder="130" />   
                </Form.Group>

                <Form.Group className="mb-3" controlId="Žanr">
                <Form.Label>Žanr</Form.Label>
                <Form.Control type="text" name="žanr" maxLength={100} required/>
                
                </Form.Group>

                <Form.Group className="mb-3" controlId="Cijena_posudbe">
                <Form.Label>Cijena posudbe</Form.Label>
                <Form.Control type="text" name="cijena posudbe" placeholder="100" />
                <Form.Text className="text-muted">
                    ne smije biti negativna
                </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="Cijena_zakasnine">
                <Form.Label>Cijena_zakasnine</Form.Label>
                <Form.Control type="text" name="cijena zakasnine" placeholder="100" />
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
                        DodajKazetu
                    </Button>
                    </Col>
                </Row>



            </Form>
        </Container>
    );
}
}
