
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '../header/header'
import CharCard from "../charCard/charCard"
import ComCard from "../comCard/comCard"
import { Container, Spinner } from 'reactstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import service from '../../APIServices/service'


export default class App extends Component {


    render() {
        return (
            <>
                <Router>
                    <Header />


                    <Container className="themed-container align-items-center" fluid={true}>

                        <Route exact path='/' component={CharCard} />
                        <Route exact path='/comics/' component={ComCard} />

                    </Container>
                </Router>
            </>


        )
    }
}



