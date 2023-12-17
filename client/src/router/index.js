
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomeView.vue';
import Login from '@/views/LoginView.vue';
import Register from '@/views/RegisterView.vue';
import Settings from '@/views/SettingsView.vue';
import FabricaList from '@/views/FabricaListView.vue';
const routes = [
  { path: '/', component: Home, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/settings', component: Settings, meta: { requiresAuth: true } }, // Yeni eklenen rota
  { path: '/fabricaList', component: FabricaList, meta: { requiresAuth: true } }, // Yeni eklenen rota

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   // Sayfa özelinde giriş yapma zorunluluğu kontrolü
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

//   // Kullanıcı giriş yapmış mı kontrolü
//   const isLoggedIn = useAuthStore().isLoggedIn; // Değişiklik burada

//   if (requiresAuth && !isLoggedIn) {
//     // Kullanıcı giriş yapmamış ve giriş yapma zorunluluğu varsa login sayfasına yönlendir
//     next('/login');
//   } else {
//     // Diğer durumlarda normal yönlendirme
//     next();
//   }
// });

export default router;
