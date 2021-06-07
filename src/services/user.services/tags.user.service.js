import axios from "axios";
import authHeader from "../auth-header";
import {constants} from '../../constants'

const API_URL = constants.API_URL;

class TagsUserService {
    async getListTags() {
        return await axios.get(API_URL + 'tags', {headers: authHeader()});
    }
    // async getTag(slug) {
    //     return await axios.get(API_URL + `tags/${slug}`, {headers: authHeader()});
    // }
}

export default new TagsUserService();