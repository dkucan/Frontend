import React, {Component} from "react";
import kazetadataservice from "../../services/kazeta.service";
import Container from 'react-bootstrap/Container';
import {Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

export default class promjenikazetu extends React.Component {

    constructor (props){
        super (props);

        this.kazeta=this.dohvatikazetu();
        this.promjenikazetu=this.promjenikazetu.bind(this);
        this.handlesubmit=this.handlesubmit.bind(this);

        this.state={
            kazeta:{}

        };
    }

    async dohvatikazetu(){
        let href=window.location.href;
        let niz= href.split('/');
        await kazetadataservice.getBySifra(niz[niz.length-1])
        .then(response=> {
            this.setState({
                kazeta:response.data
            });

            // console.log(response.data);
        })
        .catch(e=>{
            console.log(e);
        });

    }

    async promjenikazetu (kazeta) {
        // ovo mora bolje

        let href=window.location.href;
        let niz = href.split('/');
        const odgovor= await kazetadataservice.put(niz[niz.length-1], kazeta);
        if (odgovor.ok){
            //routing na kazete
            window.location.href='/kazeta';
        }else{
            //pokaži grešku
            console.log(odgovor);
        }
    }

    handlesubmit(e){

        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data

        const podaci=new FormData(e.target);
        // Object.keys(formData).forEach(fieldName=> {
        // console.log(fieldName, formData[fieldName]);
        //})

        //console.log(podaci.get('verificiran'));
        // You can pass formData as a service body directly:

        this.promjenikazetu({
            naslov: podaci.get('naslov'),
            godina_izdanja:podaci.get('godina_izdanja'),
            zanr: podaci.get('zanr'),
            cijena_posudbe: parseFloat(podaci.get('cijena_posudbe')),
            cijena_zakasnine: parseFloat(podaci.get('cijena_zakasnine')),
        })
      }

    render() {

    const {kazeta} = this.state;

    return(
        <Container>
            <Form onSubmit={this.handleSubmit}>

                <Form.Group className="mb-3" controlId="Naslov">
                <Form.Label>Naslov</Form.Label>
                <Form.Control type="text" name="Naslov" placeholder="Naslov kazete"
                maxLength={255} defaultValue={kazeta.naslov} required />
                </Form.Group>

                <Form.Group className="mb-3" ControlId="Godina_izdanja">
                <Form.Label>Godina_izdanja</Form.Label>
                <Form.Control type="text" name="Godina_izdanja" defaultValue={kazeta.Godina_izdanja} placeholder="130" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="Žanr">
                <Form.Label>Žanr</Form.Label>
                <Form.Control type="text" name="Žanr" placeholder="Žanr"
                maxLength={255} defaultValue={kazeta.žanr} required />    
                </Form.Group>

                <Form.Group className="mb-3" controlId="cijena_posudbe">
                <Form.Label>Cijena_posudbe</Form.Label>
                <Form.Control type="text" name="cijena_posudbe" defaultValue={kazeta.Cijena_posudbe} placeholder="500" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="cijena_zakasnine">
                <Form.Label>Cijena_zakasnine</Form.Label>
                <Form.Control type="text" name="cijena_zakasnine" defaultValue={kazeta.Cijena_zakasnine} placeholder="500" />
                </Form.Group>

                <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/kazete`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Promjeni kazetu 
            </Button>
            </Col>
          </Row>
        </Form>

        
        </Container>
    );
    }
}