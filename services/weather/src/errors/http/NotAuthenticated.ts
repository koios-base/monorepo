class NotAuthenticated extends Error {
  statusCode = 403
  constructor() {
    super('You must be authenticated to perform that action. Please try again once you have authenticated via Bearer token')
  }
}

export default NotAuthenticated