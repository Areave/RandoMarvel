import { UncontrolledCollapse, Button, ListGroupItem,ListGroup } from 'reactstrap';

const ComicsComp = ({ comicsArray }) => {
  console.log(!comicsArray.length);
  if (!comicsArray.length) {
    return null;
  } else {
    return (
      <>
        <ListGroup>
          <Button color="primary" id="toggler" style={{ marginBottom: '1rem' }}>
            From comics:
          </Button>
          <UncontrolledCollapse toggler="#toggler">
            {comicsArray.map((comics) => {
              console.log(comics)
              return (
                <ListGroupItem resourceURI={comics.resourceURI} tag="a" href="#">
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
