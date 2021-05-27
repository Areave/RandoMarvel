import {Button} from 'reactstrap';
import service from '../APIServices/service';

const TestCard = (props) => {

  const {id} = props
  const goTo = (num) => {
      props.history.push(`${num}`);
  };

  return <Button onClick={() => goTo('39753')}>Push me, id is {id}</Button>;
};

export default TestCard;
