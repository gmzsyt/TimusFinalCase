import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomeView.vue';
import Login from '@/views/account/LoginView.vue';
import Register from '@/views/account/RegisterView.vue';
import Settings from '@/views/users/SettingsView.vue';
import FabricaList from '@/views/factories/FabricaListView.vue';
import FactoryDetail from '@/views/factories/FactoryDetailView.vue';
const routes = [
  { path: '/', component: Home, meta: { requiresAuth: true } },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/settings', component: Settings, meta: { requiresAuth: true } },
  { path: '/detail', component: FactoryDetail, meta: { requiresAuth: true } }, 
  { path: '/fabricaList', component: FabricaList, meta: { requiresAuth: true } }, // Yeni eklenen rota
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
