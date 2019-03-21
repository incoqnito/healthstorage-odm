/** local client */
export const localClient = {
    serverUrl: "http://localhost:8080",
    adapter: "hsStorageAdapter"
}

/** api endpoints */
export const apiEndpointChoices = [
    { 'name': 'Schemas', 'value': 'schema' },
    { 'name': 'Sdos', 'value': 'sdo' },
]

/** api endpoints actions */
export const apiEndpointActionChoices = {
    'schema': [
        { 'name': 'Get Schema', 'value': 'single' },
        { 'name': 'Add Schema', 'value': 'add' },
        { 'name': 'Add Schema Bulk', 'value': 'addBulk' },
        { 'name': 'Delete Schema', 'value': 'delete' }
    ],
    'sdo': [
        { 'name': 'Get Sdo', 'value': 'get' },
        { 'name': 'Get All Sdos', 'value': 'getAll' },
        { 'name': 'Update Sdo', 'value': 'update' },
        { 'name': 'Add Sdo', 'value': 'add' },
        { 'name': 'Delete Sdo', 'value': 'delete' }
    ]
}

/** api endpoint action input */
export const apiEndpointActionInput = {
    'schema': {
        'single': {
            'func': 'getSchema'
        }
    }
}