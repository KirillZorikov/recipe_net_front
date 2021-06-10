import axios from "axios";
import authHeader from "../auth-header";
import {constants} from '../../constants'

const API_URL = constants.API_URL;

class PurchasesUserService {
    async getListPurchasesRecipes() {
        return await axios.get(API_URL + `recipes/purchases`, {
            headers: authHeader(),
        });
    }
    async getPurchases() {
        return await axios.get(API_URL + `purchases`, {headers: authHeader()});
    }
    async addToPurchases(recipe_slug) {
        return await axios.post(API_URL + `purchases`, {recipe: recipe_slug}, {headers: authHeader()});
    }
    async deleteFromPurchases(recipe_slug) {
        return await axios.delete(API_URL + `purchases/${recipe_slug}`, {headers: authHeader()});
    }
    async downloadPurchases() {
        const config = {
            responseType: 'blob',
            headers: authHeader()
        };
        return await axios.get(API_URL + `purchases/download`, config);
    }
}

export default new PurchasesUserService();