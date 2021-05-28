class APIService {
  // jsonComicsUrl = "http://gateway.marvel.com/v1/public/characters/1011334/comics";
  jsonCharsUrl = 'http://gateway.marvel.com/v1/public/characters';
  jsonComsUrl = 'http://gateway.marvel.com//v1/public/comics';
  jsonDataUrl = 'http://gateway.marvel.com//v1/public';
  // jsonKey = '?ts=1&&limit=100&apikey=d5f8ad0e19610e1792c218a4b6357287&hash=aa0cbdb02c9903548c372e9df84586c8&offset=';
  jsonKey =
    '?ts=1&&limit=100&apikey=d5f8ad0e19610e1792c218a4b6357287&hash=aa0cbdb02c9903548c372e9df84586c8&offset=';
  // jsonFull = "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=d5f8ad0e19610e1792c218a4b6357287&hash=aa0cbdb02c9903548c372e9df84586c8"

  getItemsArray = async (url) => {
    console.log('get items!')
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

  getItemById = async (id, sort) => {
      console.log(this.jsonDataUrl + sort + '/' + id + '/' + this.jsonKey)
    const item = await fetch(this.jsonDataUrl + sort + '/' + id + '/' + this.jsonKey)
      .then((item) => item.json())
      .then((item) => this.getItemInfoSet(item, sort))
    return item;
  };

  getItemByUrl = async (url) => {
  const item = await fetch(url + this.jsonKey)
    .then((item) => item.json())
  return item;
};

  getItemInfoSet = (itemObj, sort) => {
    switch (sort) {
      case '/comics':
        return this.getComicsInfoSet(itemObj);
      case '/characters':
        return this.getCharInfoSet(itemObj);

      default:
        return itemObj;
    }
  };


  getCharArray = async () => {
    // console.log('fetch array')
    const offset = Math.floor(Math.random() * 10) * 100;
    // console.log(this.jsonCharsUrl + this.jsonKey + offset);
    const charArray = await fetch(this.jsonCharsUrl + this.jsonKey + offset)
      .then((data) => data.json())
      .then((data) => data.data.results);
    return charArray;
  };

  getRandomChar = async () => {
    const char = await fetch(this.jsonCharsUrl + this.jsonKey)
      .then((data) => data.json())
      .then((data) => {
        const amount = data.data.count;
        return data.data.results[Math.floor(Math.random() * amount)];
      })
      .then((charObj) => this.getCharInfoSet(charObj));
    return char;
  };

  getComicsByUrl = async (comicsUrl) => {
    const comicsObj = await fetch(comicsUrl + this.jsonKey)
      .then((data) => data.json())
      .then((comics) => comics.data.results[0])
      .then((comics) => this.getComicsInfoSet(comics));
    // .then(array=>array.map(comics=> this.getComicsInfoSet(comics)))
    return comicsObj;
  };

  getComicsById = async (comicsId) => {
    const comicsObj = await fetch(this.jsonComsUrl + comicsId + this.jsonKey)
      .then((data) => data.json())
      .then((comics) => comics.data.results[0])
      .then((comics) => this.getComicsInfoSet(comics));
    return comicsObj;
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

  getCharInfoSet = (charObj) => {
    return {
      id: charObj.id,
      name: charObj.name,
      desc: charObj.description,
      aboutUrl: this.getCharAboutUrl(charObj),
      pictureUrl: charObj.thumbnail.path + '.' + charObj.thumbnail.extension,
      comics: charObj.comics.items,
    };
  };

  getComInfoSet = (comObj) => {
    return {
      id: comObj.id,
      title: comObj.title,
      desc: comObj.description,
      pictureUrl: comObj.images[0].path + '.' + comObj.images[0].extension,
    };
  };
}

export default new APIService();
