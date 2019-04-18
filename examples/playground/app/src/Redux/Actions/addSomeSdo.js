
/** constants */
import { ADD_SOME_SDO_SUCCESS } from "../constants"
import { ADD_SOME_SDO_FAILED } from "../constants"
import HsModel from "../../../../../../src/core/hsModel";

/** sidebar toggle */
export const addSomeSdo = (sdo, hsModel) => {
    return (dispatch) => {
        const newModel = new HsModel(sdo)
        newModel.save()
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