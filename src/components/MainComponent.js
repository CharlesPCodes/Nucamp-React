import React, { Component } from 'react';
import { actions } from 'react-redux-form';
import Directory from './DirectoryComponent';
import { CAMPSITES } from '../shared/campsites';
import { COMMENTS } from '../shared/comments';
import { PARTNERS } from '../shared/partners';
import { PROMOTIONS } from '../shared/promotions';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponents';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import Contact from './ContactComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import About from './AboutComponent';
import { postComment, fetchCampsites, fetchComments, fetchPromotions, postFeedback, fetchPartners} from '../redux/ActionCreator';
import { TransitionGroup, CSSTransition } from 'react-transition-group';



const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions,
    };
};


// pass props + dispatch
const mapDispatchToProps = {
    postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text)),
    fetchCampsites: () => (fetchCampsites()),
    resetFeedbackForm: () => (actions.reset('feedbackForm')),
    fetchComments: () => (fetchComments()),
    fetchPromotions: () => (fetchPromotions()),
    postFeedback: (firstName, lastName, phoneNum, email, agree, contactType, feedback) => (postFeedback(firstName, lastName, phoneNum, email, agree, contactType, feedback)),
    fetchPartners: () => (fetchPartners())
};




class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            comments : COMMENTS,
            partners : PARTNERS,
            promotions: PROMOTIONS
            // social: SOCIAL
        };
    }
    componentDidMount() {
        this.props.fetchCampsites();
        this.props.fetchComments();
        this.props.fetchPromotions();
        this.props.fetchPartners();
    }
        render() {
            const HomePage = () => {
                return (
                    <Home
                    // passes props.campsites to allow campsite(s) to be called  
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                    // sets loading campsitesLoading to call the loading function via the reducer same with errorMess
                    campsitesLoading={this.props.campsites.isLoading}
                    campsitesErrMess={this.props.campsites.errMess}
                    // passes props.promotions to allow promotion(s) to be called
                    promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                    // sets loading campsitesLoading to call the loading function via the reducer same with error
                    promotionLoading={this.props.promotions.isLoading}
                    promotionErrMess={this.props.promotions.errMess}
                    // passes props.promotions to allow promotion(s) to be called
                    partner={this.props.partners.partners.filter(partner=>partner.featured)[0]}
                    partnerLoading={this.props.partners.isLoading}
                    partnerErrMess={this.props.partners.errMess}
                    // post variables
                    postComment={this.props.postComment}
                    // postFeedback={this.props.postFeedback}
                />
                );
            }
            // THIS renders the CampsiteWithId to have the following: campsite that matches id  + comments to that campsite rendered to the directory page 
            const CampsiteWithId = ({match}) => { // when there is a match
                return (
                    <CampsiteInfo // pass the following into CampsiteInfo so that they can be called
                    campsite={this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
                    isLoading={this.props.campsites.isLoading}
                    errMess={this.props.campsites.errMess}
                    comments={this.props.comments.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                />   
                );
            };    

            return (
                <div>
                     <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route path='/home' component={HomePage} />
                            {/* Route to /directory on pageload & pass campsites from this.props.campsites into the Directory function in DirectoryComponent.js */}
                            <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} />} />
                            <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                            {/* Route to /contactus on pageload & pass postFeedback from mapDispatchToProps */}
                            <Route exact path='/contactus' render={() => <Contact  postFeedback={postFeedback}/> } />
                             {/* Route to /aboutus on pageload & pass partners from this.props.partners into the About function in AboutComponent.js */}
                            <Route exact path='/aboutus' render={() => <About partners={this.props.partners} /> } />
                            {/* Redirect to home on app load or if a link is not avaible */}
                            <Redirect to='/home' />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
                </div>
                
            );
        };
    }
    

    

    export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));