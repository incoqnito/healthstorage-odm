/** import redux store */
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

/** constants */
import { CONFIG_SELECT_SCHEMA_OWNER } from "./constants"
import { ADD_SOME_SDO_SUCCESS } from "./constants"
import { ADD_SOME_SDO_FAILED } from "./constants"
import { GET_SDOS_FOR_SCHEMA_SUCCESS } from "./constants"
import { GET_SDOS_FOR_SCHEMA_FAILED } from "./constants"
import { DELETE_SOME_SDO_SUCCESS } from "./constants"
import { DELETE_SOME_SDO_FAILED } from "./constants"
import { SHOW_EDIT_MODAL } from "./constants"
import { EDIT_SOME_SDO_SUCCESS } from "./constants"
import { EDIT_SOME_SDO_FAILED } from "./constants"
import { GET_SDO_BY_ID_SUCCESS } from "./constants"
import { GET_SDO_BY_ID_FAILED } from "./constants"
import { GET_SDO_BY_CONSTRAINTS_SUCCESS } from "./constants"
import { GET_SDO_BY_CONSTRAINTS_FAILED } from "./constants"

/** library */
import { configSelectSchemaOwnerId } from "./Library/configSelectSchemaOwnerId"
import { addSomeSdo } from "./Library/addSomeSdo"
import { failedSomeSdo } from "./Library/failedSomeSdo"
import { getSdosForSchema } from "./Library/getSdosForSchema"
import { failedSdosForSchema } from "./Library/failedSdosForSchema"
import { deleteSomeSdo } from "./Library/deleteSomeSdo"
import { failedDeleteSomeSdo } from "./Library/failedDeleteSomeSdo"
import { showEditModal } from "./Library/showEditModal"
import { editSomeSdo } from "./Library/editSomeSdo"
import { failedEditSomeSdo } from "./Library/failedEditSomeSdo"
import { getSdoById } from "./Library/getSdoById"
import { failedGetSdoById } from "./Library/failedGetSdoById"
import { getSdoByConstraints } from "./Library/getSdoByConstraints"
import { failedGetSdoByConstraints } from "./Library/failedGetSdoByConstraints"

/** create initial state */
const initialState = {
    config: {
        schemaId: false,
        ownerId: false,
        schema: {},
        hsModel: false
    },
    sdoList: [],
    currentError: {},
    requestStack: [],
    showEditModalToggle: false,
    sdoToEdit: {},
    initialValues: {}
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
                return failedGetSdosForSchema(state, action.payload)
        case GET_SDO_BY_ID_SUCCESS:
            return getSdoById(state, action.payload)
        case GET_SDO_BY_ID_FAILED:
            return failedGetSdoById(state, action.payload)
        case GET_SDO_BY_CONSTRAINTS_SUCCESS:
            return getSdoByConstraints(state, action.payload)
        case GET_SDO_BY_CONSTRAINTS_FAILED:
            return failedGetSdoByConstraints(state, action.payload)
        case DELETE_SOME_SDO_SUCCESS:
            return deleteSomeSdo(state, action.payload)
        case DELETE_SOME_SDO_FAILED:
            return failedDeleteSomeSdo(state, action.payload)
        case SHOW_EDIT_MODAL:
            return showEditModal(state, action.payload)
        case EDIT_SOME_SDO_SUCCESS:
            return editSomeSdo(state, action.payload)
        case EDIT_SOME_SDO_FAILED:
            return failedEditSomeSdo(state, action.payload)
        default: return state
    }
}

/** export store */
export const store = createStore(reduxReducer, applyMiddleware(thunk))