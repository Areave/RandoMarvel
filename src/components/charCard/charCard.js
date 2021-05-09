import { Spinner, Card, CardHeader, CardTitle, CardBody, CardLink, CardFooter, CardText, CardImg, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { useState } from 'react'
import service from '../../APIServices/service'
import './charCard.css'

const CharCard = (props) => {

    const { char, updateCharFromCash } = props;
    const { charName, charDesc, charPictureUrl, charAboutUrl, charComics } = char;
    // console.log('get char for card, name', charName)
    return (
        <>
 
                <CardTitle className="head" tag="h4">Random character from Marvel API</CardTitle>
                <CardHeader tag="h3">{charName}</CardHeader>
                <CardBody>
                    {/* <CardTitle tag="h3">{charName}</CardTitle> */}
                    <CardText>{charDesc}</CardText>
                    <CardImg top width="300px" className="char_img" src={charPictureUrl} alt="random character" />
                </CardBody>
                <ListGroup>
                    <CardTitle className="comics-title" tag="h5">From comics:</CardTitle>
                    {charComics}
                </ListGroup>
                <CardFooter className="text-muted">
                    <CardLink className="aboutLink" target='blanc' href={charAboutUrl}>Learn more about {charName}</CardLink>
                    <Button color="danger" onClick={updateCharFromCash}>Update char</Button>
                </CardFooter>

        </>
    )
}

const f = (View) => {

    return () => {

        const [char, setChar] = useState(null)
        const [charArray, setCharArray] = useState(null)

        const loadCharArrayToCash = async () => {
            // console.log("loadCharArrayToCash")
            const charArray = await service.getCharArray();
            setCharArray(charArray);
        }

        const updateChar = () => {
            service.getRandomChar()
                .then(char => {
                    const charComics = char.charComics.map(comics => {
                        return <ListGroupItem tag="a" href="#">{comics.name}</ListGroupItem>
                    })
                    char.charComics = charComics;
                    return char;
                })
                .then(char => setChar(char));
        }

        const updateCharFromCash = () => {
            if (!charArray) return;
            else {
                // console.log("updateCharFromCash")
                const randomIndex = Math.floor(Math.random() * charArray.length);
                const char = service.getCharInfoSet(charArray[randomIndex]);
                console.log(char.charPictureUrl, char.charName);
                if (char.charPictureUrl.includes('image_not_available') ||
                    char.charPictureUrl.includes('4c002e0305708.gif')
                ) {
                    updateCharFromCash()
                }
                else {
                    const charComics = char.charComics.map(comics => {
                        return <ListGroupItem tag="a" href="#">{comics.name}</ListGroupItem>
                    })
                    char.charComics = charComics;
                    setChar(char);
                }

            }
        }

        if (!charArray) {
            loadCharArrayToCash();
        }
        else if (charArray && !char) {
            updateCharFromCash();
        }

        const content = (char) ? <View char={char} updateCharFromCash={updateCharFromCash} /> : <Spinner style={{ margin: 'auto', width: '3rem', height: '3rem' }}> </Spinner >

        return (

                <Card>
                    {content}
                </Card>
  
        )


    }
}

export default f(CharCard);





