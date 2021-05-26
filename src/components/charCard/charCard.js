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
import service from '../../APIServices/service';
import './charCard.css';
import ComicsComp from '../comicsComp/comicsComp';

const CharCard = (props) => {
  const { char, updateCharFromCash } = props;
  console.log(props.history.push)

  const { charName, charDesc, charPictureUrl, charAboutUrl, charComics } = char;
  // console.log('get char for card, name', charName)

  return (
    <>
      <CardTitle className="head" tag="h4">
        Random character from Marvel API
      </CardTitle>
      <CardHeader tag="h3">{charName}</CardHeader>
      <CardBody>
        {/* <CardTitle tag="h3">{charName}</CardTitle> */}
        <CardText>{charDesc}</CardText>
        <CardImg
          top
          className="char_img"
          src={charPictureUrl}
          alt="random character"
        />
      </CardBody>

      <ComicsComp history={props.history} comicsArray={charComics} />

      <CardFooter className="text-muted">
        <CardLink className="aboutLink" target="blanc" href={charAboutUrl}>
          Learn more about {charName}
        </CardLink>
        <Button color="danger" onClick={updateCharFromCash}>
          Update char
        </Button>
      </CardFooter>
    </>
  );
};

const f = (View) => {
  return (props) => {
    const [char, setChar] = useState(null);
    const [charArray, setCharArray] = useState(null);

    const loadCharArrayToCash = async () => {
      const charArray = await service.getCharArray();
      setCharArray(charArray);
    };

    // const updateChar = () => {
    //     service.getRandomChar()
    //         .then(char => {
    //             const charComics = char.charComics.map(comics => {
    //                 return
    //             })
    //             char.charComics = charComics;
    //             return char;
    //         })
    //         .then(char => setChar(char));
    // }

    const updateCharFromCash = () => {
      if (!charArray) return;
      else {
        // console.log("updateCharFromCash")
        const randomIndex = Math.floor(Math.random() * charArray.length);
        const char = service.getCharInfoSet(charArray[randomIndex]);
        // console.log(char.charPictureUrl, char.charName);
        if (
          char.charPictureUrl.includes('image_not_available') ||
          char.charPictureUrl.includes('4c002e0305708.gif')
        ) {
          updateCharFromCash();
        } else {
          setChar(char);
        }
      }
    };

    if (!charArray) {
      loadCharArrayToCash();
    } else if (charArray && !char) {
      updateCharFromCash();
    }

    const content = char ? (
      <View {...props} char={char} updateCharFromCash={updateCharFromCash} />
    ) : (
      <Spinner style={{ margin: 'auto', width: '3rem', height: '3rem' }}>
        {' '}
      </Spinner>
    );

    return <Card>{content}</Card>;
  };
};

export default f(CharCard);
