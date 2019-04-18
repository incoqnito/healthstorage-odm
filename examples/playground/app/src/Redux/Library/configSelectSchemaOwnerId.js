/** toggle sidebar */
export const configSelectSchemaOwnerId = (state, payload) => {
    return {
        ...state,
        config: {
            schemaId: payload.schemaId,
            ownerId: payload.ownerId,
            schema: payload.schema,
            hsModel: payload.hsModel,
        }
    }
}