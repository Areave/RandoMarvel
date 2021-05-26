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
import {useState} from 'react';
import service from '../../APIServices/service';

const ComCard = ({id}) => {

    return (
    <>
      <h1>Comics! {id}</h1>
    </>
  );
};

const f = (View) => {
  return ({id}) => {
    const content = <View id={id}/>;

    return <Card>{content}</Card>;
  };
};

export default f(ComCard);
