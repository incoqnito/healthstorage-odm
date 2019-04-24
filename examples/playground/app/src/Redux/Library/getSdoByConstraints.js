/** toggle sidebar */
export const getSdoByConstraints = (state, payload) => {

    state.requestStack.unshift({
        name: 'Get sdo by constraints',
        state: 'OK',
        value: (payload.sdoList) ? payload.sdoList : [] 
    })

    return {
        ...state,
        sdoList: (payload.sdoList) ? payload.sdoList : [],
        currentError: {},
        requestStack: state.requestStack
    }
}