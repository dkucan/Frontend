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


export default class Promjeniposudbu extends React.Component {

  constructor(props) {
    super(props);
    const token = localStorage.getItem('Bearer');
    if(token==null || token===''){
      window.location.href='/';
    }

    this.posudba = this.dohvatiposudbu();
    this.Promjeniposudbu = this.Promjeniposudbu.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.kazeta = this.dohvatikazetu();
    this.clan = this.dohvaticlan();
    this.obrisiclan = this.obrisiclan.bind(this);
    this.traziclan = this.traziclan.bind(this);
    this.dodajclan = this.dodajclan.bind(this);


    this.state = {
      posudba: {},
      kazeta: [],
      clan: [],
      sifrakazeta:0,
      pronadeniClan: []
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
        g.Datum_posudbe = moment.utc(g.Datum_posudbe).format("yyyy-mm-dd");
        g.Datum_vracanja = moment.utc(g.Datum_vracanja).format("yyyy-mm-dd");
        
        //console.log(g.vrijemePocetka);
        this.setState({
          posudba: g
        });
       // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  

  async Promjeniposudbu(posudba) {
    const odgovor = await PosudbaDataService.post(posudba);
    if(odgovor.ok){
      // routing na kazete
      window.location.href='/posudba';
    }else{
      // pokaži grešku
      console.log(odgovor);
    }
  }


  async dohvatikazetu() {
   // console.log('Dohvaćam kazete');
    await kazetadataservice.get()
      .then(response => {
        this.setState({
          kazeta: response.data,
          sifrakazeta: response.data[0].sifra
        });

       // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  async dohvaticlan() {
    let href = window.location.href;
    let niz = href.split('/'); 
    await PosudbaDataService.getclan(niz[niz.length-1])
       .then(response => {
         this.setState({
           clan: response.data
         });
 
        // console.log(response.data);
       })
       .catch(e => {
         console.log(e);
       });
   }

   

   async traziclan( uvjet) {

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
    console.log(podaci.get('Datum_posudbe'));
    console.log(podaci.get('Datum_vracanja'));
    let datum = moment.utc(podaci.get('Datum_posudbe') + ' ' + podaci.get('Datum_vracanja'));
    console.log(datum);

    this.Promjeniposudbu({
      naziv: podaci.get('Datum_posudbe'),
      Datum_posudbe: datum,
      sifrakazeta: this.state.sifrakazeta
    });
    
  }


  render() { 
    const { kazeta} = this.state;
    const { posudba} = this.state;
    const { clan} = this.state;
    const { pronadeniclan} = this.state;


    const obradiTrazenje = (uvjet) => {
      this.traziclan( uvjet);
    };

    const odabraniClan = (clan) => {
      //console.log(posudba.sifra + ' - ' + clan[0].sifra);
      if(clan.length>0){
        this.dodajclan(posudba.sifra, clan[0].sifra);
      }
     
    };

    return (
    <Container>
       
        <Form onSubmit={this.handleSubmit}>
          <Row>
          <Col key="1" sm={12} lg={6} md={6}>
              <Form.Group className="mb-3" controlId="Datum_posudbe">
                <Form.Label>Datum_posudbe</Form.Label>
                <Form.Control type="text" name="Datum_posudbe" placeholder="" maxLength={255} defaultValue={posudba.Datum_posudbe}  required/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="Kazeta">
                <Form.Label>Kazeta</Form.Label>
                <Form.Select defaultValue={posudba.sifrakazeta}  onChange={e => {
                  this.setState({ sifrakazeta: e.target.value});
                }}>
                {kazeta && kazeta.map((kazeta,index) => (
                      <option key={index} value={kazeta.sifra}>{kazeta.naslov}</option>

                ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="Datum_posudbe">
                <Form.Label>Datum_posudbe</Form.Label>
                <Form.Control type="date" name="Datum_posudbe" placeholder="" defaultValue={posudba.Datum_posudbe}  />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Datum_vracanja">
                <Form.Label>Datum_vracanja</Form.Label>
                <Form.Control type="date" name="Datum_vracanja" placeholder="" defaultValue={posudba.Datum_vracanja}  />
              </Form.Group>

              <Row>
                <Col>
                  <Link className="btn btn-danger gumb" to={`/posudba`}>Odustani</Link>
                </Col>
                <Col>
                <Button variant="primary" className="gumb" type="submit">
                  Promjeni posudbu
                </Button>
                </Col>
              </Row>
          </Col>
          <Col key="2" sm={12} lg={6} md={6} className="clanoviposudba">
          <Form.Group className="mb-3" controlId="uvjet">
                <Form.Label>Traži clana</Form.Label>
                
          <AsyncTypeahead
            className="autocomplete"
            id="uvjet"
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
            onChange={odabraniClan}
          />
          </Form.Group>
          <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Clan</th>
                  <th>Akcija</th>
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