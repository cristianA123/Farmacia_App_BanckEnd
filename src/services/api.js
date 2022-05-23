import axios from 'axios'

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

if (process.env.NODE_ENV === 'production') { 
  config.baseURL = 'ec2-54-187-23-87.us-west-2.compute.amazonaws.com:9000/web-api'
}

console.log(process.env)

const instance = axios.create(config)

export default instance
