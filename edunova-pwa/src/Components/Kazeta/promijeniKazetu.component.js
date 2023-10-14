import React, {Component} from "react";
import KazetaDataService from "../../services/kazeta.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from "react-router-dom";
import Kazeta from "./Kazete.component";

export default class PromjeniKazetu extends Component {

    constructor (props) {
        super (props);

        this.kazeta=this.dohvatiKazetu();
        this.PromjeniKazetu=this.PromjeniKazetu.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);


        this.state={
            kazeta: {}
        };
    }

    async dohvatiKazetu() {
        let href = window.location.href;
        let niz = href.split ('/');
        await KazetaDataService.getBySifra(niz[niz.length-1])
        .then(response => {
            this.setState({
                kazeta: response.data
            });
            // console.log(response.data);
        })
        .catch(e=> {
            console.log(e);
        });


    }

    async PromjeniKazetu (kazeta) {
        //ovo mora bolje

        let href=window.location.href;
        let niz = href.split('/');
        const odgovor = await KazetaDataService.put(niz[niz.length-1], kazeta);
        if (odgovor.ok){
            //routing na kazete
            window.location.href='/kazete';
        }else{
            //pokaži grešku
            console.log(odgovor);
        }
    }

    handleSubmit (e) {
        //PRevent the browser from reloading the page
        e.preventDefault();

        //Read the form data

        const podaci = newFormData(e.target);
        //Object.keys(formData).forEach(fieldName=> {
            //console.log(fieldName, formData[fieldName]);
        //})

        //console.log(podaci.get('verificiran'));
        //You can pass formData as a service body directly;

        this.PromjeniKazetu({
            naslov:podaci.get('Naslov'),
            Godina_izdanja: podaci.get('Godina_izdanja'),
            Žanr: podaci.get('Žanr'), 
            Cijena_posudbe: parseFloat(podaci.get('cijena_posudbe')),
            Cijena_zakasnine: parseFloat(podaci.get('cijena_zakasnine')),
        });
    }

    render () {
        const {kazeta} = this.state;

        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>

                    <Form.Group className="mb-3" controlId="Naslov">
                        <Form.Label>Naslov</Form.Label>
                        <Form.Control type="text" name="naslov" placeholder="Naslov kazete"
                        maxLength={255} defaultValue={kazeta.naslov} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="Godina_izdanja">
                        <Form.Label>Godina_izdanja</Form.Label>
                        <Form.Control type="text" name="Godina_izdanja" defaultValue={kazeta.Godina_izdanja} placeholder="130" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlID="Žanr">
                        <Form.Label>Žanr</Form.Label>
                        <Form.Control type="text" name="Žanr" placeholder="Žanr kazete"
                        maxLength={255} dafaultValue={kazeta.žanr} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Cijena_posudbe">
                            <Form.Label>Cijena_posudbe</Form.Label>
                            <Form.Control type="text" name="Cijena_posudbe" defaultValue={kazeta.Cijena_posudbe} placeholder="500" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Cijena_zakasnine">
                            <Form.Label>Cijena_zakasnine</Form.Label>
                            <Form.Control type="text" name="Cijena_posudbe" defaultValue={kazeta.Cijena_zakasnine} placeholder="500" />
                        </Form.Group>
                     
                     
                        <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/kazeta`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Promjeni kazeta
            </Button>
            </Col>
          </Row>
        </Form>

    </Container>
       );
    }
  }



 