import axios from "axios";
import authHeader from "../auth-header";
import {constants} from '../../constants'

const API_URL = constants.API_URL;

class MiscUserService {
    async getAuthorInfo(username) {
        return await axios.get(API_URL + `users/${username}`, {headers: authHeader()});
    }

    async getImage(link) {
        const config = {
            responseType: 'blob',
            headers: {
                'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
            }
        };
        let fileName = link.split('/').pop();
        if (!fileName) {
            return '';
        }
        return await axios.get(link, config);
    }

    async getListProducts() {
        return await axios.get(API_URL + `products`, {headers: authHeader()});
    }

    async getPurchasesCount() {
        return await axios.get(API_URL + `purchases/count`, {headers: authHeader()});
    }
}

export default new MiscUserService();