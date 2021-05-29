import React, {Component} from 'react';
import Header from '../header/header';
import {Container} from 'reactstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import routerService from '../../Services/RouterService';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
  render() {


    return (
      <>
        <Router>
          <div className="app">
            <Header linkArray={routerService.linkArray} />
            <Container
              className="themed-container align-items-center"
              fluid={true}
            >
              <Switch>
                {routerService.routersArray}
                {/* {routerService.routersSubPageArray} */}
              </Switch>
            </Container>
          </div>
        </Router>
      </>
    );
  }
}
