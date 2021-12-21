import api from './api'

class BackendApi {

  get(endpoint, data) {
    return api.get(endpoint, data)
  }

  post(endpoint, data) {
    return api.post(endpoint, data)
  }
  
}

export default new BackendApi()