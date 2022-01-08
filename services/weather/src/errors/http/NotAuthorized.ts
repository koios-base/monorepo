class NotAuthorized extends Error {
  statusCode = 403
  constructor() {
    super('You are not allowed to do that. Please authenticate as a different user or do not try your request again')
  }
}

export default NotAuthorized