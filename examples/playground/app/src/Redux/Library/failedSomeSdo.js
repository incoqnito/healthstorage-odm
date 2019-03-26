/** toggle sidebar */
export const failedSomeSdo = (state, payload) => {
    state.requestStack.push({
        name: 'Add Sdo',
        state: 'FAILED',
        value: payload.error.message
    })
    return {
        ...state,
        currentError: payload.error,
        requestStack: state.requestStack
    }
}