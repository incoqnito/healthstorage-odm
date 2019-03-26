
/** constants */
import { SHOW_EDIT_MODAL } from "../constants"

/** sidebar toggle */
export const showEditModal = (sdoModel) => {
    return {
        type: SHOW_EDIT_MODAL,
        payload: {
            sdoModel: sdoModel
        }
    }
}