import axios from 'axios'
import AuthHeader from '../Auth/AuthHeader'

const API = 'http://localhost:5000/api/v1/auth'

export default const getUser = () => {
    return axios.get(`${API}/getMe`, { headers: AuthHeader() })
}

