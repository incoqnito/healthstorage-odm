
/** constants */
import { CONFIG_SELECT_SCHEMA_OWNER } from "../constants"

/** sidebar toggle */
export const configSelectSchemaOwnerId = (schemaId, ownerId, schema, hsModel) => {
    return {
        type: CONFIG_SELECT_SCHEMA_OWNER,
        payload: {
            schemaId: schemaId,
            ownerId: ownerId,
            schema: schema,
            hsModel: hsModel
        }
    }
}