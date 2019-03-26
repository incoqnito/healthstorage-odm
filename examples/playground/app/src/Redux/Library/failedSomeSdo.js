/** toggle sidebar */
export const failedSomeSdo = (state, payload) => {
    state.requestStack.push({
        name: 'Add Some Sdo',
        state: 'FAILED',
        value: payload.error.message
    })
    return {
        ...state,
        currentError: payload.error,
        requestStack: state.requestStack
    }
}