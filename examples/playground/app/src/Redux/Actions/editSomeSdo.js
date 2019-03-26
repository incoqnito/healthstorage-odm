
/** constants */
import { EDIT_SOME_SDO_SUCCESS } from "../constants"
import { EDIT_SOME_SDO_FAILED } from "../constants"

/** sidebar toggle */
export const editSomeSdo = (hsModel) => {
    return (dispatch) => {
        hsModel.update()
            .then(sdoModel => {
                return dispatch({
                    type: EDIT_SOME_SDO_SUCCESS,
                    payload: {
                        sdoModel: sdoModel
                    }
                })
            })
            .catch(error => {
                return dispatch({
                    type: EDIT_SOME_SDO_FAILED,
                    payload: {
                        error: error
                    }
                })
            })
    }
}