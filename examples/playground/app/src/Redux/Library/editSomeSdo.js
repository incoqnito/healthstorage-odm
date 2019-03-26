/** toggle sidebar */
export const editSomeSdo = (state, payload) => {

    state.requestStack.unshift({
        name: 'Edit Sdo',
        state: 'OK',
        value: payload.sdoModel
    })

    return {
        ...state,
        sdoList: state.sdoList.map(sdoModel => (sdoModel._dataValues.md.id === payload.sdoModel._dataValues.id) ? payload.sdoModel : sdoModel),
        requestStack: state.requestStack,
        showEditModalToggle: false
    }
}