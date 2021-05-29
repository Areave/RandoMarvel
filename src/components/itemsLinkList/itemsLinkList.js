import {
  UncontrolledCollapse,
  Button,
  ListGroupItem,
  ListGroup,
} from 'reactstrap';
import apiService from '../../Services/APIservice';

const ItemsLinkList = (props) => {
  const {comicsArray, history, match, type} = props;


  const goTo = (uri) => {
    apiService.getItemByUrl(uri, type).then((item) => {
      history.push(`${type}/${item.id}`);
    });
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
            {comicsArray.map((comics, index) => {
              return (
                <ListGroupItem
                  key={index}
                  tag="a"
                  className="comic-link"
                  onClick={() => goTo(comics.resourceURI)}
                >
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

export default ItemsLinkList;