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
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import {useState, useEffect} from 'react';
import service from '../../APIServices/service';

const ComCard = ({comic}) => {
  const {comId, comTitle, comDesc, comPictureUrl} = comic;
  return (
    <>
      <>
        <CardTitle className="head" tag="h4">
          Comic from Marvel API
        </CardTitle>
        <CardHeader tag="h3">{comTitle}</CardHeader>
        <CardBody>
          {/* <CardTitle tag="h3">{charName}</CardTitle> */}
          <CardText>{comDesc}</CardText>
          <CardImg
            top
            className="char_img"
            src={comPictureUrl}
            alt="random character"
          />
        </CardBody>

        {/* <CardFooter className="text-muted">
          <CardLink className="aboutLink" target="blanc" href={charAboutUrl}>
            Learn more about {charName}
          </CardLink>
          <Button color="danger" onClick={updateCharFromCash}>
            Update char
          </Button>
        </CardFooter> */}
      </>
    </>
  );
};

const f = (View) => {
  return ({id}) => {
    const [comic, setComic] = useState(null);

    useEffect(() => {
      service.getComicsById(`/${id}`).then((comic) => {

        setComic(comic);
      });
    }, []);

    if (!comic) return <h1>no comics!</h1>;

    console.log(comic)

    return (
      <Card>
        <View comic={comic} />
      </Card>
    );
  };
};

export default f(ComCard);
