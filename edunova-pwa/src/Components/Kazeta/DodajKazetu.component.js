import React, {Component} from "react";
import KazetaDataService from "../services/kazeta.service";
import Container from "react-bootstrap/Containter";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";




export default class DodajKazetu extends Component {

    constructor (props) {
        super(props);
        this.DodajKazetu = this.DodajKazetu.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async DodajKazetu (kazeta) {
        const odgovor = await KazetaDataService.post (kazeta);
        if (odgovor.ok){
            //routing na kazete
            window.location.href="/kazete";
        }else{
            //pokaži grešku
            //console.log(odgovor.poruka.errors);
            let poruke = '';
            for (const key in odgovor.poruka.errors){
                if (odgovor.poruka.errors.hasOwn.Property(key)){
                    poruke += '${odgovor.poruka.errors[key]}' + "\n";
                    //console.log('${key}: ${odgovor.poruka.errors[key]}');
                }
            }


            alert(poruke);
        }
    }

    handleSubmit (e) {
        //prevent the browser from reloading the page
        e.preventDefault ();

        // Read the form data 
        const podaci = new FormData (e.target);
        //Object.keys (formData).forEach (fieldName => {
            //console.log(fieldName, formData[fieldName]);
            //})

            //console.log(podaci.get('verificiran));
            // You can pass formData as a service body directly;

            let Godina_izdanja=0;
            if (podaci.get('trajanje').trim().length>0){
                trajanje = parseInt(podaci.get ('Godina_izdanja'))
            }

            this.DodajKazetu({
              Naslov: podaci.get ('naslov'),
              Godina_izdanja: Godina_izdanja,
              Zanr: zanr,
              Cijena_posudbe: parseFloat(podaci.get('cijena')),
              Cijena_zakasnine: parseFloat (podaci.get('upisnina')),  
            });

            }
        
        render () {
            return (
                <Container>
                    <Form onSubmit={this.handleSubmit}>

                        <Form.Group className="mb-3" controlId="naslov">
                            <Form.Label>Naslov</Form.Label>
                            <Form.Control type ="text" name="naslov" placeholder="Naslov kazete" maxLength={255} required/>
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="Godina_izdanja">
                         <Form.Label>Godina_izdanja</Form.Label>
                         <Form.Control type="text" name="Godina_izdanja" placeholder="130" />   
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="žanr">
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
