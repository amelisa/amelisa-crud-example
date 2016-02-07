let env = {}

try {
  let config = require('./default.json')
  Object.assign(env, config)
} catch (err) {
  console.error('[config]', err)
}

let stage = process.env.NODE_ENV

if (stage) {
  try {
    let stageConfig = require('./' + stage + '.json')
    Object.assign(env, stageConfig)
  } catch (err) {
    // console.error('[config]', err)
  }
}

Object.assign(env, process.env)
Object.assign(process.env, env)
