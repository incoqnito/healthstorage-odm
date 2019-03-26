
/** constants */
import { GET_SDOS_FOR_SCHEMA_SUCCESS } from "../constants"
import { GET_SDOS_FOR_SCHEMA_FAILED } from "../constants"

/** sidebar toggle */
export const getSdosForSchema = (hsInstance) => {
    return (dispatch) => {
        hsInstance.findAll()
            .then(response => {
                return dispatch({
                    type: GET_SDOS_FOR_SCHEMA_SUCCESS,
                    payload: {
                        sdoList: response.list
                    }
                })
            })
            .catch(error => {
                return dispatch({
                    type: GET_SDOS_FOR_SCHEMA_FAILED,
                    payload: {
                        error: error
                    }
                })
            })
    }
}