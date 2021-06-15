import {createRouter, createWebHistory} from 'vue-router'
import NotFound from "../views/misc/NotFound";
import About from "../views/misc/About";
import Tech from "../views/misc/Tech";
import Home from "../views/Home";
import Register from "../views/auth/Register";
import Login from "../views/auth/Login";
import Logout from "../views/auth/Logout";
import ChangePassword from "../views/auth/ChangePassword";
import Recipe from "../views/Recipe";
import Favorites from "../views/Favorites";
import Author from "../views/Author";
import Follow from "../views/Follow";
import ShopList from "../views/ShopList";
import AddUpdateRecipe from "../views/AddUpdateRecipe";
import ResetPassword from "../views/auth/ResetPassword";
import ResetPasswordComplete from "../views/auth/ResetPasswordComplete";

const routes = [
    {
        path: '/recipe_net/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/recipe_net/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/recipe_net/logout',
        name: 'Logout',
        component: Logout,
    },
    {
        path: '/recipe_net/change_password',
        name: 'ChangePassword',
        component: ChangePassword,
    },
    {
        path: '/recipe_net/',
        name: 'Home',
        component: Home,
        props: true
    },
    {
        path: '/recipe_net/recipe/:slug',
        name: 'Recipe',
        component: Recipe,
        props: true
    },
    {
        path: '/recipe_net/favorites',
        name: 'Favorites',
        component: Favorites
    },
    {
        path: '/recipe_net/recipes/:username',
        name: 'Author',
        component: Author,
        props: true
    },
    {
        path: '/recipe_net/recipes/follows',
        name: 'Follow',
        component: Follow,
        props: true
    },
    {
        path: '/recipe_net/purchases',
        name: 'ShopList',
        component: ShopList
    },
    {
        path: '/recipe_net/recipes/add',
        name: 'AddRecipe',
        component: AddUpdateRecipe
    },
    {
        path: '/recipe_net/recipes/update/:slug',
        name: 'UpdateRecipe',
        component: AddUpdateRecipe,
        props: true
    },
    {
        path: '/recipe_net/reset_password',
        name: 'ResetPassword',
        component: ResetPassword
    },
    {
        path: '/recipe_net/reset_password_complete',
        name: 'ResetPasswordComplete',
        component: ResetPasswordComplete
    },
    {
        path: '/recipe_net/about-author',
        name: 'About',
        component: About,
    },
    {
        path: '/recipe_net/about-tech',
        name: 'Tech',
        component: Tech,
    },
    {
        path: '/recipe_net/404',
        name: '404',
        component: NotFound,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior() {
        return window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
})

router.beforeEach((to, from, next) => {
    const publicPages = ['Home', '404', 'About', 'Tech', 'Register', 'ResetPasswordComplete',
        'Login', 'Logout', 'ChangePassword', 'Recipe', 'Author', 'ResetPassword'];
    const authRequired = !publicPages.includes(to.name);
    const loggedIn = localStorage.getItem('user');
    if (!to.name) {
        next({
            name: '404'
        })
    }
    if (authRequired && !loggedIn) {
        next({
            name: 'Login'
        });
    } else {
        next();
    }
});

export default router
