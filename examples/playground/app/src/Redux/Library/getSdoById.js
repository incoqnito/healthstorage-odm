/** toggle sidebar */
export const getSdoById = (state, payload) => {

    state.requestStack.unshift({
        name: 'Get sdo by id',
        state: 'OK',
        value: payload.sdoList
    })

    return {
        ...state,
        sdoList: payload.sdoList,
        currentError: {},
        requestStack: state.requestStack
    }
}