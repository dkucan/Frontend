import React, { Component } from "react";
import PosudbaDataService from "../../services/posudba.service";
import kazetadataservice from "../../services/kazeta.service";
import Container from 'react-bootstrap/Container';
import {Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import moment from 'moment';

export default class Dodajposudbu extends React.Component {

    constructor (props) {
        super(props);
        const token = localStorage.getItem('Bearer');
        if (token==null || token===''){
            window.location.href='/';
        }
        this.Dodajposudbu.this.Dodajposudbu.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.Dohvatikazetu=this.Dohvatikazetu.bind(this);

        this.state={
            kazeta:[],
            sifraKazeta:0
        };
    }

    componentDidMount(){
        //console.log ("Dohvaćam kazete");
        this.Dohvatikazetu();
    }

    async Dodajposudbu(posudba) {
        const odgovor=await PosudbaDataService.post(posudba);
        if (odgovor.ok){
            //routing na kazete
            window.location.href='/posudba';
        }else{
            // pokaži grešku
            console.log(odgovor);
        }
    }

    async Dohvatikazetu () {

        await kazetadataservice.get()
        .then(response => {
            this.setState({
                kazeta : response.data,
                sifraKazeta: response.data[0].sifra
            });

            //console.log(response.data);
        })
        .catch(e=> {
            console.log(e);
        });
    }

    handleSubmit(e){
        e.preventDefault();
        const podaci=new FormData(e.target);
        console.log(podaci.get('Datum_posudbe'));
        console.log(podaci.get('Datum_vracanja'));
        console.log(podaci.get('Zakasnina'));
        console.log(podaci.get('Clan'));

        let datum = moment.utc(podaci.get('Datum_posudbe')) + '' + podaci.get('Datum_vracanja');
        console.log(datum);

        this.Dodajposudbu({
            Datum_posudbe: podaci.get('Datum_posudbe'),
            Datum_vracanja: podaci.get('Datum_vracanja'),
            Zakasnina: podaci.get('Zakasnina'),
            Clan: podaci.get('Clan'),
        });
    }

    render() { 
        const { kazeta} = this.state;
        
        return (
        
            <Container>
            <Form onSubmit={this.handleSubmit}>

              <Form.Group className="mb-3" controlId="Datum_posudbe">
                <Form.Label>Datum_posudbe</Form.Label>
                <Form.Control type="text" name="Datum_posudbe" placeholder="" maxLength={255} required/>
                </Form.Group>  

                <Form.Group className="mb-3" controlId="kazeta">
                <Form.Label>kazeta</Form.Label>
                <Form.Select onChange={e => {
                this.setState({ sifrakazeta: e.target.value});
                }}>
                {kazeta && kazeta.map((kazeta,index) => (
                <option key={index} value={kazeta.sifra}>{kazeta.naslov}</option>

            ))}
            </Form.Select>
          </Form.Group>

                <Form.Group className="mb-3" controlId="Datum_posudbe">
                <Form.Label>Datum_posudbe</Form.Label>
                <Form.Control type="date" name="Datum_posudbe" placeholder="" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="Datum_vracanja">
<               Form.Label>Datum_vracanja</Form.Label>
                <Form.Control type="date" name="Datum_vracanja" placeholder="" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="Zakasnina">
<               Form.Label>Zakasnina</Form.Label>
                <Form.Control type="text" name="Zakasnina" placeholder="" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="Clan">
<               Form.Label>Clan</Form.Label>
                <Form.Control type="text" name="Clan" placeholder="" />
                </Form.Group>

                <Row>
                <Col>
                <Link className="btn btn-danger gumb" to={`/posudba`}>Odustani</Link>
                </Col>
                <Col>
                <Button variant="primary" className="gumb" type="submit">
                 Dodaj posudbu
                </Button>
                </Col>
                </Row>


                </Form>
                
                </Container>
        );
                }
            }