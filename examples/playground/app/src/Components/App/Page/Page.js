/** import bootstrap */
import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import { Route } from 'react-router-dom';

/** import content */
import { SelectSchema } from './SelectSchema/SelectSchema'
import { SchemaInteraction } from './SchemaInteraction/SchemaInteraction'

export default class Page extends Component {
    /** render view */
    render = () => {
        return (
            <Container fluid={true}>
                <Row className="--iq-app-page">
                    <Route exact={true} path="/" component={SelectSchema}/>
                    <Route exact={true} path="/schemaInteraction" component={SchemaInteraction}/>
                </Row>
            </Container>
        )
    }
}