import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../header/header';
import CharCard from '../charCard/charCard';
import ComCard from '../comCard/comCard';
import {Container, Spinner} from 'reactstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import service from '../../APIServices/service';
import TestCard from '../testCard';
import TemplateHOC from '../templateHOC';

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
                {/* <Route exact path="/" component={CharCard} /> */}
                {/* <Route exact path="/comics/" render={ComCard} /> */}
                {/* <Route exact path="/characters/" component={CharCard} /> */}
                <Route
                  exact
                  path="/characters/"
                  render={props => {
                    return <CharCard {...props} />;
                  }}
                />

                <Route
                  exact
                  path="/comics/"
                  render={props => {
                    return <ComCard {...props} />;
                  }}
                />

                <Route
                  exact
                  path="/comics/:id"
                  render={props => <ComCard {...props} sort={'/comics'} id={props.match.params.id} />}
                />

              </Switch>
            </Container>
          </div>
        </Router>
      </>
    );
  }
}
