import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle} from 'reactstrap';


// created function to 'RENDERDirectoryItem' passes campsite and onClick arguments 
// returns a Card element html when onClick then open up the campsite with the correct ID
function RenderDirectoryItem({campsite, onClick}){
    return (
        // when card is clicked then open based on the id given within campsites.js
        <Card>
            {/* finds image and name from campsites.js and renderes the items */}
            <CardImg width="100%" src={campsite.image} alt={campsite.name} />
            <CardImgOverlay>
                <CardTitle>{campsite.name}</CardTitle>
            </CardImgOverlay>
        </Card>
    );
}

// creates function Directory passes props argument
function Directory(props){
    // creating constructor directory 
    // 
    const directory = props.campsites.map(campsite => {
        return(
            <div key={campsite.id} className="col-md-5 m-1">
                <RenderDirectoryItem campsite={campsite}/>
            </div>
        );
    });

    return(
        <div className="container">
            <div className="row">
                {directory}
            </div>
        </div>
    );
}





export default Directory;