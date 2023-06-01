const authRoute = require('./auth.route')
const userRoute = require('./user.route')
const questionRoute = require('./question.route')
const predictRoute = require('./predict.route')
const answerRoute = require('./answer.route')
const analyzeRoute = require('./analyze.route')
const weatherRoute = require('./weather.route')
const recommendationRoute = require('./recommendation.route')

const _routes = [
  ['/auth', authRoute],
  ['/users', userRoute],
  ['/questions', questionRoute],
  ['/answers', answerRoute],
  ['/predict', predictRoute],
  ['/weather', weatherRoute],
  ['/analyze', analyzeRoute],
  ['/recommendation', recommendationRoute]
]

const routes = (app) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}

module.exports = routes
