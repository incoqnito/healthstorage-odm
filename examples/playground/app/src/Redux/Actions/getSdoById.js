
/** constants */
import { GET_SDO_BY_ID_SUCCESS } from "../constants"
import { GET_SDO_BY_ID_FAILED } from "../constants"

/** sidebar toggle */
export const getSdoById = (hsModel, id) => {
    return (dispatch) => {
        hsModel.findById(id)
            .then(sdos => {
                return dispatch({
                    type: GET_SDO_BY_ID_SUCCESS,
                    payload: {
                        sdoList: [sdos]
                    }
                })
            })
            .catch(error => {
                return dispatch({
                    type: GET_SDO_BY_ID_FAILED,
                    payload: {
                        error: error
                    }
                })
            })
    }
}