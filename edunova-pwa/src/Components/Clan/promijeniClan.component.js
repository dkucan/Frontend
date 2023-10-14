import React, { Component } from "react";
import ClankDataService from "../../services/clan.service";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";




export default class PromjeniClan extends Component {

  constructor(props) {
    super(props);

    this.polaznik = this.dohvatiClan();
    this.PromjeniClan = this.PromjeniClan.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    


    this.state = {
      polaznik: {}
    };
  }


  async dohvatiClan() {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    await ClankDataService.getBySifra(niz[niz.length-1])
      .then(response => {
        this.setState({
          polaznik: response.data
        });
       // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  async PromjeniClan(Clan) {
    // ovo mora bolje
    let href = window.location.href;
    let niz = href.split('/'); 
    const odgovor = await ClanDataService.put(niz[niz.length-1],Clan);
    if(odgovor.ok){
      window.location.href='/clanovi';
    }else{
      // pokaži grešku
      console.log(odgovor);
    }
  }



  handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const podaci = new FormData(e.target);
    //Object.keys(formData).forEach(fieldName => {
    // console.log(fieldName, formData[fieldName]);
    //})
    
    //console.log(podaci.get('verificiran'));
    // You can pass formData as a service body directly:

    this.PromjeniClan({
      Ime: podaci.get('ime'),
      Prezime: podaci.get('prezime'),
      Oib: podaci.get('oib'),
      Mobitel: podaci.get('Mobitel')
    });
    
  }


  render() {
    
    const { Clan} = this.state;

    return (
    <Container>
        <Form onSubmit={this.handleSubmit}>


        <Form.Group className="mb-3" controlId="Ime">
            <Form.Label>Ime</Form.Label>
            <Form.Control type="text" name="Ime" placeholder="Pero" maxLength={255} defaultValue={Clan.Ime} required/>
          </Form.Group>


          <Form.Group className="mb-3" controlId="Prezime">
            <Form.Label>Prezime</Form.Label>
            <Form.Control type="text" name="Prezime" placeholder="Perić" defaultValue={Clan.Prezime}  required />
          </Form.Group>


          <Form.Group className="mb-3" controlId="Mobitel">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="Mobitel" placeholder="0911234567" defaultValue={Clan.Mobitel}  />
          </Form.Group>

          <Form.Group className="mb-3" controlId="OIB">
            <Form.Label>OIB</Form.Label>
            <Form.Control type="text" name="OIB" placeholder="" defaultValue={Clan.oib}  />
          </Form.Group>

        
         
          <Row>
            <Col>
              <Link className="btn btn-danger gumb" to={`/polaznici`}>Odustani</Link>
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