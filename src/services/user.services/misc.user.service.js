import axios from "axios";
import authHeader from "../auth-header";
import {constants} from '../../constants'

const API_URL = constants.API_URL;

class MiscUserService {
    async getAuthorInfo(username) {
        return await axios.get(API_URL + `users/${username}`, {headers: authHeader()});
    }
    async getImage(link) {
        const config = {responseType: 'blob'};
        let fileName = link.split('/').pop();
        if (!fileName) {
            return '';
        }
        return await axios.get(link, config);
    }
}

export default new MiscUserService();