/** toggle sidebar */
export const failedEditSomeSdo = (state, payload) => {
    state.requestStack.push({
        name: 'Edit Sdo',
        state: 'FAILED',
        value: payload.error.message
    })
    return {
        ...state,
        currentError: payload.error,
        requestStack: state.requestStack,
        showEditModalToggle: false
    }
}