/** import bootstrap */
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

export default class Header extends Component {

    /** render view */
    render = () => {
        return (
            <Container fluid={true} className="--iq-app-header">
                <Row>
                    <Container>
                        <Row>
                            <Col xs="6" className="--iq-app-logo align-self-center">
                                <img src="https://www.incoqnito.io/static/logo-horizontal.svg" />
                            </Col>
                            <Col xs="6" className="--iq-app-name align-self-center">
                                <span>Playground</span>
                            </Col>
                        </Row>
                    </Container>
                </Row>
            </Container>
        )
    }
}