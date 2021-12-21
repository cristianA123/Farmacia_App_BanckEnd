import axiosInstance from './api'
import TokenService from './token.service'

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken()
      
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token  
      }
      
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  axiosInstance.interceptors.response.use(
    (res) => {

      return res
    },
    async (err) => {
      const originalConfig = err.config
      
      if (err.response.status === 401) {
        console.log('Refrescando token')
        
        const rs = await axiosInstance.post('/refresh')
        const accessToken = rs.data.data.token

        TokenService.updateLocalAccessToken(accessToken)
        
        return axiosInstance(originalConfig)
    
      }
    
      return Promise.reject(err)
    }
  )
}

export default setup