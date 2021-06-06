import axios from "axios";
import authHeader from "../auth-header";

const API_URL = 'http://127.0.0.1/api/v1/';

class TagsUserService {
    async getListTags() {
        return await axios.get(API_URL + 'tags', {headers: authHeader()});
    }
    // async getTag(slug) {
    //     return await axios.get(API_URL + `tags/${slug}`, {headers: authHeader()});
    // }
}

export default new TagsUserService();