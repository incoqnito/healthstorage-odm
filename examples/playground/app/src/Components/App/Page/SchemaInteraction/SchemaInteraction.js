/** import bootstrap */
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import Prism from 'prismjs'

/** constants */
import { uuidPattern } from "./../../../constants"

import "prismjs/themes/prism.css"
import "prismjs/themes/prism-coy.css"

class SchemaInteractionComponent extends Component {

    componentDidMount = () => {
        if(this.props.config.schema === undefined) this.props.history.push('/')
        Prism.highlightAll();
    }

    /** submit */
    onSubmit = async (values) => {
       
    }

    isUuid = value => (RegExp(uuidPattern).test(value) ? undefined : "Input does not match the uuid pattern");

    /** render view */
    render = () => {
        return (
            <Container fluid={true} className="align-self-center --iq-height-parent">
                <Row className="--iq-height-parent">
                    <Col xs="12" md="4" className="--iq-sticky-sidebar">
                        <div className="--iq-sidebar-header">
                            <span>Gewähltes Schema</span>
                            <pre>
                                <code className="language-json --iq-schema-display">
                                    {`${JSON.stringify(this.props.config.schema, null, 2)}`}
                                </code>
                            </pre>
                        </div>
                    </Col>
                    <Col xs="12" md="8"></Col>
                </Row>
            </Container>
        )
    }
}

/** map states to prop */
const mapStateToProps = (state) => {
    return {
        config: state.config
    }
}

/** dispatch props */
const mapDispatchToProps = {}

/** export application container */
export const SchemaInteraction = connect(mapStateToProps, mapDispatchToProps)(SchemaInteractionComponent)
