import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../header/header';
import CharCard from '../charCard/charCard';
import ComCard from '../comCard/comCard';
import { Container, Spinner } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import service from '../../APIServices/service';

export default class App extends Component {
  render() {
    return (
      <>
        <Router>
          <div className="app">
            <Header />

            <Container
              className="themed-container align-items-center"
              fluid={true}
            >
              <Switch>
                <Route exact path="/" component={CharCard} />
                <Route exact path="/comics/" component={ComCard} />
              </Switch>
            </Container>
          </div>
        </Router>
      </>
    );
  }
}
