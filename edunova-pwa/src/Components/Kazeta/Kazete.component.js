import React, { Component } from "react";
import { Container, Table } from "react-bootstrap";


export default class Kazeta extends Component{


    render(){
        return (
            <Container>
               <a href="/smjerovi/dodaj" className="btn btn-success gumb">
                Dodaj novi smjer
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