import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

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
                // pass the following 
                    item={props.campsite}
                    isLoading={props.campsitesLoading}
                    errMess={props.campsitesErrMess}
                />
                </div>
                {/* create card based on the RenderCard function that passes props.promotion */}
                <div className="col-md m-1">
                <RenderCard
                 // pass the following 
                        item={props.promotion}
                        isLoading={props.promotionLoading}
                        errMess={props.promotionErrMess}
                    />
                </div>
                {/* create card based on the RenderCard fucntion that passes props.partner */}
                <div className="col-md m-1">
                <RenderCard 
                 // pass the following 
                item={props.partner}
                 isLoading={props.partnerLoading}
                 errMess={props.partnerErrMess}/>
                </div>              
            </div>
        </div>
    )
}

function RenderCard({ item, isLoading, errMess }) {
    if (isLoading) {
        return (
            // pull function from LoadingComponent.js
            <Loading />
        );
    }
    // if there is an error message then return an h4 with said error message
    if (errMess) {
        return (
            <h4>{errMess}</h4>
        );
    }
    // otherwise return a card with the items from above ie: campsite, promotion, partner
    return (
        <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(50%)'
            }}>

            <Card>
                <CardImg src={baseUrl + item.image} alt={item.name} />
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    );
}

export default Home;