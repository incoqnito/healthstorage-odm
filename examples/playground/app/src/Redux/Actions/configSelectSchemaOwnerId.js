
/** constants */
import { CONFIG_SELECT_SCHEMA_OWNER } from "../constants"

/** sidebar toggle */
export const configSelectSchemaOwnerId = (schemaId, ownerId, schema, hsInstance) => {
    return {
        type: CONFIG_SELECT_SCHEMA_OWNER,
        payload: {
            schemaId: schemaId,
            ownerId: ownerId,
            schema: schema,
            hsInstance: hsInstance
        }
    }
}