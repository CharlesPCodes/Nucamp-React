import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';
 
// Function for home page /home
// create a function Home and pass (props) parm
function Home(props){
    return(
        // create container with 1 row
        <div className="container">
            <div className="row">
                {/* create card based on the RenderCard function that passes props.campsite */}
                <div className="col-md m-1">
                    <RenderCard item={props.campsite}/>
                </div>
                {/* create card based on the RenderCard function that passes props.promotion */}
                <div className="col-md m-1">
                    <RenderCard item={props.promotion}/>
                </div>
                {/* create card based on the RenderCard fucntion that passes props.partner */}
                <div className="col-md m-1">
                    <RenderCard item={props.partner}/>
                </div>
                {/* TEST DIV */}
                {/* <div className="col-md m-1">
                    <RenderCard item={props.social}/>
                </div> */}
            </div>
        </div>
    )
}

function RenderCard({item}){
    return(
        // creates card with image, name, and description based on the above
        <Card>
            <CardImg src={item.image} alt={item.name}/>
            <CardBody>
                <CardTitle>{item.name}</CardTitle>
                <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    )
}

export default Home;