import {
  Spinner,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  CardImg,
} from 'reactstrap';
import {useState, useEffect} from 'react';
import service from '../../Services/APIservice';
import routerService from '../../Services/RouterService';



const ComCard = ({item}) => {
  const {title, desc, pictureUrl} = item;
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
      </CardBody>
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

export default templateHOC(ComCard);
