import {createStore} from 'vuex'
import {auth} from './auth.module';


export const store = createStore({
    modules: {
        auth
    },
    state: {
        page: 1,
        recipes: [],
        filtering: []
    },
    getters: {
        getPage: state => {
            return state.page
        },
        getRecipes: state => {
            return state.recipes
        },
        getFiltering: state => {
            return state.filtering
        }
    },
    mutations: {
        changePage(state, newPage) {
            state.page = newPage
        },
        changeRecipes(state, newRecipes) {
            state.recipes = newRecipes
        },
        changeFiltering(state, filtering) {
            state.filtering = filtering
        }
    }
})
