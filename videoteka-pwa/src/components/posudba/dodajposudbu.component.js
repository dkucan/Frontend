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

export default class DodajPosudbu extends React.Component {

    constructor (props) {
        super(props);

        
      
        this.dodajposudbu=this.dodajPosudbu.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.dohvatikazetu=this.dohvatiKazetu.bind(this);
        

        this.state={
            kazeta:[],
            sifraKazeta:0
        };
    }

    componentDidMount(){
        //console.log ("Dohvaćam kazete");
        this.dohvatiKazetu();
    }

    async dodajPosudbu(posudba) {
        const odgovor=await PosudbaDataService.post(posudba);
        if (odgovor.ok){
            //routing na kazete
            window.location.href='/posudba';
        }else{
            // pokaži grešku
            console.log(odgovor);
        }
    }

    async dohvatiKazetu () {

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

        console.log(podaci.get('clan'));
        console.log(podaci.get('naslov'));
        console.log(podaci.get('datum_posudbe'));
        console.log(podaci.get('datum_vracanja'));
        console.log(podaci.get('zakasnina'));
        

        let datum = moment.utc(podaci.get('datum_posudbe')) + '' + podaci.get('datum_vracanja');
        console.log(datum);

        this.dodajposudbu({

            clan: podaci.get('clan'),
            naslov: podaci.get('naslov'),
            datum_posudbe: podaci.get('datum_posudbe'),
            datum_vracanja: podaci.get('datum_vracanja'),
            zakasnina: podaci.get('zakasnina'),
            
        });
    }

    render() { 
        const { kazeta} = this.state;
        
        return (
        
            <Container>
            <Form onSubmit={this.handleSubmit}>

              <Form.Group className="mb-3" controlId="clan">
                <Form.Label>clan</Form.Label>
                <Form.Control type="text" name="clan" placeholder="" maxLength={255} required/>
                </Form.Group>  

                <Form.Group className="mb-3" controlId="naslov">
                <Form.Label>naslov</Form.Label>
                <Form.Select onChange={e => {
                this.setState({ sifrakazeta: e.target.value});
                }}>
                {kazeta && kazeta.map((kazeta,index) => (
                <option key={index} value={kazeta.sifra}>{kazeta.naslov}</option>

            ))}
            </Form.Select>
          </Form.Group>

                <Form.Group className="mb-3" controlId="datum_posudbe">
                <Form.Label>datum_posudbe</Form.Label>
                <Form.Control type="datetime" name="datum_posudbe" placeholder="" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="datum_vracanja">
<               Form.Label>datum_vracanja</Form.Label>
                <Form.Control type="datetime" name="datum_vracanja" placeholder="" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="zakasnina">
<               Form.Label>zakasnina</Form.Label>
                <Form.Control type="text" name="zakasnina" placeholder="" />
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