/** import redux store */
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

/** constants */
import { CONFIG_SELECT_SCHEMA_OWNER } from "./constants"
import { ADD_SOME_SDO_SUCCESS } from "./constants"
import { ADD_SOME_SDO_FAILED } from "./constants"
import { GET_SDOS_FOR_SCHEMA_SUCCESS } from "./constants"
import { GET_SDOS_FOR_SCHEMA_FAILED } from "./constants"

/** library */
import { configSelectSchemaOwnerId } from "./Library/configSelectSchemaOwnerId"
import { addSomeSdo } from "./Library/addSomeSdo"
import { failedSomeSdo } from "./Library/failedSomeSdo"
import { getSdosForSchema } from "./Library/getSdosForSchema"
import { failedSdosForSchema } from "./Library/failedSdosForSchema"

/** create initial state */
const initialState = {
    config: {
        schemaId: false,
        ownerId: false,
        schema: {},
        hsInstance: false
    },
    sdoList: [],
    currentError: {},
    requestStack: []
}

/** reduces */
const reduxReducer = (state = initialState, action) => {
    switch(action.type) {
        case CONFIG_SELECT_SCHEMA_OWNER:
            return configSelectSchemaOwnerId(state, action.payload)
        case ADD_SOME_SDO_SUCCESS:
            return addSomeSdo(state, action.payload)
        case ADD_SOME_SDO_FAILED:
            return failedSomeSdo(state, action.payload)
        case GET_SDOS_FOR_SCHEMA_SUCCESS:
            return getSdosForSchema(state, action.payload)
        case GET_SDOS_FOR_SCHEMA_FAILED:
            return failedSdosForSchema(state, action.payload)
        default: return state
    }
}

/** export store */
export const store = createStore(reduxReducer, applyMiddleware(thunk))