import {Route, Link} from 'react-router-dom';

import ComCard from '../components/pages/comCard';
import StoryCard from '../components/pages/storyCard';
import ItemCard from '../components/pages/itemCard';
import CreatorCard from '../components/pages/creatorCard';
import EventCard from '../components/pages/eventCard'
import SeriesCard from '../components/pages/seriesCard'

import apiService from './APIservice';

class RouterService {
  linkObj = {
    '/comics': {page: ComCard, infoGetter: apiService.getComicsInfoSet},
    '/characters': {page: ItemCard, infoGetter: apiService.getCharInfoSet},
    '/creators': {page: CreatorCard, infoGetter: apiService.getCharInfoSet},
    '/stories': {page: StoryCard, infoGetter: apiService.getComicsInfoSet},
    '/events': {page: EventCard, infoGetter: apiService.getComicsInfoSet},
    '/series': {page: SeriesCard, infoGetter: apiService.getComicsInfoSet},
  };

  routersArray = Object.keys(this.linkObj).map((item, index) => {
    return (
      <Route
        key={index}
        path={item}
        render={(props) => {
          // console.log(props)
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
