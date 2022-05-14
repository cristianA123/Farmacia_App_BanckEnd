import axios from 'axios'

const instance = axios.create({
  baseURL: 'ec2-54-187-23-87.us-west-2.compute.amazonaws.com:81',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default instance
