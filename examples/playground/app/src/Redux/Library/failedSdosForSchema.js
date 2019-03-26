/** toggle sidebar */
export const getSdosForSchema = (state, payload) => {

    state.requestStack.unshift({
        name: 'Get sdos for schema',
        state: 'FAILED',
        value: payload.error
    })

    return {
        ...state,
        sdoList: [],
        currentError: {},
        requestStack: state.requestStack
    }
}