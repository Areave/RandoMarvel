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

import ItemsLinkList from '../itemsLinkList/itemsLinkList';
import templateHOC from '../../Services/templateHOC'

const ItemCard = (props) => {

  const {item, updateItem, history} = props;
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

// const templateHOC = (View) => {
//   return (props) => {

//     console.log(props)
//     const {type, history, match} = props;

//     // console.log(history.location.pathname);
//     // console.log(type);
//     // console.log(match.isExact);


//     const loadRandomItem = () => {
//       service.getRandomItem(type).then((item) => {
//         console.log(item)
//         setItem(item);
//       });
//     };

//     const loadItemById = (id, type) => {
//       service.getItemById(id, type).then((item) => {
//         setItem(item);
//       });
//     };


//     let id = null;
//     if (!match.isExact) {
//       const pathName = history.location.pathname;
//       const indexOfLastSlash = pathName.lastIndexOf('/');
//       id = pathName.slice(indexOfLastSlash + 1);
//     }

//     const [item, setItem] = useState(null);

//     useEffect(() => {
//       if (id) {
//         console.log('by id');
//         loadItemById(id, type);
//       } else {
//         loadRandomItem();
//       }
//     }, []);


//     const content = item ? (
//       <View {...props} item={item} updateItem={loadRandomItem} />
//     ) : (
//       <Spinner style={{margin: 'auto', width: '100px', height: '100px'}}>
//         {' '}
//       </Spinner>
//     );

//     return <Card>{content}</Card>;
//   };
// };

export default templateHOC(ItemCard);
