/** import redux store */
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

/** constants */

/** library */

/** create initial state */
const initialState = {
    
}

/** reduces */
const reduxReducer = (state = initialState, action) => {
    switch(action.type) {
        default: return state
    }
}

/** export store */
export const store = createStore(reduxReducer, applyMiddleware(thunk))