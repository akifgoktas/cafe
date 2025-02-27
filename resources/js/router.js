import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from './stores/userStore.js';
import Home from './pages/Home.vue';
import Categories from './pages/Categories.vue';
import Products from './pages/Products.vue';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import Resetpassword from './pages/ResetPassword.vue';
import CategoryAdd from "./pages/CategoryAdd.vue";
import UserUpdate from "./pages/UserUpdate.vue";

const routes = [
    { path: '/admin', name: 'Home', component: Home },
    { path: '/admin/kategoriler', name: 'Categories', component: Categories },
    { path: '/admin/urunler', name: 'Products', component: Products },
    { path: '/admin/login', name: 'Login', component: Login },
    { path: '/admin/register', name: 'Register', component: Register },
    { path: '/admin/resetpassword', name: 'ResetPassword', component: Resetpassword },
    { path: '/admin/userupdate', name: 'UserUpdate', component: UserUpdate },
    { path: '/admin/categoryadd', name: 'CategoryAdd', component: CategoryAdd },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useUserStore();
  if (authStore.user_status === null) {
    await authStore.checkSession();
  }

  if (!authStore.user_status) {
    if (['Login', 'Register', 'ResetPassword'].includes(to.name)) {
      return next();
    }
    return next({ name: 'Login' });
  }

  if (authStore.user_status) {
    if (['Login', 'Register', 'ResetPassword'].includes(to.name)) {
      return next({ name: 'Home' });
    }
    return next();
  }

  next();
});

export default router;