/** import bootstrap */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Container, Row, Col, Button, Badge } from 'reactstrap'
import Prism from 'prismjs'
import { Form, Field } from 'react-final-form'

/** children */
import EditModal from "./EditModal/EditModal"

/** redux */
import { getSdosForSchema } from "./../../../../Redux/Actions/getSdosForSchema"
import { addSomeSdo } from "./../../../../Redux/Actions/addSomeSdo"
import { deleteSomeSdo } from "./../../../../Redux/Actions/deleteSomeSdo"
import { showEditModal } from "./../../../../Redux/Actions/showEditModal"

import "prismjs/themes/prism.css"
import "prismjs/themes/prism-coy.css"

class SchemaInteraction extends Component {

    /** constructor */
    constructor(props) {
        super(props)
        this.defaultInputTypes = ['string', 'number', 'boolean', 'date']
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
            let formatType = (this.props.config.schema.properties[propertyKey].format !== undefined) ? this.props.config.schema.properties[propertyKey].format : false
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
                    if(formatType === "date-time")  evaluatedInput = new Date(Date.parse(properties[propertyKey])).toISOString()
                    break
                default: 
                    evaluatedInput = properties[propertyKey]
                    break
            }

            /** final form not supporting files */
            if(propertyKey === 'blobRefs') {
                let fileInput = document.getElementById("sdo-add-blobRefs")
                validatedData['files'] = []
                validatedData.files.push(fileInput.files[0])
            } else {
                validatedData[propertyKey] = evaluatedInput
            }  
        })
        return validatedData
    }

    /** is required validation */
    isRequired = value => (value) ? undefined : "This field is required.";

    /** delete sdo item */
    onDeleteSdoItem = (sdoModel) => {
        this.props.deleteSomeSdo(sdoModel)
    }

     /** delete sdo item */
     onEditSdoItem = (sdoModel) => {
        this.props.showEditModal(sdoModel)
    }

    /** render view */
    render = () => {
        return (
            <Fragment>
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
                                            <form enctype="multipart/form-data" onSubmit={handleSubmit}>

                                                {
                                                    (this.props.config.schema.properties !== undefined) 
                                                    ?
                                                        Object.keys(this.props.config.schema.properties).map(propertyKey => {

                                                            let propertyType = this.props.config.schema.properties[propertyKey].type

                                                            if(propertyKey !== 'md') {
                                                                let inputType = ""

                                                                let property = this.props.config.schema.properties[propertyKey]
                                                                let propIsArray = Array.isArray(propertyType)

                                                                if(propIsArray) {
                                                                    let propertyTypeTmp = propertyType.map(type => {
                                                                        let idx = this.defaultInputTypes.indexOf(type)
                                                                        return (idx > -1) ? this.defaultInputTypes[idx] : false
                                                                    }).filter(item => item !== false)[0]
                                                                    propertyType = propertyTypeTmp
                                                                }
                                                                
                                                                switch(propertyType) {
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

                                                                if(propertyKey === 'blobRefs') inputType = 'file'

                                                                return (
                                                                    <Row key={propertyKey} className="mb-3">
                                                                        <Col className="text-left">
                                                                            <label>
                                                                                <small>{(property.title !== undefined) ? property.title : propertyKey} (type: {(Array.isArray(property.type) ? property.type.join(",") : property.type)})</small>
                                                                            </label>
                                                                            <Field name={propertyKey} validate={(this.props.config.schema.required.indexOf(propertyKey) > -1) ? this.isRequired : undefined}>
                                                                                {({input, meta}) => (
                                                                                    <Fragment>
                                                                                        <input {...input} className="form-control" type={inputType} id={"sdo-add-"+propertyKey} placeholder={"Enter " + (property.title !== undefined) ? property.title : propertyKey} />
                                                                                        <small className="--iq-error-input">{meta.error && meta.touched && <span>*{meta.error}</span>}</small>
                                                                                    </Fragment>
                                                                                )}
                                                                            </Field>
                                                                            {property.description !== undefined && <small class=" d-block mb-0 text-purple">Description: {property.description}</small>}
                                                                            {property.$comment !== undefined && <small class="d-block mb-0 text-purple">Comment: {property.$comment}</small>}
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
                                                            </span>
                                                        </div>
                                                        <div class="--iq-sdo-stack-item-content">
                                                            <Row>
                                                                <Col>
                                                                    <span className="d-block mb-2 text-pink">Sdo properties</span>
                                                                    {
                                                                        Object.keys(sdo._dataValues).map(dataKey => {
                                                                            if(dataKey !== "md") {
                                                                                return (
                                                                                    dataKey !== "blobRefs" 
                                                                                    ? <span className="d-block">{dataKey}: {sdo._dataValues[dataKey]}</span>
                                                                                    : <Button size="sm" className="d-block float-right ml-1" color="warning">File download</Button>
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
                                                            <Row>
                                                                <Col>
                                                                    <div className="mt-3">
                                                                        <Button onClick={() => this.onDeleteSdoItem(sdo)} size="sm" className="d-block float-right ml-1" color="danger">Delete</Button>
                                                                        <Button onClick={() => this.onEditSdoItem(sdo)} size="sm" className="d-block float-right ml-1" color="success">Edit</Button>
                                                                    </div>
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
                <EditModal />
            </Fragment>
        )
    }
}

/** map states to prop */
const mapStateToProps = (state) => {
    return {
        config: state.config,
        sdoList: state.sdoList,
        currentError: state.currentError,
        requestStack: state.requestStack,
        showEditModalToggle: state.showEditModalToggle,
        sdoToEdit: state.sdoToEdit
    }
}

/** dispatch props */
const mapDispatchToProps = {
    getSdosForSchema,
    addSomeSdo,
    deleteSomeSdo,
    showEditModal
}

/** export application container */
export default SchemaInteraction = connect(mapStateToProps, mapDispatchToProps)(SchemaInteraction)
