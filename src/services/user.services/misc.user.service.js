import axios from "axios";
import authHeader from "../auth-header";

const API_URL = 'http://127.0.0.1/api/v1/';

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