import React from 'react';
import {
    Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row, Col
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger, Transform } from 'react-animation-components';


// Render the Campsites cards with img/descriptions
function RenderCampsite({ campsite }) {
    return (
        <div className="col-md-5 m-1">
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(1.5) translateY(-50%)'
                }}>
                <Card>
                    {/* grabbing image based off of db.json from json server NOT shared/campsites.js */}
                    <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
    );
}
// Render Comments Section
function RenderComments({ comments, postComment, campsiteId }) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                <Transform enterTransform="translateX(50px)" in>
                    <h4>Comments</h4>
                </Transform>
                <Stagger in>
                    {comments.map(comment => {
                        return (
                            <Fade in key={comment.id}>
                                <div>
                                    <p>{comment.text}<br />
                                        -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
                                    </p>
                                </div>
                            </Fade>
                        );
                    })}
                </Stagger>
                {/* BUTTON TO SUBMIT COMMENT */}
                <CommentForm campsiteId={campsiteId} postComment={postComment} />
            </div>
        );
    } // otherwise return empty div
    return (<div></div>)
}
// render the following 
function CampsiteInfo(props) {
    // if loading then
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    // if error then
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    // if there are campsites then
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <FadeTransform
                            in
                            transformProps={{
                                exitTransform: 'scale(2.5) translateY(-50%)'
                            }}>
                            <h2>{props.campsite.name}</h2>
                        </FadeTransform>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {/* show RenderCampsite & RenderComments */}
                    {/* Pass campsite from props.campsite */}
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments
                    // pass comments,postComment, and campsite.id
                        comments={props.comments}
                        postComment={props.postComment}
                        campsiteId={props.campsite.id}
                    />
                </div>
            </div>
        );
    }
    else { /*IF campsite is not there then return an empty div */
        return (
            <div></div>
        );
    }
}



class CommentForm extends React.Component {
    constructor(props) {
        super(props)
        // allows this.toggleModal to be called inside of toggleModal() method
        this.toggleModal = this.toggleModal.bind(this);
        // sets default state of isModalOpen to false so it is hidden
        this.state = {
            isModalOpen: false
        }
    }

    // method that checks the state of the modal and changes to the opposite
    // if isModal = false then isModal = true &&  if isModal = true then isModal = false
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    // on submit of comment modal then pass the following
    handleSubmit(values) {
        this.toggleModal();
        // getting values from the form submit
        this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
    }
    render() {
        const required = val => val && val.length;
        const maxLength = len => val => !val || (val.length <= len);
        const minLength = len => val => val && (val.length >= len);
        return (
            <div className="container">
                {/* Modal is open checked from state of CommentForm */}
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    {/* Header with X toggle button */}
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        {/* Create local form with onSubmit of the values passed to this.handleSubmit above */}
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={6}>Rating</Label>
                                <Col md={10}>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        className="form-control"
                                        placeholder="1"
                                    >
                                        <option value="one">1</option>
                                        <option value="two">2</option>
                                        <option value="three">3</option>
                                        <option value="four">4</option>
                                        <option value="five">5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={6}>Your Name</Label>
                                <Col md={10}>
                                    {/* text field aka input */}
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        // validators to confirm if form can be submitted
                                        validators={{
                                            // makes sure there is a input, the min length is 2 characters and the max is 15
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                    {/* Erros are default in redux forms */}
                                    {/* errors passed IF the validators are not successful */}
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="text" md={6}>Comments</Label>
                                <Col md={10}>
                                    {/* text box */}
                                    <Control.textarea model=".text" id="text" name="text"
                                        placeholder="Comments"
                                        className="form-control"
                                        validators={{
                                            required,
                                        }}
                                    />
                                    {/* Erros passed if validators are not successful */}
                                    <Errors
                                        className="text-danger"
                                        model=".text"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                        }}
                                    />
                                </Col>
                            </Row>
                            {/* submit form on the click of the button AKA default to html buttons */}
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                {/* on click of button toggle modal with toggleModal method */}
                <Button outline onClick={this.toggleModal}> <i className="fa fa-pencil fa-lg" /> Submit Comment</Button>
            </div>
        )
    }
}



export default CampsiteInfo;