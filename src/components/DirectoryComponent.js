import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle} from 'reactstrap';


class Directory extends Component {
 


    render(){
        // map the following to const of directory so that we can call it later
        const directory = this.props.campsites.map(campsite => {
            return (
                // add the following to directory (ie card click, card img, card title)
                <div key={campsite.id} className="col-md-5 m-1">
                    <Card onClick={() => this.props.onClick(campsite.id)}>
                        <CardImg src={campsite.image} alt={campsite.name} />
                        <CardImgOverlay>
                            <CardTitle>{campsite.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });
        return(
            <div className="container">
                <div className="row">
                    {/* import directory from above and place it inside of a div with the class of row */}
                    {directory}
                </div>
             
            </div>
        );
    }
}

export default Directory;