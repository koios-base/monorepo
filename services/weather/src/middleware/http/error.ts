import { STATUS_CODES} from 'http'
import { ErrorRequestHandler} from 'express'

export default (): ErrorRequestHandler => async (err, _, res, __) => {
   const status = err.statusCode && err.statusCode > 99 && err.statusCode < 600 ? err.statusCode : 500
   const message = err.message ?? STATUS_CODES[status]
  
   res.status(status).json({
    error: {
      message
    }
   })
}