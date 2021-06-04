import {
  Spinner,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardLink,
  CardFooter,
  CardText,
  CardImg,
  Button,
} from 'reactstrap';
import {useEffect, useState} from 'react';
import service from '../../Services/APIservice';
import routerService from '../../Services/RouterService';
import ItemsLinkList from '../itemsLinkList/itemsLinkList';
// import templateHOC from '../../Services/templateHOC'

const CharCard = (props) => {
  const {item, updateItem, history, match} = props;
  const {name, desc, pictureUrl, aboutUrl, comics} = item;
  const listOf = '/comics';

  return (
    <>
      <CardTitle tag="h4">Random character from Marvel API</CardTitle>
      <CardHeader tag="h3">{name}</CardHeader>
      <CardBody>
        <CardText>{desc}</CardText>
        <CardImg
          top
          className="item_img"
          src={pictureUrl}
          alt="random character"
        />
      </CardBody>

      <ItemsLinkList
        type={listOf}
        history={history}
        match={match}
        comicsArray={comics}
      />

      <CardFooter className="text-muted">
        <CardLink className="aboutLink" target="blanc" href={aboutUrl}>
          Learn more about {name}
        </CardLink>
        <Button color="danger" onClick={updateItem}>
          Update char
        </Button>
      </CardFooter>
    </>
  );
};

const templateHOC = (View) => {
  return (props) => {
    
    const {type, history, match} = props;

    console.log(props)

    // console.log(history.location.pathname);
    // console.log(type);
    // console.log(match.isExact);

    let id = null;

    if (!match.isExact) {
      const pathName = history.location.pathname;
      const indexOfLastSlash = pathName.lastIndexOf('/');
      id = pathName.slice(indexOfLastSlash + 1);
    }

    const getItemInfoSet = routerService.objectInfoDefinder(type);

    const [item, setItem] = useState(null);

    const updateItem = () => {
      service.getItemsArray(type).then((array) => {
        const randomIndex = Math.floor(Math.random() * array.length);
        const item = getItemInfoSet(array[randomIndex]);
        setItem(item);
      });
    };

    const loadItemById = (id, type) => {
      service.getItemById(id, type).then((item) => {
        setItem(item);
      });
    };

    useEffect(() => {
      if (id) {
        console.log('by id');
        loadItemById(id, type);
      } else {
        updateItem();
      }
    }, []);

    const content = item ? (
      <View {...props} item={item} updateItem={updateItem} />
    ) : (
      <Spinner style={{margin: 'auto', width: '100px', height: '100px'}}>
        {' '}
      </Spinner>
    );

    return <Card>{content}</Card>;
  };
};

export default templateHOC(CharCard);
