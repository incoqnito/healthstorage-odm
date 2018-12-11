#!/usr/bin/env node

try {
  var args = process.argv.slice(2)
  if (args === undefined) throw new Error('No arguments provided')

  var scriptName = args[0]
  if (scriptName === undefined || scriptName === '') throw new Error('No script name provided')

  var actionName = args[1]
  if (actionName === undefined || actionName === '') throw new Error('No action name provided')

  
} catch (e) {
  console.log(e.message)
}
