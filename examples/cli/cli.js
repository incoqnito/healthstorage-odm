#!/usr/bin/env node

/** Try cli function */
try {
  /** Slice first arguments */
  var args = process.argv.slice(2)
  if (args === undefined) throw new Error('No arguments provided')

  /** Check if script name is set */
  var scriptName = args[0]
  if (scriptName === undefined || scriptName === '') throw new Error('No script name provided')

  /** Check if action name is set */
  var actionName = args[1]
  if (actionName === undefined || actionName === '') throw new Error('No action name provided')

  /** Require script and call function */
  var cliScript = require(`./src/${scriptName}.js`)
  cliScript[actionName]()
} catch (e) {
  console.log(e.message)
}
