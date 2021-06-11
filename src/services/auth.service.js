import axios from 'axios';
import authHeader from "../services/auth-header";
import {constants} from '../constants'

const API_URL = constants.API_URL + 'auth/';

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'login', {
                username: user.username,
                email: user.email,
                password: user.password
            })
            .then(response => {
                if (response.data.access_token) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + 'register', user);
    }

    changePassword(user) {
        return axios.patch(API_URL + 'change_password', {
            old_password: user.oldPassword,
            password2: user.password2,
            password: user.password
        }, {headers: authHeader()});
    }

    resetPassword(email) {
        return axios.post(API_URL + 'reset_password', {email: email})
    }

    resetPasswordComplete(uidb64, token, password, password2) {
        let params = {'uidb64': uidb64, 'token': token};
        return axios.post(API_URL + 'reset_password_complete',
            {
                password2: password2,
                password: password
            },
            {params: params})
    }
}

export default new AuthService();