/** toggle sidebar */
export const addSomeSdo = (state, payload) => {

    state.sdoList.unshift(payload.sdoModel)

    state.requestStack.unshift({
        name: 'Add Some Sdo',
        state: 'OK',
        value: payload.sdoModel
    })

    return {
        ...state,
        sdoList: state.sdoList,
        currentError: {},
        requestStack: state.requestStack
    }
}