const models = require('./model')
const userRouter = require('./user');
const util = require('util')
const promisify = util.promisify
const fs = require('fs')
const readFile = promisify(fs.readFile)

module.exports = (router, app) => {
  // router.get('/job', async ctx => {
  //   const files = await readFile(path.resolve(__dirname, '../../src/job-build/index.html'), 'utf-8')
  //   ctx.body = files
  // });
  userRouter(router)

}

