class Service {

    // jsonComicsUrl = "http://gateway.marvel.com/v1/public/characters/1011334/comics";
    jsonCharsUrl = "http://gateway.marvel.com/v1/public/characters";
    // jsonKey = '?ts=1&&limit=100&apikey=d5f8ad0e19610e1792c218a4b6357287&hash=aa0cbdb02c9903548c372e9df84586c8&offset=';
        jsonKey = '?ts=1&&limit=100&apikey=d5f8ad0e19610e1792c218a4b6357287&hash=aa0cbdb02c9903548c372e9df84586c8&offset=';
    jsonFull = "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=d5f8ad0e19610e1792c218a4b6357287&hash=aa0cbdb02c9903548c372e9df84586c8"

    getCharArray = async () => {
        // console.log('fetch array')
        const offset = (Math.floor(Math.random()*10))*100;
        console.log(this.jsonCharsUrl + this.jsonKey + offset);
        const charArray = await fetch(this.jsonCharsUrl + this.jsonKey + offset)
            .then(data => data.json())
            .then(data => data.data.results)
          return charArray;
    }

    getRandomChar = async () => {
        const char = await fetch(this.jsonCharsUrl + this.jsonKey)
            .then(data => data.json())
            .then(data => {
                const amount = data.data.count;
                return data.data.results[Math.floor(Math.random() * amount)]
            })
            .then(charObj => this.getCharInfoSet(charObj))
        return char;
    }

    getComicsByUrl = async (comicsUrl) => {
        console.log('start fetch!', comicsUrl);

        const comicsObj = await fetch(comicsUrl + this.jsonKey)
            .then(data => data.json())
            .then(comics=> comics.data.results[0])
            .then(comics=>this.getComicsInfoSet(comics))
            // .then(array=>array.map(comics=> this.getComicsInfoSet(comics)))
        return comicsObj;
    }

    getCharPictureUrl = (charObj) => {
        return charObj.thumbnail.path + charObj.thumbnail.extension
    }

    getCharAboutUrl = (charObj) => {

        let url = null;

        charObj.urls.forEach(item => {
            if (item.type === 'wiki') {
                url = item.url;
            }
        })

        return url;
    }

    getCharName = (charObj) => {
        return charObj.name;
    }

    getCharDescription = (charObj) => {
        return charObj.description;
    }

    getCharComicsArray = (charObj) => {
        const charComics = charObj.comics.items;
        // if (charComics.length > 3) {
        //     return [charComics[0], charComics[1], charComics[2]];
        // }
        // else { return charComics }

        return charComics;
    }

    getCharInfoSet = (charObj) => {
        return {
            charName: charObj.name,
            charDesc: charObj.description,
            charAboutUrl: this.getCharAboutUrl(charObj),
            charPictureUrl: charObj.thumbnail.path + "." + charObj.thumbnail.extension,
            charComics: this.getCharComicsArray(charObj)
        }
    }

    getComicsInfoSet = (comObj) => {
        console.log(comObj)
        return {
            comId: comObj.id,
            comTitle: comObj.title,
            comDesc: comObj.description,
            comPictureUrl: comObj.images[0].path + "." + comObj.images[0].extension
        }
    }
}


const service = new Service();

export default service;