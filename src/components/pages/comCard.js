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
    const {type, history, match} = props;

    console.log(history.location.pathname)
    console.log(type)
    console.log(match.isExact)

    let id = null;

    if (!match.isExact) {
      const pathName = history.location.pathname;
      const indexOfLastSlash = pathName.lastIndexOf('/');
      id = pathName.slice(indexOfLastSlash+1)
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

export default templateHOC(ComCard);
