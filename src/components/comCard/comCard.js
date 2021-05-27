import {
  Spinner,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  CardImg
} from 'reactstrap';
import {useState} from 'react';
import service from '../../APIServices/service';

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
          <CardImg
            top
            className="item_img"
            src={pictureUrl}
            alt="random comic"
          />
        </CardBody>
      </>
  );
};


const templateHOC = (View) => {
  return (props) => {

    console.log(props)
    const {id, sort} = props;


    const [item, setItem] = useState(null);
    const [itemArray, setItemArray] = useState(null);

    const loadItemArrayToCash = async () => {
      console.log('load!', sort);
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


    if(id) {
      console.log(id, sort)
      service.getItemById(id, sort)
      .then(item=>{

        console.log(item.title, 'title!')
        setItem(item)
      })
    }

    if (!itemArray) {
      loadItemArrayToCash();
    } else if (itemArray && !item) {
      console.log(item)
      updateItemFromCash();
    }

    const content = item ? (
      <View item={item} updateItemFromCash={updateItemFromCash} />
    ) : (
      <Spinner style={{margin: 'auto', width: '3rem', height: '3rem'}}>
        {' '}
      </Spinner>
    );

    return <Card>{content}</Card>;
  };
};

export default templateHOC(ComCard);
