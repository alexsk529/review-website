import Axios from 'axios';

const REACT_APP_URL = process.env.REACT_APP_URL || 'http://localhost:5000'
const instance = Axios.create({
    //baseURL: REACT_APP_URL,
    baseURL: 'https://review-website.onrender.com',
    withCredentials: true
})

export default instance