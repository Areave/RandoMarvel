import React, {useState} from 'react';
import service from '../APIServices/service';
import {Spinner, Card} from 'reactstrap';
import TestCard from './testCard';
import CharCard from './charCard/charCard';
import ComCard from './comCard/comCard'

const pageDefinder = (sort) => {
  switch (sort) {
    case '/characters':
      return CharCard;
      case '/comics':
        return ComCard;
    default:
      return null;
  }
};

const templateHOC = () => {
  return (props) => {
    const {sort} = props;
    const View = pageDefinder(sort);

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
      <View item={item} updateItemFromCash={updateItemFromCash} />
    ) : (
      <Spinner style={{margin: 'auto', width: '3rem', height: '3rem'}}>
        {' '}
      </Spinner>
    );

    return <Card>{content}</Card>;
  };
};

export default templateHOC();
