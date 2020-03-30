import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

    // Render the Campsites cards with img/descriptions
  function  RenderCampsite({campsite}){
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
    // Render Comments Section
  function  RenderComments({comments}){
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
   function CampsiteInfo(props){
        if(props.campsite){
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments comments={props.comments} />
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


export default CampsiteInfo;