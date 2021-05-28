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
import { useState } from 'react';
import service from '../../Services/APIservice';
import './charCard.css';
import ComicsComp from '../comicsComp/comicsComp';


const CharCardCopy = (props) => {
  const { item, updateItemFromCash, history} = props;

  const { name, desc, pictureUrl, aboutUrl, comics } = item;

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

      <ComicsComp history={history} comicsArray={comics} />

      <CardFooter className="text-muted">
        <CardLink className="aboutLink" target="blanc" href={aboutUrl}>
          Learn more about {name}
        </CardLink>
        <Button color="danger" onClick={updateItemFromCash}>
          Update char
        </Button>
      </CardFooter>
    </>
  );
};


const templateHOC = (View) => {
  return (props) => {
    const sort = props.match.url;

    const [item, setItem] = useState(null);
    const [itemArray, setItemArray] = useState(null);

    const loadItemArrayToCash = async () => {
      console.log('load!');
      const itemArray = await service.getItemsArray(sort);
      setItemArray(itemArray);
    };

    const updateItemFromCash = () => {
      if (!itemArray) return;
      else {
        // console.log("updateCharFromCash")
        const randomIndex = Math.floor(Math.random() * itemArray.length);
        const item = service.getItemInfoSet(itemArray[randomIndex], sort);
        // console.log(char.charPictureUrl, char.charName);
        if (
          item.pictureUrl.includes('image_not_available') ||
          item.pictureUrl.includes('4c002e0305708.gif')
        ) {
          updateItemFromCash();
        } else {
          console.log(item)
          setItem(item);
        }
      }
    };

    if (!itemArray) {
      loadItemArrayToCash();
    } else if (itemArray && !item) {
      updateItemFromCash();
    }

    const content = item ? (
      <View {...props} item={item} updateItemFromCash={updateItemFromCash} />
    ) : (
      <Spinner style={{margin: 'auto', width: '3rem', height: '3rem'}}>
        {' '}
      </Spinner>
    );

    return <Card>{content}</Card>;
  };
};

export default templateHOC(CharCardCopy);
