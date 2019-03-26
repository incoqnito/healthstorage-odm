/** toggle sidebar */
export const showEditModal = (state, payload) => {

    let initialValues = {}
    
    if(payload.sdoModel._dataValues !== undefined) {
        Object.keys(payload.sdoModel._dataValues).forEach(dataKey => {
            if(dataKey !== 'md' && dataKey !== 'blobRefs') {
                initialValues[dataKey] = payload.sdoModel._dataValues[dataKey]
            }
        })
    }

    return {
        ...state,
        showEditModalToggle: !state.showEditModalToggle,
        sdoToEdit: payload.sdoModel,
        initialValues: initialValues
    }
}