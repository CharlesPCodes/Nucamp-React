import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


// created function to 'RenderDirectoryItem' passes campsite and onClick arguments 
// returns a Card element html when onClick then open up the campsite with the correct ID
function RenderDirectoryItem({campsite, onClick}){
    return (
        // when card is clicked then open based on the id given within campsites.js
        <Card>
        <Link to={`/directory/${campsite.id}`}>
            {/* finds image and name from campsites.js and renderes the items */}
            <CardImg width="100%" src={baseUrl + campsite.image} alt={campsite.name} />
            <CardImgOverlay>
                <CardTitle>{campsite.name}</CardTitle>
            </CardImgOverlay>
        </Link>
        </Card>
    );
}

// creates function Directory passes props argument
function Directory(props){
    // creating constructor directory 
    const directory = props.campsites.campsites.map(campsite => {
        if (props.campsites.isLoading) {
            return (
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        if (props.campsites.errMess) {
            return (
                <div className="container">
                    <div className="row"> 
                        <div className="col">
                            <h4>{props.campsites.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        } 
        return(
            <div key={campsite.id} className="col-md-5 m-1">
                <RenderDirectoryItem campsite={campsite}/>
            </div>
        );
    });

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    {/* breadcrumb for easy nav */}
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Directory</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>Directory</h2>
                    <hr />
                </div>
            </div>
            <div className="row">
                {directory}
            </div>
        </div>
    );
}





export default Directory;