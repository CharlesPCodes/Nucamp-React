import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Fade, Stagger } from 'react-animation-components'

function RenderPartner({ partner }) {
    // if there is a partner then:
    if (partner) {
        return (
            // create a media React Fragment--(component to return multiple elements)
            <React.Fragment>
                {/* Media object with image to left  */}
                <Media object src={baseUrl + partner.image} alt={partner.name} width="150" />
                {/* Media body including partner name and description */}
                <Media body className="ml-5 mb-4">
                    <Media heading>{partner.name}</Media>
                    {partner.description}
                </Media>
            </React.Fragment>
        );
    }
    // if there are no partners then return empty div
    return (
        <div></div>
    );
}

function PartnerList(props) {
    // map partners to partner from MainComponent.js
    const partners = props.partners.partners.map(partner => {
        return (
            // return a media with li tag which passes RenderPartner to load
            <Fade in key={partner.id}>
                <Media tag='li'>
                    <RenderPartner partner={partner} />
                </Media>
            </Fade>
        )
    })

    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
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
    return (
        <div className="col mt-4">
            <Media list>
                <Stagger in>
                    {partners}
                </Stagger>
            </Media>
        </div>
    );

}


function About(props) {

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    {/* Breadcrumb for easy navigation */}
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>About Us</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>About Us</h2>
                    <hr />
                </div>
            </div>
            <div className="row row-content">
                <div className="col-sm-6">
                    <h3>Our Mission</h3>
                    <p>We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. We increase access to adventure for the public while promoting safe and respectful use of resources. The expert wilderness trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform for campers to share reviews on campsites they have visited with each other.</p>
                </div>
                <div className="col-sm-6">
                    {/* create a card with a information section */}
                    <Card>
                        <CardHeader className="bg-primary text-white"><h3>Facts At a Glance</h3></CardHeader>
                        <CardBody>
                            <dl className="row">
                                <dt className="col-6">Founded</dt>
                                <dd className="col-6">February 3, 2016</dd>
                                <dt className="col-6">No. of Campsites in 2019</dt>
                                <dd className="col-6">563</dd>
                                <dt className="col-6">No. of Reviews in 2019</dt>
                                <dd className="col-6">4388</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">42</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col">
                    <Card className="bg-light mt-3">
                        {/* card with quote */}
                        <CardBody>
                            <blockquote className="blockquote">
                                <p className="mb-0">I will not follow where the path may lead, but I will go where there is no path, and I will leave a trail.</p>
                                <footer className="blockquote-footer">Muriel Strode,{' '}
                                    <cite title="Source Title">"Wind-Wafted Wild Flowers" -
                                    The Open Court, 1903</cite>
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h3>Community Partners</h3>
                </div>
                <div className="col mt-4">
                    {/* pass PartnerList to load & pass partners to props.partners so that we can call the correct information */}
                    <PartnerList partners={props.partners} />
                </div>
            </div>
        </div>
    );

}

export default About;