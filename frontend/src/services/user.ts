import axios from "axios"

interface UserInput {
  email: string
  password: string
}

const registerUser = (user: UserInput) => {
  return axios.post('http://localhost:3000/api/users', user)
}

export {
  registerUser
}