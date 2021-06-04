import {
  Spinner,
  Card,
} from 'reactstrap';
import {useEffect, useState} from 'react';
import service from './APIservice';



const templateHOC = (View) => {
  return (props) => {

    const {type, history, match} = props;

    const loadRandomItem = () => {
      service.getRandomItem(type).then((item) => {
        console.log(item)
        setItem(item);
      });
    };

    const loadItemById = (id, type) => {
      service.getItemById(id, type).then((item) => {
        setItem(item);
      });
    };


    let id = null;
    if (!match.isExact) {
      const pathName = history.location.pathname;
      const indexOfLastSlash = pathName.lastIndexOf('/');
      id = pathName.slice(indexOfLastSlash + 1);
    }

    const [item, setItem] = useState(null);

    useEffect(() => {
      if (id) {
        console.log('by id');
        loadItemById(id, type);
      } else {
        loadRandomItem();
      }
    }, []);


    const content = item ? (
      <View {...props} item={item} updateItem={loadRandomItem} />
    ) : (
      <Spinner style={{margin: 'auto', width: '100px', height: '100px'}}>
        {' '}
      </Spinner>
    );

    return <Card>{content}</Card>;
  };
};

export default templateHOC