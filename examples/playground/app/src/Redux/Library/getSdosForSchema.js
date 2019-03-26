/** toggle sidebar */
export const getSdosForSchema = (state, payload) => {

    state.requestStack.unshift({
        name: 'Get sdos for schema',
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