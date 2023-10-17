import React, { component } from "react";
import clandataservice from "../../services/clan.service";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import {FaEdit} from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';

export default class clan extends component {
    constructor(props) {
     super(props);
     this.dohvaticlan=this.dohvaticlan.bind(this);
   
     this.state={
       clan: [],
       prikaziModal: false
     };
    }

    otvoriModal=() => this.setState({prikaziModal: true});
 zatvoriModal= () => this.setState({prikaziModal: false});

 componentDidMount() {
  this.dohvaticlan();
 }
 dohvaticlan(){
  clandataservice.getAll()
  .then(response=> {
    this.setState({
      clan:response.data
    });
  })
  .catch(e=>{
    console.log(e);
  });
 }

 async obrisiclan(sifra){

  const odgovor=await clandataservice.delete(sifra);
  if(odgovor.ok){
    this.dohvaticlan();
  }else{
    //alert(odgovor.poruka);
    this.otvoriModal();
  }
 }

  render() {
    const { clan} = this.state;
    return (

    <Container>
      <a href="/clan/dodaj" className="btn btn-success gumb">Dodaj novog clana</a>
    <Row>
      {clan && clan.map((p) => (
           
           <Col key={p.sifra} sm={12} lg={3} md={3}>

              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{p.Ime} {p.Prezime}</Card.Title>
                  <Card.Text>
                    {p.Mobitel}
                  </Card.Text>
                  <Row>
                      <Col>
                      <Link className="btn btn-primary gumb" to={`/clan/${p.sifra}`}><FaEdit /></Link>
                      </Col>
                      <Col>
                      <Button variant="danger" className="gumb"  onClick={() => this.obrisiclan(p.sifra)}><FaTrash /></Button>
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