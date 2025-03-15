import axios from "axios"

interface UserInput {
  email: string
  password: string
}

const registerUser = (user: UserInput) => {
  return axios.post('test', user)
}

export {
  registerUser
}