
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '../header/header'
import CharCard from "../charCard/charCard"
import { Container, Spinner } from 'reactstrap'
import service from '../../APIServices/service'


export default class App extends Component {


    render() {
        return (
            <>
                <Header />
                <Container className="themed-container align-items-center" fluid={true}>
                    <CharCard />
                </Container>
            </>


        )
    }
}



