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
import { addComment, fetchCampsites } from '../redux/ActionTypes';

const mapDispatchToProps = {
    addComment: (campsiteId, rating, author, text) => (addComment(campsiteId, rating, author, text)),
    fetchCampsites: () => (fetchCampsites()),
    resetFeedbackForm: () => (actions.reset('feedbackForm'))
};

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions
    };
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
    }
        render() {
            const HomePage = () => {
                return (
                    <Home
                        campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                        campsitesLoading={this.props.campsites.isLoading}
                        campsitesErrMess={this.props.campsites.errMess}
                        promotion={this.props.promotions.filter(promotion => promotion.featured)[0]}
                        partner={this.props.partners.filter(partner => partner.featured)[0]}
                    />
                );
            }
            // THIS renders the CampsiteWithId to have the following: campsite that matches id  + comments to that campsite rendered to the directory page below in the <Switch>
            const CampsiteWithId = ({match}) => {
                return (
                    <CampsiteInfo 
                        campsite={this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
                        isLoading={this.props.campsites.isLoading}
                        errMess={this.props.campsites.errMess}
                        comments={this.props.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                        addComment={this.props.addComment}
                    />
                );
            };    

            return (
                <div>
                    <Header />
                    <Switch>
                        {/* Route path of /home to HomePage const */}
                        <Route path='/home' component={HomePage} />
                         {/* Route path of /aboutus to render FROM AboutComponent.js function partners */}
                        <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} />} />
                         {/* Route path of /directory to render FROM DirectoryComponent.js function campsites */}
                        <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                        {/* Route path of /contactus FROM component Contact */}
                        <Route exact path='/contactus' render={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} /> } />
                        {/* Route path of /directory/:campsiteId FROM the component of CampsiteWithId */}
                        <Route exact path='/aboutus' render={() => <About partners={this.props.partners} /> } />
                        {/* Redirect to always go to home page when site open */}
                        <Redirect to='/home' />
                    </Switch>
                    <Footer />
                </div>
                
            );
        };
    }
    

    

    export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));