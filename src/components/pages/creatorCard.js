import {
  CardHeader,
  CardTitle,
  CardBody,
  CardLink,
  CardFooter,
  CardText,
  CardImg,
  Button,
} from 'reactstrap';

// import routerService from '../../Services/RouterService';
import ItemsLinkList from '../itemsLinkList/itemsLinkList';
import templateHOC from '../../Services/templateHOC'

const CreatorCard = (props) => {
  const {item, updateItem, history, match} = props;
  const {name, desc, pictureUrl, aboutUrl, links} = item;


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
        history={history}
        links={links}
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

export default templateHOC(CreatorCard);
