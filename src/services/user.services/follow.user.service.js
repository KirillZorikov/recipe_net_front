import axios from "axios";
import authHeader from "../auth-header";
import {constants} from '../../constants'

const API_URL = constants.API_URL;

class FollowUserService {
    async getListFollowingRecipes(page) {
        let params = page ? {page: page} : {};
        return await axios.get(API_URL + `recipes/follows`, {
            headers: authHeader(),
            params: params,
        });
    }
    async getListFollow() {
        return await axios.get(API_URL + `follows`, {headers: authHeader()});
    }
    async addFollow(username) {
        return await axios.post(API_URL + `follows`, {author: username}, {headers: authHeader()});
    }
    async deleteFollow(username) {
        return await axios.delete(API_URL + `follows/${username}`, {headers: authHeader()});
    }
}

export default new FollowUserService();