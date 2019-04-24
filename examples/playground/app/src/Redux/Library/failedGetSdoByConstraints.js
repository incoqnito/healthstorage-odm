/** toggle sidebar */
export const failedGetSdoByConstraints = (state, payload) => {

    state.requestStack.unshift({
        name: 'Get sdo by constraints',
        state: 'FAILED',
        value: payload.error
    })

    return {
        ...state,
        currentError: {},
        requestStack: state.requestStack
    }
}