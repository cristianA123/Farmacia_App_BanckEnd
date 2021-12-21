class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem('user'))
    
    return user?.refreshToken
  }

  getLocalAccessToken() {
    const user = localStorage.getItem('token')
    
    return user
  }

  updateLocalAccessToken(token) {
    
    localStorage.setItem('token', token)
  }

  getUser() {
    return localStorage.getItem('token')
  }

  setUser(user) {
    console.log(JSON.stringify(user))
    localStorage.setItem('token', JSON.stringify(user))
  }

  removeUser() {
    localStorage.removeItem('user')
  }
}

export default new TokenService()
