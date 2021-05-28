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
import './charCard.css';
import ItemsLinkList from '../itemsLinkList/itemsLinkList';

const CharCard = (props) => {
  const {item, updateItem, history, match} = props;
  const {name, desc, pictureUrl, aboutUrl, comics} = item;

  return (
    <>
      <CardTitle className="head" tag="h4">
        Random character from Marvel API
      </CardTitle>
      <CardHeader tag="h3">{name}</CardHeader>
      <CardBody>
        {/* <CardTitle tag="h3">{charName}</CardTitle> */}
        <CardText>{desc}</CardText>
        <CardImg
          top
          className="item_img"
          src={pictureUrl}
          alt="random character"
        />
      </CardBody>

      <ItemsLinkList history={history} match={match} comicsArray={comics} />

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
    const sort = props.match.url;
    const getItemInfoSet = routerService.objectInfoDefinder(props);

    const [item, setItem] = useState(null);

    const updateItem = () => {
      service.getItemsArray(sort).then((array) => {
        const randomIndex = Math.floor(Math.random() * array.length);
        const item = getItemInfoSet(array[randomIndex]);
        setItem(item);
      });
    };

    useEffect(() => {
      updateItem()
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
