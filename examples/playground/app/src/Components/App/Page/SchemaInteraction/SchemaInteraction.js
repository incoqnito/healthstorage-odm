/** import bootstrap */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Container, Row, Col, Button, Badge } from 'reactstrap'
import Prism from 'prismjs'
import { Form, Field } from 'react-final-form'

/** redux */
import { getSdosForSchema } from "./../../../../Redux/Actions/getSdosForSchema"
import { addSomeSdo } from "./../../../../Redux/Actions/addSomeSdo"
import { deleteSomeSdo } from "./../../../../Redux/Actions/deleteSomeSdo"

import "prismjs/themes/prism.css"
import "prismjs/themes/prism-coy.css"

class SchemaInteraction extends Component {

    /** constructor */
    constructor(props) {
        super(props)
        this.onDeleteSdoItem = this.onDeleteSdoItem.bind(this)
    }

    /** will mount */
    componentWillMount = () => {
        if(this.props.config.schema.properties === undefined) this.props.history.push('/')
    }

    /** did mount */
    componentDidMount = () => {
        Prism.highlightAll();
        this.props.getSdosForSchema(this.props.config.hsInstance)
    }

    /** did mount */
    componentDidUpdate = () => {
        Prism.highlightAll();
    }

    /** submit */
    onSubmit = (sdoProps) => {
        let validatedSdoProps = this.typeValidation(sdoProps)
        this.props.addSomeSdo(validatedSdoProps, this.props.config.hsInstance)
    }

    /** type validator */
    typeValidation = (properties) => {

        let validatedData = {}

        Object.keys(properties).forEach(propertyKey => {

            let propertyType = this.props.config.schema.properties[propertyKey].type
            let evaluatedInput = ""

            switch(propertyType) {
                case "integer": 
                    evaluatedInput = parseInt(properties[propertyKey])
                    break;
                case "double": 
                    evaluatedInput = parseFloat(properties[propertyKey])
                    break
                case "float": evaluatedInput = parseFloat(properties[propertyKey])
                case "number": 
                    evaluatedInput = parseFloat(properties[propertyKey])
                    break
                case "string": 
                    evaluatedInput = properties[propertyKey]
                    break
                default: 
                    evaluatedInput = properties[propertyKey]
                    break
            }

            validatedData[propertyKey] = evaluatedInput
        })

        return validatedData
    }

    /** is required validation */
    isRequired = value => (value) ? undefined : "This field is required.";

    /** delete sdo item */
    onDeleteSdoItem = (sdoModel) => {
        this.props.deleteSomeSdo(sdoModel)
    }

    /** render view */
    render = () => {
        return (
            <Container fluid={true} className="align-self-center --iq-height-parent">
                <Row className="--iq-height-parent">
                    <Col xs="12" md="3" className="--iq-sticky-sidebar">
                        <div className="--iq-sidebar-header">
                            <span>Selected schema</span>
                        </div>
                        <div className="--iq-sidebar-content">
                            <pre>
                                <code className="language-json --iq-schema-display">
                                    {this.props.config.schema !== undefined ? `${JSON.stringify(this.props.config.schema, null, 2)}` : ""}
                                </code>
                            </pre>
                        </div>
                    </Col>
                    <Col xs="12" md="6" className="--iq-interaction-content">
                        <div className="mb-5">
                            <div className="--iq-interaction-header">
                                <span>Schema property inputs</span>
                            </div>
                            <div>
                            <Col>
                                <Form
                                    onSubmit={this.onSubmit}
                                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                                        <form  onSubmit={handleSubmit}>

                                            {
                                                (this.props.config.schema.properties !== undefined) 
                                                ?
                                                    Object.keys(this.props.config.schema.properties).map(propertyKey => {
                                                        if(propertyKey !== 'md' && propertyKey !== 'blobRefs') {
                                                            let property = this.props.config.schema.properties[propertyKey]
                                                            
                                                            let inputType = ""
                                                            switch(this.props.config.schema.properties[propertyKey].type) {
                                                                case 'integer':
                                                                    inputType = 'number'
                                                                break
                                                                case 'double':
                                                                    inputType = "number"
                                                                break
                                                                case 'string':
                                                                    inputType = "text"
                                                                break
                                                                case 'boolean':
                                                                    inputType = "checkbox"
                                                                break
                                                                default: inputType = "text"
                                                            }

                                                            return (
                                                                <Row key={propertyKey} className="mb-3">
                                                                    <Col className="text-left">
                                                                        <label>
                                                                            <small>{(property.title !== undefined) ? property.title : propertyKey} (type: {property.type})</small>
                                                                        </label>
                                                                        <Field name={propertyKey} validate={(this.props.config.schema.required.indexOf(propertyKey) > -1) ? this.isRequired : undefined}>
                                                                            {({input, meta}) => (
                                                                                <Fragment>
                                                                                    <input {...input} className="form-control" type={inputType} placeholder={"Enter " + (property.title !== undefined) ? property.title : propertyKey} />
                                                                                    <small className="--iq-error-input">{meta.error && meta.touched && <span>*{meta.error}</span>}</small>
                                                                                </Fragment>
                                                                            )}
                                                                        </Field>
                                                                        {property.description !== undefined && <p class="mb-0">{property.description}</p>}
                                                                    </Col>
                                                                </Row> 
                                                            )
                                                        }
                                                    })
                                                : null
                                            }
                                            <Button type="submit" disabled={submitting || pristine} className="--iq-btn purple mt-3">Add SDO</Button>
                                        </form>
                                    )}
                                />
                            </Col>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="--iq-interaction-header">
                                <span>Sdos for schema</span>
                            </div>
                            <Col>
                                <div className="mt-2 --iq-sdo-stack">
                                    {
                                        this.props.sdoList.map(sdo => { 
                                            return (
                                                <div className="--iq-sdo-stack-item">
                                                    <div className="--iq-sdo-stack-item-header">
                                                        <span>
                                                            {sdo.md.id} (Revision: {sdo.md.r})
                                                            <Button onClick={() => this.onDeleteSdoItem(sdo)} size="sm" className="d-block float-right" color="danger">Delete</Button>
                                                        </span>
                                                    </div>
                                                    <div class="--iq-sdo-stack-item-content">
                                                        <Row>
                                                            <Col>
                                                                <span className="d-block mb-2 text-pink">Sdo properties</span>
                                                                {
                                                                    Object.keys(sdo._dataValues).map(dataKey => {
                                                                        if(dataKey !== "md" && dataKey !== "blobRefs") {
                                                                            return (
                                                                                <span className="d-block">{dataKey}: {sdo._dataValues[dataKey]}</span>
                                                                            )
                                                                        }
                                                                    })
                                                                }
                                                            </Col>
                                                            <Col>
                                                                <span class="d-block mb-2 text-purple">Sdo meta</span>
                                                                {
                                                                    Object.keys(sdo._dataValues.md).map(dataKey => {
                                                                        return (
                                                                            <span className="d-block">{dataKey}: {sdo._dataValues.md[dataKey]}</span>
                                                                        )
                                                                    })
                                                                }
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }  
                                </div>
                            </Col>
                        </div>
                    </Col>
                    <Col xs="12" md="3" className="--iq-sticky-sidebar dark">
                        <div className="--iq-sidebar-header">
                            <span>HsODM Interaction</span>
                        </div>
                        <div className="mt-2 --iq-request-stack">
                            {this.props.requestStack.map(request => {
                                let badgeClass = (request.state === 'OK') ? "success" : "danger"
                                return (
                                    <div className="--iq-request">
                                        <div class="--iq-request-title">
                                            <span className="--iq-request-name">{request.name}</span>
                                            <Badge className="--iq-request-status float-right d-block" color={badgeClass}>{request.state}</Badge>
                                        </div>
                                        <div class="--iq-request-content">
                                            <small className="d-block">Response:</small>
                                            {
                                                ((request.state === 'OK')) 
                                                ? 
                                                    <pre>
                                                        <code className="language-json">
                                                            {`${JSON.stringify(request.value, null, 2)}`}
                                                        </code>
                                                    </pre>
                                                : 
                                                <span class="text-danger d-block">API Error: {request.value}</span>
                                            }
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

/** map states to prop */
const mapStateToProps = (state) => {
    return {
        config: state.config,
        sdoList: state.sdoList,
        currentError: state.currentError,
        requestStack: state.requestStack
    }
}

/** dispatch props */
const mapDispatchToProps = {
    getSdosForSchema,
    addSomeSdo,
    deleteSomeSdo
}

/** export application container */
export default SchemaInteraction = connect(mapStateToProps, mapDispatchToProps)(SchemaInteraction)