import axios from "axios";
import authHeader from "../auth-header";

const API_URL = 'http://127.0.0.1/api/v1/';

class FavoritesUserService {
    async getListFavoritesRecipes(page) {
        let params = page ? {page: page} : {};
        return await axios.get(API_URL + `recipes/favorites`, {
            headers: authHeader(),
            params: params,
        });
    }
    async getFavorites() {
        return await axios.get(API_URL + `favorites`, {headers: authHeader()});
    }
    async addToFavorites(recipe_slug) {
        return await axios.post(API_URL + `favorites`, {author: recipe_slug}, {headers: authHeader()});
    }
    async deleteFromFavorites(recipe_slug) {
        return await axios.delete(API_URL + `favorites/${recipe_slug}`, {headers: authHeader()});
    }
}

export default new FavoritesUserService();