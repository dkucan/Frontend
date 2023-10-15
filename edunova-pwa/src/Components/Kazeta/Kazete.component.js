import React, {Component} from "react";
import {Button, Container, Table} from "react-bootstrap";
import KazetaDataService from "../../services/kazeta.service";
import {NumericFormat} from "react-number-format";
import {Link} from "react-router-dom";
import {FaEdit, FaTrash} from "react-icons/fa"

export default class kazeta extends Component{

    constructor(props){
        super(props);

        this.state={
            kazeta: []
        }
    }

componentDidMount(){
    this.dohvatiKazetu();
}

async dohvatiKazetu(){
    await KazetaDataService.get()
    .then(response=> {
        this.setState({
            kazeta:response.data
        });
        console.log(response.data);   
    })
    .catch(e=>{
        console.log(e);
    });
}

async obrisikazetu(sifra){
    const odgovor=await KazetaDataService.delete(sifra);
    if(odgovor.ok){
        this.dohvatiKazetu();
    }else{
        alert(odgovor.poruka);
    }
}
    render(){
        
        const {kazeta} = this.state;

        return (
            <Container>
               <a href="/Kazeta/dodaj" className="btn btn-success gumb">
                Dodaj novu kazetu 
               </a>
                
               <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Naslov</th>
                        <th>Godina izdanja</th>
                        <th>Žanr</th>
                        <th>Cijena posudbe</th>
                        <th>Cijena zakasnine</th>
                    </tr>
                </thead>
                <tbody>
                     { kazeta && kazeta.map((kazeta,index) => (

                    <tr key={index}>
                        <td>{kazeta.naslov}</td>
                        <td className="broj">{kazeta.Godina_izdanja}</td>
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

                        <td>{kazeta.naslov}</td>
                        <td className="broj">{kazeta.Godina_izdanja}</td>
                        <td className="broj">
                        <NumericFormat
                                value={kazeta.Cijena_zakasnine}
                                displayType={'text'}
                                thousandSeparator='.'
                                decimalSeparator=','
                                prefix={'€'}
                                decimalScale={2} 
                                fixedDecimalScale/> 
                        </td>
                    </tr>

                   ))}
                </tbody>
               </Table>



            </Container>


        );
    }
}