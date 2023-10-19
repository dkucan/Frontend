import React, { Component } from "react";
import clandataservice from "../../services/clan.service";
import Container from 'react-bootstrap/Container';
import {Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";



export default class promjeniclan extends React.Component {

  constructor (props) {
    super(props);

    this.clan=this.dohvaticlan();
    this.promjeniclan=this.promjeniclan.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);


    this.state={
      clan:{}
    };
  }

  async dohvaticlan(){
    //ovo mora bolje
    let href = window.location.href;
    let niz=href.split('/');
    await clandataservice.getBySifra(niz[niz.length-1])
    .then(response=> {
      this.setState({
        clan: response.data
      });
      //console.log(response.data);
    })
    .catch(e=> {
      console.log(e);
    });
  }

  async promjeniclan(clan){
    //ovo mora bolje

    let href=window.location.href;
    let niz=href.split('/');
    const odgovor=await clandataservice.put(niz[niz.length-1], clan);
    if (odgovor.ok){
      window.location.href='/clan';
    }else{
      //pokaži grešku
      console.log(odgovor);
    }
  }

handleSubmit(e){
  // Prevent the browser from reloading the page
  e.preventDefault();

  // Read the form data
  const podaci = new FormData(e.target);
  //Object.keys(formData).forEach(fieldName=> {
  // console.log(fieldNAme, formData[fieldName]);
  //})

  //console.log(podaci.get('verificiran'));
  // You can pass formData as a service body directly:

  this.promjeniclan({
    ime: podaci.get('ime'),
    prezime: podaci.get('prezime'),
    mobitel: podaci.get('mobitel'),
    oib: podaci.get('oib'),
    datum_uclanjenja:podaci.get('Datum_uclanjenja'),
    adresa: podaci.get('adresa')
  });

}


render(){

  const {clan}=this.state;

  return (
    <Container>
      <Form onSubmit={this.handleSubmit}>


        <Form.Group className="mb-3" controlId="ime">
          <Form.Label>ime</Form.Label>
          <Form.Control type="text" name="ime" placeholder="Pero" maxLength={255} defaultValue={clan.ime} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="prezime">
          <Form.Label>prezime</Form.Label>
          <Form.Control type="text" name="prezime" placeholder="Perić" maxLength={255} defaultValue={clan.prezime} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Mobitel">
          <Form.Label>mobitel</Form.Label>
          <Form.Control type="text" name="mobitel" placeholder="0911234567" defaultValue={clan.mobitel} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="OIB">
          <Form.Label>oib</Form.Label>
          <Form.Control type="text" name="oib" placeholder="12345678910" defaultValue={clan.oib} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="adresa">
          <Form.Label>adresa</Form.Label>
          <Form.Control type="text" name="adresa" placeholder="Dodina 16" defaultValue={clan.adresa} required />
        </Form.Group>

  

            <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/clan`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Promjeni clana
            </Button>
            </Col>
          </Row>
        </Form>


      
    </Container>
    );
  }
}