// import Http from './http-service'

class AuthService {
  static login(body) {
    return Promise.resolve({ token: 'bearer sample_token', ...body }) // Http.post(`/users/sign-in`, body)
  }
}

export default AuthService
