import React, { component } from "react";
import clandataservice from "../../services/clan.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";


export default class promjeniclan extends component {

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
    let niz=href.split('niz');
    const odgovor=await clandataservice.put(niz[niz.length-1], clan);
    if (odgovor.ok){
      window.location.href='/clanovi';
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
    Ime: podaci.get('ime'),
    Prezime: podaci.get('prezime'),
    Mobitel: podaci.get('mobitel'),
    OIB: podaci.get('OIB'),
    Datum_uclanjenja:podaci.get('Datum_uclanjenja')
  });

}


render(){

  const {clan}=this.state;

  return (
    <Container>
      <Form onSubmit={this.handleSubmit}>


        <Form.Group className="mb-3" controlID="ime">
          <Form.Label>Ime</Form.Label>
          <Form.Control type="text" name="Ime" placeholder="Pero" maxlength={255} defaultValue={clan.ime} required />
        </Form.Group>

        <Form.Group className="mb-3" controlID="Prezime">
          <Form.Label>Prezime</Form.Label>
          <Form.Control type="text" name="Prezime" placeholder="Perić" maxlength={255} defaultValue={clan.Prezime} required />
        </Form.Group>

        <Form.Group className="mb-3" controlID="Mobitel">
          <Form.Label>Mobitel</Form.Label>
          <Form.Control type="text" name="Mobitel" placeholder="0911234567" defaultValue={clan.Mobitel} required />
        </Form.Group>

        <Form.Group className="mb-3" controlID="OIB">
          <Form.Label>OIB</Form.Label>
          <Form.Control type="text" name="OIB" placeholder="12345678910" defaultValue={clan.OIB} required />
        </Form.Group>
  

            <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/clan`}>Odustani</Link>
            </Col>
            <Col>
            <Button variant="primary" className="gumb" type="submit">
              Promjeni člana
            </Button>
            </Col>
          </Row>
        </Form>


      
    </Container>
    );
  }
}