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
          const posudba = response.data.map(item => ({
            ...item,
            zakasninaEur: item.zakasnina 
        }));
        this.setState({ posudba});
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

                    <th>clan</th>
                    <th>Naslov</th>
                    <th>brojKazeta</th>
                    <th>datum_posudbe</th>
                    <th>datum_vracanja</th>
                    <th>zakasnina</th>
                    
                    <th>promjeniposudbu</th>
                    
                  </tr>
                </thead>
                <tbody>
                {posudba && posudba.map((g,index) => (
                  
                  <tr key={index}>
                    
                    <td className="clan">{g.clan}</td>
                    <td className="Naslov">{g.naslov}</td>
                    <td className="brojKazeta">{g.brojKazeta}</td>
                    <td className="datum_posudbe">{g.datum_posudbe}</td>
                    <td>
                    <p className="datum_vracanja">{g.datum_vracanja}</p>
                    </td>
                    <td>
                    <p className="zakasnina">{g.zakasninaEur} EUR</p>
                    <p className="promjeniposudbu">{g.promjeniposudbu}</p>
                    
                    </td>
                    <td>
                      <Row>
                        <Col>
                          <Link className="btn btn-primary gumb" to={`/posudba/${g.sifra}`}><FaEdit /></Link>
                        </Col>
                        <Col>
                          { g.brojclanova===0 &&
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
        