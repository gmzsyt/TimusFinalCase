import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomeView.vue';
import Login from '@/views/LoginView.vue';
import Register from '@/views/RegisterView.vue';
import { useAuthStore } from '@/store/modules/auth'; // Değişiklik burada

const routes = [
  { path: '/', component: Home, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // Sayfa özelinde giriş yapma zorunluluğu kontrolü
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  // Kullanıcı giriş yapmış mı kontrolü
  const isLoggedIn = useAuthStore().isLoggedIn; // Değişiklik burada

  if (requiresAuth && !isLoggedIn) {
    // Kullanıcı giriş yapmamış ve giriş yapma zorunluluğu varsa login sayfasına yönlendir
    next('/login');
  } else {
    // Diğer durumlarda normal yönlendirme
    next();
  }
});

export default router;
