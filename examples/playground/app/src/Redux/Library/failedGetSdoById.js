/** toggle sidebar */
export const failedGetSdoById = (state, payload) => {

    state.requestStack.unshift({
        name: 'Get sdo by id',
        state: 'FAILED',
        value: payload.error
    })

    return {
        ...state,
        currentError: {},
        requestStack: state.requestStack
    }
}