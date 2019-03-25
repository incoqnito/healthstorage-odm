/** import bootstrap */
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

export default class Header extends Component {

    /** render view */
    render = () => {
        return (
            <Container fluid={true} className="--iq-app-footer">
                <Row>
                    <Container>
                        <Row>
                            <Col xs="12" className="--iq-app-copyright">
                                <span>Incoqnito - Alle Rechte vorbehalten</span>
                            </Col>
                        </Row>
                    </Container>
                </Row>
            </Container>
        )
    }
}