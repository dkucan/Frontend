import React, {Component} from "react";
import {Button} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import {Table} from 'react-bootstrap';
import kazetadataservice from "../../services/kazeta.service";
import { NumericFormat } from "react-number-format";
import {Link} from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa"

export default class kazeta extends React.Component {

    constructor (props) {
        super(props);

        this.state={
            kazete:[]
        };
    }

    componentDidMount(){
        this.dohvatikazetu();
    }

    async dohvatikazetu(){

        await kazetadataservice.get()
        .then(response=>{
            this.setState({
                kazete:response.data
            });
            console.log(response.data);
        })
        .catch(e=>{
            console.log(e);
        });
    }
    async obisikazetu(sifra){
        const odgovor=await kazetadataservice.delete(sifra);
        if(odgovor.ok){
            this.dohvatikazetu();
        }else{
            alert(odgovor.poruka);
        }
    }
    render() {

        const{kazete} = this.state;

        return (
            <Container>
            <a href="/kazeta/dodaj" className=" btn btn-success gumb">
                Dodaj novu kazetu 
                </a>

                <Table stripped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>naslov</th>
                            <th>godina_izdanja</th>
                            <th>zanr</th>
                            <th>cijena_posudbe</th>
                            <th>cijena_zakasnine</th>
                        </tr>
                        </thead>
                        <tbody>
                            {kazete && kazete.map((kazeta, index) => (
                                <tr key={index}>
                                    <td>{kazeta.naslov}</td>
                                    <td className="broj">{kazeta.godina_izdanja}</td>
                                    <td className="broj">
                                        <NumericFormat
                                        value={kazeta.Cijena_posudbe}
                                        displayType={'text'}
                                        thousandSeparator='.'
                                        decimalSeparator=','
                                        prefix={'€'}
                                        decimalScale={2}
                                        fixedDecimalScale/>
                                    </td>

                                    <td className="sredina">{kazeta.zanr}</td>
                                    <td>
                                        <Link className="btn btn-primary gumb"
                                        to={'/kazeta/${kazeta.sifra}'}>
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
        