import {Route, Link} from 'react-router-dom';

import ComCard from '../components/pages/comCard';
import StoryCard from '../components/pages/storyCard';
import ItemCard from '../components/pages/itemCard';
import CreatorCard from '../components/pages/creatorCard';
import EventCard from '../components/pages/eventCard';
import SeriesCard from '../components/pages/seriesCard';

class RouterService {
  linkObj = {
    '/characters': ItemCard,
    '/comics': ComCard,
    '/creators': CreatorCard,
    '/stories': StoryCard,
    '/events': EventCard,
    '/series': SeriesCard,
  };

  routersArray = Object.keys(this.linkObj).map((item, index) => {
    return (
      <Route
        key={index}
        path={item}
        render={(props) => {
          const Comp = this.linkObj[item];                   
          return <Comp {...props} />
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

}

export default new RouterService();
