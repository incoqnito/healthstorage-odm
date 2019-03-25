/** import redux store */
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

/** constants */
import { CONFIG_SELECT_SCHEMA_OWNER } from "./constants"

/** library */
import { configSelectSchemaOwnerId } from "./Library/configSelectSchemaOwnerId"

/** create initial state */
const initialState = {
    config: {
        schemaId: false,
        ownerId: false
    }
}

/** reduces */
const reduxReducer = (state = initialState, action) => {
    switch(action.type) {
        case CONFIG_SELECT_SCHEMA_OWNER:
            return configSelectSchemaOwnerId(state, action.payload)
        default: return state
    }
}

/** export store */
export const store = createStore(reduxReducer, applyMiddleware(thunk))