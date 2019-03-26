/** toggle sidebar */
export const addSomeSdo = (state, payload) => {

    state.sdoList.push(payload.sdoModel)

    state.requestStack.push({
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