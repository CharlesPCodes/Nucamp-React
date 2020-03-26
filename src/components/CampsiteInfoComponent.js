import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

class CampsiteInfo extends Component {
    // render the campsites
    renderCampsite(campsite){
        return(
            <div className="col-md-5 m-1">
                <Card>
                    {/* add cards with image from capsites.js */}
                    {/* All info has been recored in campsites.js */}
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
    // Comments Section
    renderComments(comments){
        if(comments){
            return(
                // here
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {/* MAP comment to include formated date via formattedDate + comment id, text, and author */}
                    {comments.map(comment => {
                        const formattedDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)));
                        return(<p key={comment.id}>{comment.text}<br />{comment.author} -- {formattedDate}</p>);
                    })}
                </div>
            );
        } // otherwise return empty div
        return (<div></div>)
    }
    // render the following 
    render(){
        if(this.props.campsite){
            return(
                <div className="container">
                <div className="row">
                    {/* RENDER CAMPSITE */}
                    {this.renderCampsite(this.props.campsite)}
                    {/* RENDER COMMENTS + DATE FROM renderComments */}
                    {this.renderComments(this.props.campsite.comments)}
                </div>
                </div>
            );
        }
        else{ /*IF campsite is not there then return an empty div */
            return(
                <div></div>
            );
        }
    }
}

export default CampsiteInfo;