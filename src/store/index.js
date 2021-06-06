import {createStore} from 'vuex'
import {auth} from './auth.module';


export const store = createStore({
    modules: {
        auth
    },
    state: {
        page: 1,
        recipes: [],
    },
    getters: {
        getPage: state => {
            return state.page
        },
        getRecipes: state => {
            return state.recipes
        },
    },
    mutations: {
        changePage(state, newPage) {
            state.page = newPage
        },
        changeRecipes(state, newPosts) {
            state.posts = newPosts
        }
    }
})
