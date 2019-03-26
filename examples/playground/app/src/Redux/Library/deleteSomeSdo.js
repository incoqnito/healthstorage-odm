/** toggle sidebar */
export const deleteSomeSdo = (state, payload) => {

    state.requestStack.unshift({
        name: 'Delete Sdo',
        state: 'OK',
        value: payload.sdoModelId
    })

    return {
        ...state,
        sdoList: state.sdoList.filter(sdoModel => sdoModel.md.id !== payload.sdoModelId),
        currentError: {},
        requestStack: state.requestStack
    }
}