import {Spinner, Container, Card} from 'reactstrap';
import ItemsLinkList from '../components/itemsLinkList/itemsLinkList';
import {useEffect, useState} from 'react';
import service from './APIservice';

const templateHOC = (View) => {
  return (props) => {
    const {history, match} = props;

    let type = match.url;
    const ind = type.indexOf('/', 1);
    if (ind > 0) {
      type = type.slice(0, ind);
    }

    let id = null;
    if (!match.isExact) {
      const pathName = history.location.pathname;
      const indexOfLastSlash = pathName.lastIndexOf('/');
      id = pathName.slice(indexOfLastSlash + 1);
    }

    const loadRandomItem = () => {
      if (id) {
        history.push(type);
      }
      service.getRandomItem(type).then((item) => {
        // console.log(item)
        setItem(item);
      });
    };

    const loadItemById = (id, type) => {
      service.getItemById(id, type).then((item) => {
        setItem(item);
      });
    };

    const [item, setItem] = useState(null);

    useEffect(() => {
      if (id) {
        // console.log('by id');
        loadItemById(id, type);
      } else {
        loadRandomItem();
      }
    }, []);

    const content = item ? (
      <>
        <Card>
          <View {...props} item={item} updateItem={loadRandomItem} />
        </Card>
        <ItemsLinkList history={props.history} links={item.links} />
      </>
    ) : (
      <Container style={{width: `100%`, paddingTop: '100px'}}>
        <Spinner
          style={{
            display: `block`,
            margin: 'auto',
            width: '100px',
            height: '100px',
          }}
        >
          {'.'}
        </Spinner>
      </Container>
    );

    console.log(item);

    return content;
  };
};

export default templateHOC;
