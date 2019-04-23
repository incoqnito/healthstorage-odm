/** toggle sidebar */
export const showEditModal = (state, payload) => {

    let initialValues = {}
    
    if(payload.sdoModel !== undefined) {
        Object.keys(payload.sdoModel).forEach(dataKey => {
            if(dataKey !== 'md' && dataKey !== 'blobRefs' && dataKey !== '_id' && dataKey !== '__v') {
                initialValues[dataKey] = payload.sdoModel[dataKey]
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