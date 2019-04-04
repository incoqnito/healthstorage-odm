/** toggle sidebar */
export const addSomeSdo = (state, payload) => {

    state.sdoList.unshift(payload.sdoModel)

    console.log(payload.sdoModel)
    
    state.requestStack.unshift({
        name: 'Add Sdo',
        state: 'OK',
        value: payload.sdoModel
    })

    return {
        ...state,
        sdoList: state.sdoList,
        currentError: {},
        requestStack: state.requestStack
    }
}