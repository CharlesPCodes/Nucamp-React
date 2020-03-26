import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Directory from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import { CAMPSITES } from '../shared/campsites';
import { COMMENTS } from '../shared/comments';
import { PARTNERS } from '../shared/partners';
import { PROMOTIONS } from '../shared/promotions';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponents';
import { Switch, Route, Redirect } from 'react-router-dom';
import { render } from '@testing-library/react';
import Contact from './ContactComponent';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            comments : COMMENTS,
            partners : PARTNERS,
            promotions: PROMOTIONS
            // sets default selectedCampsite to null so that only the cards show up without the descriptions/ comments
            // selectedCampsite: null
        };
    }

       // when selecting campsite(ie click) then:
    //    onCampsiteSelect(campsiteId){
        // this.setState({selectedCampsite: campsiteId});
    
    
        render() {
            const HomePage = () => {
                return (
                    <Home
                        campsite={this.state.campsites.filter(campsite => campsite.featured)[0]}
                        promotion={this.state.promotions.filter(promotion => promotion.featured)[0]}
                        partner={this.state.partners.filter(partner => partner.featured)[0]}
                    />
                );
            }
            return (
                <div>
                    <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/directory' render={() => <Directory campsites={this.state.campsites} />} />
                    <Route exact path ='/contactus' component={Contact}/>
                    <Redirect to='/home' />
                </Switch>
                </div>
            );
        };
    }
    



export default Main;