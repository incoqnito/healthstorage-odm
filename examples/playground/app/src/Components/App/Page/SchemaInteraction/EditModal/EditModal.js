/** import bootstrap */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody, Row, Col, Button } from 'reactstrap';
import { Form, Field } from 'react-final-form'

/** redux */
import { showEditModal } from "./../../../../../Redux/Actions/showEditModal"
import { editSomeSdo } from "./../../../../../Redux/Actions/editSomeSdo"

class EditModal extends Component {

    state = {
        initialValues: {}
    }

    /** constructor */
    constructor(props) {
        super(props)
        this.defaultInputTypes = ['string', 'number', 'boolean', 'date']
    }

    /** is required validation */
    isRequired = value => (value) ? undefined : "This field is required.";

    /** submit */
    onSubmit = (sdoProps) => {
        let validatedSdoProps = this.typeValidation(sdoProps)
        Object.assign(this.props.sdoToEdit, validatedSdoProps)
        this.props.editSomeSdo(this.props.sdoToEdit)
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.sdoToEdit != this.props.sdoToEdit) {
            this.setState({
                initialValues: nextProps.initialValues
            })
        } else {
           return 
        }
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

    /** render view */
    render = () => {
        return (
            <Modal isOpen={this.props.showEditModalToggle}>
                <ModalHeader toggle={this.props.showEditModal}>
                    Edit sdo data
                </ModalHeader>
                <ModalBody>
                    <Form
                        onSubmit={this.onSubmit}
                        initialValues={this.state.initialValues}
                        render={({ handleSubmit, form, submitting, pristine, values }) => (
                            <form  onSubmit={handleSubmit}>
                                {
                                    (this.props.config.schema.properties !== undefined) 
                                    ?
                                        Object.keys(this.props.config.schema.properties).map(propertyKey => {
                                            if(propertyKey !== 'md' && propertyKey !== 'blobRefs' && this.props.config.schema.properties[propertyKey].type !== 'array') {
                                                let inputType = ""

                                                let property = this.props.config.schema.properties[propertyKey]
                                                let propertyType = this.props.config.schema.properties[propertyKey].type

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
                                                            {property.description !== undefined && <small class=" d-block mb-0 text-purple">Description: {property.description}</small>}
                                                            {property.$comment !== undefined && <small class="d-block mb-0 text-purple">Comment: {property.$comment}</small>}
                                                        </Col>
                                                    </Row> 
                                                )
                                            }
                                        })
                                    : null
                                }
                                <Button type="submit" disabled={submitting || pristine} className="--iq-btn purple mt-3">Edit this SDO</Button>
                            </form>
                        )}
                    />
                </ModalBody>
            </Modal>
        )
    }
}

/** map states to prop */
const mapStateToProps = (state) => {
    return {
        config: state.config,
        showEditModalToggle: state.showEditModalToggle,
        sdoToEdit: state.sdoToEdit,
        initialValues: state.initialValues
    }
}

/** dispatch props */
const mapDispatchToProps = {
    showEditModal,
    editSomeSdo
}

/** export application container */
export default EditModal = connect(mapStateToProps, mapDispatchToProps)(EditModal)


