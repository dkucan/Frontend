import React, { Component } from "react";
import PosudbaDataService from "../../services/posudba.service";
import kazetadataservice from "../../services/kazeta.service";
import clandataservice from "../../services/clan.service";
import Container from 'react-bootstrap/Container';
import {Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import moment from 'moment';
import {Table} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import kazeta from "../kazeta/kazeta.component";


export default class Promjeniposudbu extends React.Component {

  constructor(props) {
    super(props);
  

    this.posudba = this.dohvatiposudbu();
    this.promjeniposudbu = this.promjeniposudbu.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    


    this.state = {
      
      posudba: {},
      kazeta:[],
      clan: [],
      sifraClan:0,
      pronadjeniClan:[]
      
    };
  }



  async dohvatiposudbu() {
    // ovo mora bolje
    //console.log('Dohvaćam posudbu');
    let href = window.location.href;
    let niz = href.split('/'); 
    await PosudbaDataService.getBySifra(niz[niz.length-1])
      .then(response => {
        let g = response.data;
        g.datum_posudbe = moment.utc(g.datum_posudbe).format("yyyy-MM-DD");
        g.datum_vracanja = moment.utc(g.datum_vracanja).format("yyyy-MM-DD");
        
        console.log(g);
        this.setState({
          posudba: g
        });
       // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  async promjeniposudbu(posudba) {
    const odgovor = await PosudbaDataService.post(posudba);
    if(odgovor.ok){
      // routing na kazete
      window.location.href='/posudba';
    }else{
      // pokaži grešku
      console.log(odgovor);
    }
  }

  async dohvaticlan() {
    let href = window.location.href;
    let niz = href.split('/'); 
    await PosudbaDataService.getClan(niz[niz.length-1])
       .then(response => {
         this.setState({
           polaznici: response.data
         });
 
        // console.log(response.data);
       })
       .catch(e => {
         console.log(e);
       });
   }

   

   async traziClan( uvjet) {

    await clandataservice.traziclan( uvjet)
       .then(response => {
         this.setState({
          pronadeniclan: response.data
         });
 
        // console.log(response.data);
       })
       .catch(e => {
         console.log(e);
       });
   }

   async obrisiclan(posudba, clan){
    const odgovor = await PosudbaDataService.obrisiclan(posudba, clan);
    if(odgovor.ok){
     this.dohvaticlan();
    }else{
     //this.otvoriModal();
    }
   }

   async dodajclan(posudba, clan){
    const odgovor = await PosudbaDataService.dodajclan(posudba, clan);
    if(odgovor.ok){
     this.dohvaticlan();
    }else{
    //this.otvoriModal();
    }
   }
 
  handleSubmit(e) {
    e.preventDefault();
    const podaci = new FormData(e.target);
    console.log(podaci.get('datum_posudbe'));
    console.log(podaci.get('datum_vracanja'));
    let datum = moment.utc(podaci.get('datum_posudbe') + ' ' + podaci.get('datum_vracanja'));
    console.log(datum);

    this.promjeniposudbu({
      
      clan: podaci.get('clan'),
      brojKazeta: podaci.get('brojKazeta'),
      datum_posudbe: podaci.get('datum_posudbe'),
      datum_vracanja: podaci.get('datum_vracanja'),
      zakasnina: podaci.get('zakasnina'),
      sifraClan: podaci.get('sifraClan'),
      sifraKazeta: podaci.get('sifraKazeta'),
      sifraKazeta: podaci.get('sifraKazeta'),
    });
    
  }


  render() { 
    const { kazeta} = this.state;
    const { posudba} = this.state;
    const { clan} = this.state;
    const { pronadeniclan} = this.state;
    console.log(posudba);

    const obradiTrazenje = (uvjet) => {
      this.traziclan( uvjet);
    };

    const odabraniclan = (clan) => {
      //console.log(posudba.sifra + ' - ' + clan[0].sifra);
      if(clan.length>0){
        this.dodajclan(posudba.sifra, clan[0].sifra);
      }
     
    };

    return (
    <Container>
       
        <Form onSubmit={this.handleSubmit}>
          <Row>
          <Col key={1} sm={12} lg={6} md={6}>

          
               
          <Form.Group className="mb-3" controlId="brojKazeta">
                <Form.Label>brojKazeta</Form.Label>
                <Form.Control type="int" name="brojKazeta" placeholder="" maxLength={255} defaultValue={posudba.brojKazeta}  required/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="datum_posudbe">
                <Form.Label>datum_posudbe</Form.Label>
                <Form.Control type="date" name="datum_posudbe" placeholder="" maxLength={255} defaultValue={posudba.datum_posudbe}  required/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="datum_vracanja">
                <Form.Label>datum_vracanja</Form.Label>
                <Form.Control type="date" name="datum_vracanja" placeholder="" maxLength={255} defaultValue={posudba.datum_vracanja}  required/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="zakasnina">
                <Form.Label>zakasnina</Form.Label>
                <Form.Control type="int" name="zakasnina" placeholder="" maxLength={255} defaultValue={posudba.zakasnina}  required/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="sifraClan">
                <Form.Label>sifraClan</Form.Label>
                <Form.Control type="int" name="sifraClan" placeholder="" maxLength={255} defaultValue={posudba.sifraClan}  required/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="sifra">
                <Form.Label>sifra</Form.Label>
                <Form.Control type="int" name="sifra" placeholder="" maxLength={255} defaultValue={posudba.sifra}  required/>
              </Form.Group>


          

              <Row>
                <Col>
                  <Link className="btn btn-danger gumb" to={`/posudba`}>Odustani</Link>
                </Col>
                <Col>
                <Button variant="primary" className="gumb" type="submit">
                  promjeni posudbu
                </Button>
                </Col>
              </Row>
          </Col>
          <Col key={2} sm={12} lg={6} md={6} className="clanPosudba">
          <Form.Group className="mb-3" controlId="clanPosudba">
                <Form.Label>Traži clana</Form.Label>
                
          <AsyncTypeahead
            className="autocomplete"
            clanPosudba="uvjet"
            emptyLabel="Nema rezultata"
            searchText="Tražim..."
            labelKey={(clan) => `${clan.prezime} ${clan.ime}`}
            minLength={3}
            options={pronadeniclan}
            onSearch={obradiTrazenje}
            placeholder="dio imena ili prezimena"
            renderMenuItemChildren={(clan) => (
              <>
                <span>{clan.prezime} {clan.ime}</span>
              </>
            )}
            onChange={odabraniclan}
          />
          </Form.Group>
          <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>clan</th>
                
                </tr>
              </thead>
              <tbody>
              {clan && clan.map((clan,index) => (
                
                <tr key={index}>
                  <td > {clan.ime} {clan.prezime}</td>
                  <td>
                  <Button variant="danger"   onClick={() => this.obrisiclan(posudba.sifra, clan.sifra)}><FaTrash /></Button>
                    
                  </td>
                </tr>
                ))
              }
              </tbody>
            </Table>    
          </Col>
          </Row>

          
         
          
        </Form>


      
    </Container>
    );
  }
}