import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductView from '@/views/ProductView.vue'
import CartView from '@/views/CartView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products/:id',
      name: 'product',
      component: ProductView
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    /*{
      path: '/albums',
      name: 'albums',
      component: AlbumsView
    },
    {
      path: '/artists',
      name: 'artists',
      component: ArtistsView
    },
    {
      path: '/genres',
      name: 'genres',
      component: GenresView
    }*/
  ]
})

export default router
