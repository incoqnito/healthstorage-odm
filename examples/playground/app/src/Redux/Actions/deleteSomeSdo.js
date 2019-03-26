
/** constants */
import { DELETE_SOME_SDO_SUCCESS } from "../constants"
import { DELETE_SOME_SDO_FAILED } from "../constants"

/** sidebar toggle */
export const deleteSomeSdo = (hsModel) => {
    return (dispatch) => {
        hsModel.destroy()
            .then(sdoModelId => {
                return dispatch({
                    type: DELETE_SOME_SDO_SUCCESS,
                    payload: {
                        sdoModelId: sdoModelId
                    }
                })
            })
            .catch(error => {
                return dispatch({
                    type: DELETE_SOME_SDO_FAILED,
                    payload: {
                        error: error
                    }
                })
            })
    }
}