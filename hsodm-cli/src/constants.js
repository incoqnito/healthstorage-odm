/** local client */
export const localClient = {
    serverUrl: "http://localhost:8080",
    adapter: "hsStorageAdapter",
    debug: false
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
        { 'name': 'Delete Schema', 'value': 'delete' }
    ],
    'sdo': [
        { 'name': 'Get Sdo', 'value': 'single' },
        { 'name': 'Get All Sdos', 'value': 'all' },
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
        },
        'add': {
            'func': 'addSchema'
        },
        'delete': {
            'func': 'deleteSchema'
        }
    },
    'sdo': {
        'single': {
            'func': 'getSdo'
        },
        'all': {
            'func': 'getSdos'
        }
    }
}