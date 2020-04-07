import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Loading } from './LoadingComponent';

// Function for home page /home
// create a function Home and pass (props) parm
function Home(props) {
    return (
        // create container with 1 row
        <div className="container">
            <div className="row">
                {/* create card based on the RenderCard function that passes props.campsite */}
                <div className="col-md m-1">
                <RenderCard
                    item={props.campsite}
                    isLoading={props.campsitesLoading}
                    errMess={props.campsitesErrMess}
                />
                </div>
                {/* create card based on the RenderCard function that passes props.promotion */}
                <div className="col-md m-1">
                <RenderCard item={props.promotion}
                 isLoading={props.campsitesLoading}
                 errMess={props.campsitesErrMess}/>
                </div>
                {/* create card based on the RenderCard fucntion that passes props.partner */}
                <div className="col-md m-1">
                <RenderCard item={props.partner}
                 isLoading={props.campsitesLoading}
                 errMess={props.campsitesErrMess}/>
                </div>
                {/* TEST DIV */}
                {/* <div className="col-md m-1">
                    <RenderCard item={props.social}/>
                </div> */}

               
            </div>
        </div>
    )
}

function RenderCard({ item, isLoading, errMess }) {
    if (isLoading) {
        return (
            <Loading />
        );
    }
    if (errMess) {
        return (
            <h4>{errMess}</h4>
        );
    }
    return (
        <Card>
            <CardImg src={item.image} alt={item.name} />
            <CardBody>
                <CardTitle>{item.name}</CardTitle>
                <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
    );
}

export default Home;