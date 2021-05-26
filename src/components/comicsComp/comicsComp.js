import {
  UncontrolledCollapse,
  Button,
  ListGroupItem,
  ListGroup,
  List,
} from 'reactstrap';
import service from '../../APIServices/service';

const ComicsComp = (props) => {

  const {comicsArray} = props;

  const goTo = (uri) => {
    service.getComicsByUrl(uri)
    .then(comics => {
      props.history.push(`${comics.comId}`);
    })
  };

  if (!comicsArray.length) {
    return null;
  } else {
    return (
      <>
        <ListGroup>
          <Button color="primary" id="toggler" style={{marginBottom: '1rem'}}>
            From comics:
          </Button>
          <UncontrolledCollapse toggler="#toggler">
            {comicsArray.map((comics) => {
              return (
                <ListGroupItem tag="a" onClick={()=>goTo(comics.resourceURI) }>
                  {comics.name}
                </ListGroupItem>


              );
            })}
          </UncontrolledCollapse>
        </ListGroup>
      </>
    );
  }
};

export default ComicsComp;
