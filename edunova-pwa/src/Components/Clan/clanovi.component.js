import React, { Component } from "react";
import ClanDataService from "../../services/clan.service";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import {FaEdit} from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { Modal } from 'react-bootstrap;'


export default class clanovi extends Component {
 constructor(props) {
  super(props);
  this.dohvatiClan=this.dohvatiClan.bind(this);

  this.state={
    clanovi: [],
    prikaziModal: false
  };
 }



 otvoriModal=() => this.setState({prikaziModal: true});
 zatvoriModal= () => this.setState({prikaziModal: false});

 componentDidMount() {
  this.dohvatiClan();
 }
 dohvatiClan(){
  ClanDataService.getAll()
  .then(response=> {
    this.setState({
      clan:response.data
    });
  })
  .catch(e=>{
    console.log(e);
  });
 }

 async obrisiClan(sifra){

  const odgovor=await ClanDataService.delete(sifra);
  if(odgovor.ok){
    this.dohvatiClan();
  }else{
    //alert(odgovor.poruka);
    this.otvoriModal();
  }
 }

  render() {
    const { clanovi} = this.state;
    return (

    <Container>
      <a href="/clan/dodaj" className="btn btn-success gumb">Dodaj novog clana</a>
    <Row>
      {clanovi && clanovi.map((p) => (
           
           <Col key={p.sifra} sm={12} lg={3} md={3}>

              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{p.Ime} {p.Prezime}</Card.Title>
                  <Card.Text>
                    {p.Mobitel}
                  </Card.Text>
                  <Row>
                      <Col>
                      <Link className="btn btn-primary gumb" to={`/clanovi/${p.sifra}`}><FaEdit /></Link>
                      </Col>
                      <Col>
                      <Button variant="danger" className="gumb"  onClick={() => this.obrisiClan(p.sifra)}><FaTrash /></Button>
                      </Col>
                    </Row>
                </Card.Body>
              </Card>
            </Col>
          ))
      }
      </Row>


      <Modal show={this.state.prikaziModal} onHide={this.zatvoriModal}>
              <Modal.Header closeButton>
                <Modal.Title>Greška prilikom brisanja</Modal.Title>
              </Modal.Header>
              <Modal.Body>Clan se nalazi na jednoj ili više posudbi i ne može se obrisati.</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.zatvoriModal}>
                  Zatvori
                </Button>
              </Modal.Footer>
            </Modal>

    </Container>


    );
    
        }
}