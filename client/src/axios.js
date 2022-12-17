import Axios from 'axios'

const REACT_APP_URL = process.env.REACT_APP_URL || 'http://localhost:5000'
const instance = Axios.create({
    baseURL: REACT_APP_URL
})

export default instance