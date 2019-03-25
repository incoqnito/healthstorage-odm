/** import bootstrap */
import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Route } from 'react-router-dom';

/** import content */
import SelectSchema from './SelectSchema/SelectSchema'

export default class Page extends Component {

    /** render view */
    render = () => {
        return (
            <Container fluid={true} className="--iq-app-page">
                <Route exact={true} path="/" component={SelectSchema}/>
            </Container>
        )
    }
}