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
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/logout',
        name: 'Logout',
        component: Logout,
    },
    {
        path: '/change_password',
        name: 'ChangePassword',
        component: ChangePassword,
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        props: true
    },
    {
        path: '/recipe/:slug',
        name: 'Recipe',
        component: Recipe,
        props: true
    },
    {
        path: '/favorites',
        name: 'Favorites',
        component: Favorites
    },
    {
        path: '/recipes/:username',
        name: 'Author',
        component: Author,
        props: true
    },
    {
        path: '/recipes/follows',
        name: 'Follow',
        component: Follow,
        props: true
    },
    {
        path: '/purchases',
        name: 'ShopList',
        component: ShopList
    },
    {
        path: '/recipes/add',
        name: 'AddRecipe',
        component: AddUpdateRecipe
    },
    {
        path: '/recipes/update/:slug',
        name: 'UpdateRecipe',
        component: AddUpdateRecipe,
        props: true
    },
    {
        path: '/reset_password',
        name: 'ResetPassword',
        component: ResetPassword
    },
    {
        path: '/reset_password_complete',
        name: 'ResetPasswordComplete',
        component: ResetPasswordComplete
    },
    {
        path: '/about-author',
        name: 'About',
        component: About,
    },
    {
        path: '/about-tech',
        name: 'Tech',
        component: Tech,
    },
    {
        path: '/404',
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
            name: '404',
            params: {from_url: to.path}
        })
    }
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router
