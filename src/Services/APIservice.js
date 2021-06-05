import routerService from './RouterService';

class APIService {
  // jsonComicsUrl = "http://gateway.marvel.com/v1/public/characters/1011334/comics";
  // jsonCharsUrl = 'http://gateway.marvel.com/v1/public/characters';
  // jsonComsUrl = 'http://gateway.marvel.com//v1/public/comics';
  jsonDataUrl = 'http://gateway.marvel.com//v1/public';
  // jsonKey = '?ts=1&&limit=100&apikey=d5f8ad0e19610e1792c218a4b6357287&hash=aa0cbdb02c9903548c372e9df84586c8&offset=';
  jsonKey =
    '?ts=1&&limit=100&apikey=d5f8ad0e19610e1792c218a4b6357287&hash=aa0cbdb02c9903548c372e9df84586c8&offset=';
  // jsonFull = "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=d5f8ad0e19610e1792c218a4b6357287&hash=aa0cbdb02c9903548c372e9df84586c8"

  getItemsArray = async (url) => {
    console.log('get items!');
    const offset = Math.floor(Math.random() * 10) * 100;
    const itemsArray = await fetch(
      this.jsonDataUrl + url + this.jsonKey + offset
    )
      .then((data) => data.json())
      .then((data) => {
        // console.log(data.data.results);
        return data.data.results;
      });
    return itemsArray;
  };

  getRandomItem = async (type) => {
    const offset = Math.floor(Math.random() * 10) * 100;
    console.log(this.jsonDataUrl + type + this.jsonKey + offset);
    const randomItem = await fetch(
      this.jsonDataUrl + type + this.jsonKey + offset
    )
      .then((data) => data.json())
      .then((data) => data.data.results)
      .then((array) => {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
      })
      .then((item) => {
        // console.log('random item', item);
        return this.getItemInfoSet(item, type);
      });
    return await randomItem;
  };

  getItemById = async (id, type) => {
    // console.log(this.jsonDataUrl + type + '/' + id + '/' + this.jsonKey);
    const item = await fetch(this.jsonDataUrl + type + '/' + id + this.jsonKey)
      .then((item) => item.json())
      .then((item) => item.data.results[0])
      .then((item) => this.getItemInfoSet(item, type));
    // console.log('by id', item);
    return item;
  };

  getItemByUrl = async (url, type) => {
    const item = await fetch(url + this.jsonKey)
      .then((item) => item.json())
      .then((rawItem) => {
        const item = rawItem.data.results[0];
        return this.getItemInfoSet(item, type);
      });
    return item;
  };

  getItemInfoSet = (itemObj, sort) => {
    switch (sort) {
      case '/comics':
        return this.getComicsInfoSet(itemObj);
      case '/characters':
        return this.getCharInfoSet(itemObj);
      case '/creators':
        return this.getCreatorInfoSet(itemObj);
      case '/stories':
        return this.getStoriesInfoSet(itemObj);
      case '/series':
        return this.getSeriesInfoSet(itemObj);
      case '/events':
        return this.getEventInfoSet(itemObj);

      default:
        return itemObj;
    }
  };

  getLinkInfoSet = (obj) => {
    const linkArr = Object.keys(routerService.linkObj).map((link) => {
      const field = link.slice(1);
      if (obj[field]) return {type: link, items: obj[field].items};
      else return null;
    });

    // console.log(linkArr)

    return linkArr;
  };

  getCharInfoSet = (obj) => {
    return {
      id: obj.id,
      name: obj.name,
      desc: obj.description,
      aboutUrl: this.getCharAboutUrl(obj),
      pictureUrl: obj.thumbnail.path + '.' + obj.thumbnail.extension,
      links: this.getLinkInfoSet(obj),
    };
  };

  getComicsInfoSet = (obj) => {
    return {
      id: obj.id,
      title: obj.title,
      desc: obj.description,
      pictureUrl: obj.images.length
        ? obj.images[0].path + '.' + obj.images[0].extension
        : '',
      links: this.getLinkInfoSet(obj),
    };
  };

  getCreatorInfoSet = (obj) => {
    // console.log(obj);
    return {
      id: obj.id,
      name: obj.fullName,
      // desc: creatorObj.description,
      // aboutUrl: this.getCharAboutUrl(creatorObj),
      pictureUrl:
        obj.thumbnail.path + '.' + obj.thumbnail.extension,
      links: this.getLinkInfoSet(obj),
    };
  };

  getStoriesInfoSet = (obj) => {
    return {
      id: obj.id,
      title: obj.title,
      desc: obj.description,
      pictureUrl: obj.images
        ? obj.images[0].path + '.' + obj.images[0].extension
        : '',
      links: this.getLinkInfoSet(obj),
    };
  };

  getEventInfoSet = (obj) => {
    console.log(obj)
    return {
      id: obj.id,
      title: obj.title,
      desc: obj.description,
      pictureUrl: obj.images
        ? obj.images[0].path + '.' + obj.images[0].extension
        : '',
      links: this.getLinkInfoSet(obj),
    };
  };

  getSeriesInfoSet = (obj) => {
    return {
      id: obj.id,
      title: obj.title,
      desc: obj.description,
      pictureUrl: obj.images
        ? obj.images[0].path + '.' + obj.images[0].extension
        : '',
      links: this.getLinkInfoSet(obj),
    };
  };


  
  getCharPictureUrl = (charObj) => {
    return charObj.thumbnail.path + charObj.thumbnail.extension;
  };

  getCharAboutUrl = (charObj) => {
    let url = null;
    charObj.urls.forEach((item) => {
      if (item.type === 'wiki') {
        url = item.url;
      }
    });

    return url;
  };

  getCharName = (charObj) => {
    return charObj.name;
  };

  getCharDescription = (charObj) => {
    return charObj.description;
  };
}

export default new APIService();
