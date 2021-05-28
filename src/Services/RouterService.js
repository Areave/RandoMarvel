import {Route, Link} from 'react-router-dom';
import CharCard from '../components/charCard/charCard';
import ComCard from '../components/comCard/comCard';
import TestCard from '../components/testCard';
import apiService from './APIservice';

class RouterService {
  linkObj = {
    '/characters': {page: CharCard, infoGetter: apiService.getCharInfoSet},
    '/comics': {page: ComCard, infoGetter: apiService.getComInfoSet},
  };

  routersArray = Object.keys(this.linkObj).map((item, index) => {
    return (

      <Route
      key={index}
        exact
        path={item}
        render={(props) => {
          return this.pageDefinder(props);
        }}
      />
       
    );
  });

  linkArray = Object.keys(this.linkObj).map((item, index) => {
    return <Link key={index} to={item}>{item}</Link>;
  });

  pageDefinder = (props) => {
    const sort = props.match.url;
    const Comp = this.linkObj[sort].page;
    return <Comp {...props} />;
  };

  objectInfoDefinder = (props) => {

    const sort = props.match.url;
    const infoGetter = this.linkObj[sort].infoGetter;
    return infoGetter;



  };


}

export default new RouterService();
