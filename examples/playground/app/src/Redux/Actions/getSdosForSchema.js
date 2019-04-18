
/** constants */
import { GET_SDOS_FOR_SCHEMA_SUCCESS } from "../constants"
import { GET_SDOS_FOR_SCHEMA_FAILED } from "../constants"

/** sidebar toggle */
export const getSdosForSchema = (hsModel) => {
    return (dispatch) => {
        hsModel.find()
            .then(sdos => {
                return dispatch({
                    type: GET_SDOS_FOR_SCHEMA_SUCCESS,
                    payload: {
                        sdoList: sdos
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