import apiService from '../../Services/APIservice';
import {Container} from 'reactstrap'

const itemsLinkListHOC = (View) => (props) => {
  const {links, history} = props;

  const linksAr = links.filter(
    (link) => (link && link.items && link.items.length)
  );

  const linkList = linksAr.map((link, index) => {

    const type = link.type;
    const linkArr = link.items;
    const goTo = (uri) => {
      apiService.getItemByUrl(uri, type).then((item) => {
        history.push(`${type}/${item.id}`);
      });
    };

    return <View key={type} label={type.slice(1)} linkArr={linkArr} goTo={goTo} />;
  });

  return <Container className="linkContainer">{linkList}</Container>;
};

export default itemsLinkListHOC;
