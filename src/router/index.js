import {createRouter, createWebHistory} from 'vue-router'
import NotFound from "../views/misc/NotFound";
import About from "../views/misc/About";
import Tech from "../views/misc/Tech";
import Home from "../views/Home";
import Register from "../views/auth/Register";
import Login from "../views/auth/Login";
import Logout from "../views/auth/Logout";
import ChangePassword from "../views/auth/ChangePassword";

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
    const publicPages = ['Home', '404', 'About', 'Tech', 'Register', 'Login', 'Logout', 'ChangePassword'];
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
