/** toggle sidebar */
export const failedDeleteSomeSdo = (state, payload) => {
    state.requestStack.push({
        name: 'Delete Sdo',
        state: 'FAILED',
        value: payload.error.message
    })
    return {
        ...state,
        currentError: payload.error,
        requestStack: state.requestStack
    }
}