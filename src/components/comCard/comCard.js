import { Spinner, Card, CardHeader, CardTitle, CardBody, CardLink, CardFooter, CardText, CardImg, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { useState } from 'react'
import service from '../../APIServices/service'


const ComCard = (props) => {

    return (
        <>
            <h1>nothing</h1>
        </>
    )
}


const f = (View) => {

    return () => {

        const content = <View />

        return (

            <Card>
                {content}
            </Card>

        )
    }
}

export default f(ComCard);





