import {Route, Link} from 'react-router-dom';
import CharCard from '../components/pages/charCard';
import ComCard from '../components/pages/comCard';
// import TestCard from '../components/etc/testCard';
import apiService from './APIservice';

class RouterService {
  linkObj = {
    '/comics': {page: ComCard, infoGetter: apiService.getComicsInfoSet},
    '/characters': {page: CharCard, infoGetter: apiService.getCharInfoSet},
    '/creators': {page: CharCard, infoGetter: apiService.getCharInfoSet},
  };

  routersArray = Object.keys(this.linkObj).map((item, index) => {
    return (
      <Route
        key={index}
        path={item}
        render={(props) => {
          console.log(props)
          return this.pageDefinder(props);
        }}
      />
    );
  });

  routersSubPageArray = Object.keys(this.linkObj).map((item, index) => {
    return (
      <Route
        key={index}
        exact
        path={item + '/:id'}
        render={(props) => {
          return this.pageDefinder(props);
        }}
      />
    );
  });

  linkArray = Object.keys(this.linkObj).map((item, index) => {
    const linkName = item[1].toUpperCase().concat(item.slice(2));
    return (
      <Link key={index} to={item}>
        {linkName}
      </Link>
    );
  });

  getSortString = (str) => {
    const ind = str.indexOf('/', 1);

    if (ind < 0) return str;
    else return str.slice(0, ind);
  };

  pageDefinder = (props) => {
    const sort = this.getSortString(props.match.url);
    const Comp = this.linkObj[sort].page;
    return <Comp type={sort} {...props}/>;
  };

  objectInfoDefinder = (type) => {
    const infogetter = this.linkObj[type].infoGetter;
    return infogetter;
  };
}

export default new RouterService();
