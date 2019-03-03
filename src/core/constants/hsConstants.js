/**
 * Type constants
 */
export const STRING = "string"
export const NUMBER = "number"
export const INTEGER = "integer"
export const BOOLEAN = "boolean"
export const OBJECT = "object"
export const ARRAY = "array"

/**
 * Adpater constants
 */
export const HS_STORAGE_ADAPTER = 'hsStorageAdapter'
export const HS_SQL_ADAPTER = 'hsSqlAdapter'

/**
 * Local constants
 */
export const LOCAL_API_URL = 'http://localhost:8080'

/**
 * Default client constant
 */
export const CLIENT = {
  serverUrl: LOCAL_API_URL,
  adapter: HS_STORAGE_ADAPTER,
  debug: true
}

/**
 * Model constants
 */
export const ASSIGN_TO_CLASS = ['HsAdapter']