import axios from "axios";
import authHeader from "../auth-header";
import {constants} from '../../constants'

const API_URL = constants.API_URL;

class RecipeUserService {
    async getListRecipes(params) {
        return await axios.get(API_URL + `recipes`, {
            headers: authHeader(),
            params: params
        });
    }
    async getListRecipesByUser(params, username) {
        return await axios.get(API_URL + `${username}/recipes`, {
            headers: authHeader(),
            params: params,
        });
    }
    async getRecipe(slug) {
        return await axios.get(API_URL + `recipes/${slug}`, {headers: authHeader()});
    }
    async deleteRecipe(slug) {
        return await axios.delete(API_URL + `recipes/${slug}`, {headers: authHeader()});
    }
    async addRecipe(data) {
        return await axios.post(API_URL + `recipes`, data, {headers: authHeader()});
    }
    async updateRecipe(slug, data) {
        return await axios.patch(API_URL + `recipes/${slug}`, data, {headers: authHeader()});
    }
}

export default new RecipeUserService();