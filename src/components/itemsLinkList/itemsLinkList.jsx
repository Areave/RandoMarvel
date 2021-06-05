import {
  UncontrolledCollapse,
  Button,
  ListGroupItem,
  ListGroup,
} from 'reactstrap';

import itemsLinkListHOC from './itemsLinkListHOC';

const ItemsLinkList = (props) => {
  const {linkArr, label, goTo} = props;

  return (
    <>
      <ListGroup>
        
        <Button
          color="primary"
          id={'toggler' + label}
          style={{margin: '0, 2rem, 1rem'}}
        >
          {label}
        </Button>

        <UncontrolledCollapse toggler={'#toggler' + label}>
          {linkArr.map((item, index) => {
            return (
              <ListGroupItem
                key={item.name+index}
                tag="a"
                className="item-link"
                onClick={() => goTo(item.resourceURI)}
              >
                {item.name}
              </ListGroupItem>
            );
          })}
        </UncontrolledCollapse>
      
      </ListGroup>
    </>
  );
};

export default itemsLinkListHOC(ItemsLinkList);
