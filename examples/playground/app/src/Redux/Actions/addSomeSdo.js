
/** constants */
import { ADD_SOME_SDO_SUCCESS } from "../constants"
import { ADD_SOME_SDO_FAILED } from "../constants"

/** sidebar toggle */
export const addSomeSdo = (sdo, hsInstance) => {
    return (dispatch) => {
        hsInstance.create(sdo)
            .then(sdoModel => {
                return dispatch({
                    type: ADD_SOME_SDO_SUCCESS,
                    payload: {
                        sdoModel: sdoModel
                    }
                })
            })
            .catch(error => {
                return dispatch({
                    type: ADD_SOME_SDO_FAILED,
                    payload: {
                        error: error
                    }
                })
            })
    }
}