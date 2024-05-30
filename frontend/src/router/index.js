import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductView from '@/views/ProductView.vue'
import CartView from '@/views/CartView.vue'
import UserView from '@/views/UserView.vue'
import RegisterView from '@/views/RegisterView.vue'
import GenresView from '@/views/GenresView.vue'
import GenreView from '@/views/GenreView.vue'
import ArtistsView from '@/views/ArtistsView.vue'
import ArtistView from '@/views/ArtistView.vue'

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
      path: '/artists/:id',
      name: 'artist',
      component: ArtistView
    },
    {
      path: '/genres/:id',
      name: 'genre',
      component: GenreView
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/user',
      name: 'user',
      component: UserView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
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
    }
  ]
})

export default router
