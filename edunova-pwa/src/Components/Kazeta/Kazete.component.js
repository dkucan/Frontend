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
                    {/* Ovdje će doći podaci s backend-a */}
                </tbody>
               </Table>



            </Container>


        );
    }
}