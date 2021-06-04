import {
  UncontrolledCollapse,
  Button,
  ListGroupItem,
  ListGroup,
} from 'reactstrap';
import apiService from '../../Services/APIservice';

const ItemsLinkList = (props) => {
  const {links, history} = props;

  const content = links.map((link, index) => {
    if (!link || !link.items || !link.items.length) return null;

    const type = link.type;
    const linkArr = link.items;

    const goTo = (uri) => {
      apiService.getItemByUrl(uri, type).then((item) => {
        history.push(`${type}/${item.id}`);
      });
    };

    if (!linkArr) {
      return null;
    } else {
      return (
        <>
          <ListGroup key={index}>
            <Button
              color="primary"
              id={'toggler' + index}
              style={{margin: '0, 2rem, 1rem'}}
            >
              {type}
            </Button>

            <UncontrolledCollapse toggler={'#toggler' + index}>
              {linkArr.map((item, index) => {
                return (
                  <ListGroupItem
                    key={index}
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
    }
  });

  return <div>{content}</div>;
};

export default ItemsLinkList;
