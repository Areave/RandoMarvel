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
                <Route exact path="/comics/" component={ComCard} />
                <Route exact path="/test/" component={TestCard} />
                <Route exact path="/pers/" component={CharCard} />

                <Route exact path="/test/:id" render={({match})=> <h1>{match.params.id}</h1> } />
                <Route exact path="/pers/:id" render={({match}) => <ComCard id={match.params.id}/>}/>

              </Switch>
            </Container>
          </div>
        </Router>
      </>
    );
  }
}
