import React, { Component } from "react";
import PosudbaDataService from "../../services/posudba.service";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Table} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import moment from 'moment';
import { Modal } from 'react-bootstrap';



export default class Posudba extends React.Component {
    constructor(props) {
      super(props);
      
      
      this.dohvatiposudbu = this.dohvatiposudbu.bind(this);
  
      this.state = {
        posudba: [],
        prikaziModal: false
      };
    }
  
    otvoriModal = () => this.setState({ prikaziModal: true });
    zatvoriModal = () => this.setState({ prikaziModal: false });
  
  
    componentDidMount() {
      this.dohvatiposudbu();
    }
    dohvatiposudbu() {
      PosudbaDataService.getAll()
        .then(response => {
          this.setState({
            posudba: response.data
          });
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
    }
  
    async obrisiposudbu(sifra){
      
      const odgovor = await PosudbaDataService.delete(sifra);
      if(odgovor.ok){
       this.dohvatiposudbu();
      }else{
       this.otvoriModal();
      }
      
     }
  
    render() {
      const {posudba} = this.state;
      return (
  
      <Container>
        <a href="/posudba/dodajposudbu" className="btn btn-success gumb">Dodaj novu posudbu</a>
        <Table striped bordered hover responsive>
                <thead>
                  <tr>

                    <th>Clan</th>
                    <th>Naslov</th>
                    <th>Datum_posudbe</th>
                    <th>Datum_vracanja</th>
                    <th>Zakasnina</th>
                    
                  </tr>
                </thead>
                <tbody>
                {posudba && posudba.map((g,index) => (
                  
                  <tr key={index}>
                    <td> 
                      <p className="naslovKazeta">{g.naziv} ({g.brojClanova})</p>
                      {g.kazeta}
                    </td>
                    <td className="naslovKazeta">
                      {g.datum_posudbe==null ? "Nije definirano" :
                      moment.utc(g.datum_posudbe).format("yyyy-mm-dd")}
                    </td>
                    <td>
                      <Row>
                        <Col>
                          <Link className="btn btn-primary gumb" to={`/posudba/${g.sifra}`}><FaEdit /></Link>
                        </Col>
                        <Col>
                          { g.brojClanova===0 &&
                               <Button variant="danger"  className="gumb" onClick={() => this.obrisiposudbu(g.sifra)}><FaTrash /></Button>
                          }
                        </Col>
                      </Row>
                      
                    </td>
                  </tr>
                  ))
                }
                </tbody>
              </Table>     
  
               <Modal show={this.state.prikaziModal} onHide={this.zatvoriModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Greška prilikom brisanja</Modal.Title>
                </Modal.Header>
                <Modal.Body>Posudba ima člana.</Modal.Body>
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
        