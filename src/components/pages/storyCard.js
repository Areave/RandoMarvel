import {
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  CardImg,
} from 'reactstrap';
import ItemsLinkList from '../itemsLinkList/itemsLinkList'
import templateHOC from '../../Services/templateHOC'

const StoryCard = ({item, history}) => {
  const {title, desc, pictureUrl, links} = item;
  return (
    <>
      <CardTitle className="head" tag="h4">
        Comic from Marvel API
      </CardTitle>
      <CardHeader tag="h3">{title}</CardHeader>
      <CardBody>
        {/* <CardTitle tag="h3">{charName}</CardTitle> */}
        <CardText>{desc}</CardText>
        <CardImg top className="item_img" src={pictureUrl} alt="random comic" />
        <ItemsLinkList
        history={history}
        links={links}
      />
      </CardBody>
    </>
  );
};

export default templateHOC(StoryCard);
