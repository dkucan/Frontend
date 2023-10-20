import React, {Component} from "react";
import {Button} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import {Table} from 'react-bootstrap';
import kazetadataservice from "../../services/kazeta.service";
import { NumericFormat } from "react-number-format";
import {Link} from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa"

export default class kazeta extends React.Component {

    constructor (props){
        super(props);
        
        
        this.state={
            kazete: []
        };

    }

    componentDidMount(){
        this.dohvatikazetu();
    }

    async dohvatikazetu(){

        await kazetadataservice.get()
        .then(response=> {
            this.setState({
                kazete:response.data
            });
            console.log(response.data);
        })
        .catch(e=>{
            console.log(e);
        });
    }

    async obrisikazetu(sifra){
        const odgovor= await kazetadataservice.delete(sifra);
        if(odgovor.ok){
            this.dohvatikazetu();
        }else{
            alert(odgovor.poruka);
        }
    }

       render() {

        const{ kazete } = this.state;

        return (
            <Container>
            <a href="/kazeta/dodajkazetu" className=" btn btn-success gumb">
                Dodaj novu kazetu 
                </a>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>naslov</th>
                            <th>godina_izdanja</th>
                            <th>zanr</th>
                            <th>cijena_posudbe</th>
                            <th>cijena_zakasnine</th>
                            <th>promjeni_kazetu</th>
                        </tr>
                        </thead>
                        <tbody>
                            {kazete && kazete.map((kazeta, index) => (

                                <tr key={index}>
                                    <td>{kazeta.naslov}</td>
                                    <td className="broj">{kazeta.godina_izdanja}</td>
                                    <td className="broj">{kazeta.zanr}</td>

                                    <td className="sredina">
                                    <NumericFormat
                                        value={kazeta.cijena_posudbe}
                                        displayType={'text'}
                                        prefix={'€'}
                                        />
                                    </td>
                                    <td className="sredina">
                                    <NumericFormat
                                        value={kazeta.cijena_zakasnine}
                                        displayType={'text'}
                                        prefix={'€'}
                                        />
                                    </td>
                                    <td>
                                        <Link className="btn btn-primary gumb"
                                        to={`/kazeta/${kazeta.sifra}`}>
                                            <FaEdit />
                                        </Link>

                                        <Button variant="danger" className="gumb"
                                        onClick={()=>this.obrisikazetu(kazeta.sifra)}>
                                           
                                            <FaTrash />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        </Table>
                    
                    
                    </Container>
                );

            }
                       
        }
        