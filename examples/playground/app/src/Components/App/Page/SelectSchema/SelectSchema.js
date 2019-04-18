/** import bootstrap */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Container, Col, Row, Button, Input } from 'reactstrap'
import { Form, Field } from 'react-final-form'


/** HsOdm */
import HealthStorageODM from '../../../../../../../../src/healthStorage'

/** redux action */
import { configSelectSchemaOwnerId } from '../../../../Redux/Actions/configSelectSchemaOwnerId';

/** constants */
import { uuidPattern } from "./../../../constants"
import { devClient } from "./../../../constants"
import HsModel from '../../../../../../../../src/core/hsModel';

class SelectSchema extends Component {

    /** submit */
    onSubmit = async (values) => {
        if(values.schemaId !== undefined && values.ownerId !== undefined) {

            let foundSchema = await HealthStorageODM.getSchema({id: values.schemaId})
            
            let hsClient = new HealthStorageODM(devClient)

            const Schema = {
                title: foundSchema.title,
                properties: foundSchema.properties,
                options: {
                    required: foundSchema.required,
                    id: values.schemaId,
                    oId: values.ownerId,
                    r: 1
                }
            }
            let hsModel = hsClient.define('dynamic', Schema)

            this.props.configSelectSchemaOwnerId(values.schemaId, values.ownerId, foundSchema, hsModel)

            this.props.history.push('/schemaInteraction')
        }
    }

    /** uuid validator */
    isUuid = value => (RegExp(uuidPattern).test(value) ? undefined : "Input does not match the uuid pattern");

    /** render view */
    render = () => {
        return (
            <Container className="align-self-center">
                <Row className="justify-content-center">
                    <Col xs="11" lg="8">
                        <div className="--iq-content-card centered">
                            <h1>SCHEMA TO INTERACT</h1>
                            <div className="mt-5">
                            <Form
                                onSubmit={this.onSubmit}
                                render={({ handleSubmit, form, submitting, pristine, values }) => (
                                    <form  onSubmit={handleSubmit}>
                                        <Row>
                                            <Col className="text-left">
                                                <label>
                                                    <small>Schema Id</small>
                                                </label>
                                                <Field name="schemaId" validate={this.isUuid}>
                                                    {({input, meta}) => (
                                                        <Fragment>
                                                            <input {...input} className="form-control" type="text" placeholder="Enter a valid schema id" />
                                                            <small className="--iq-error-input">{meta.error && meta.touched && <span>*{meta.error}</span>}</small>
                                                        </Fragment>
                                                    )}
                                                </Field>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col className="text-left">
                                                <label>
                                                    <small>Owner Id</small>
                                                </label>
                                                <Field name="ownerId" validate={this.isUuid}>
                                                    {({input, meta}) => (
                                                        <Fragment>
                                                            <input {...input} className="form-control" type="text" placeholder="Enter a valid owner id" />
                                                            <small className="--iq-error-input">{meta.error && meta.touched && <span>*{meta.error}</span>}</small>
                                                        </Fragment>
                                                    )}
                                                </Field>
                                            </Col>
                                        </Row>
                                        <Button type="submit" disabled={submitting || pristine} className="--iq-btn pink mt-3">Interact with schema</Button>
                                    </form>
                                )}
                                />
                            </div>
                            <div className="mt-2">
                                <small className="d-block">Take care, have fun!</small>
                            </div>
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
        config: state.config
    }
}

/** dispatch props */
const mapDispatchToProps = {
    configSelectSchemaOwnerId
}

/** export application container */
export default SelectSchema = connect(mapStateToProps, mapDispatchToProps)(SelectSchema)
