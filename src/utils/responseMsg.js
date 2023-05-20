const responseMsg = (req, route, message) => {
  const { method, path } = req
  return `[${method}]:/${route}${path} => ${message}`
}

module.exports = responseMsg
