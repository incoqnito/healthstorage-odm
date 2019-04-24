
/** constants */
import { GET_SDO_BY_CONSTRAINTS_SUCCESS } from "../constants"
import { GET_SDO_BY_CONSTRAINTS_FAILED } from "../constants"

/** sidebar toggle */
export const getSdoByConstraints = (hsModel, where, opts) => {
    return (dispatch) => {
        hsModel.findOne(where, opts)
            .then(sdos => {
                return dispatch({
                    type: GET_SDO_BY_CONSTRAINTS_SUCCESS,
                    payload: {
                        sdoList: (sdos) ? [sdos] : []
                    }
                })
            })
            .catch(error => {
                return dispatch({
                    type: GET_SDO_BY_CONSTRAINTS_FAILED,
                    payload: {
                        error: error
                    }
                })
            })
    }
}