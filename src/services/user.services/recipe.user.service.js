import axios from "axios";
import authHeader from "../auth-header";

const API_URL = 'http://127.0.0.1/api/v1/';

class RecipeUserService {
    async getListPosts(params) {
        return await axios.get(API_URL + `recipes`, {
            headers: authHeader(),
            params: params
        });
    }
    async getListRecipesByUser(username, page) {
        let params = page ? {page: page} : {};
        return await axios.get(API_URL + `recipes/${username}`, {
            headers: authHeader(),
            params: params,
        });
    }
    async getRecipe(slug) {
        return await axios.get(API_URL + `recipes/${slug}`, {headers: authHeader()});
    }
    async deletePost(slug) {
        return await axios.delete(API_URL + `recipes/${slug}`, {headers: authHeader()});
    }
    async addPost(data) {
        return await axios.post(API_URL + `recipes`, data, {headers: authHeader()});
    }
    async updatePost(slug, data) {
        return await axios.patch(API_URL + `recipes/${slug}`, data, {headers: authHeader()});
    }
}

export default new RecipeUserService();