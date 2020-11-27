import jsonwebtoken from 'jsonwebtoken'
import { now } from 'core-js/fn/date';

export default {
  isAuthenticated: () => {
    let accessToken = localStorage.getItem('accessToken')
    if(!accessToken)
        return false

    try {
        let decoded = jsonwebtoken.verify(accessToken, process.env.MIX_JWT_SECRET)
        let left_times = decoded.exp - now() / 1000
        
        return left_times > 0
    } catch(err) {
        return false
    }
  },
  leftTokenTime: () => {
    let accessToken = localStorage.getItem('accessToken')
    if(!accessToken)
        return 0

    try {
        let decoded = jsonwebtoken.verify(accessToken, process.env.MIX_JWT_SECRET)

        return decoded.exp - now() / 1000
    } catch(err) {
        return 0
    }
  }
}
