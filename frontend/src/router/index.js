import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProductView from '../views/ProductView.vue'
import CartView from '../views/CartView.vue'

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
    },
    {
      path: '/publishers',
      name: 'publishers',
      component: PublishersView
    },
    {
      path: '/merch',
      name: 'merch',
      component: MerchView
    },
    {
      path: '/audiotech',
      name: 'audiotech',
      component: AudiotechView
    },
    {
      path: '/brands',
      name: 'brands',
      component: BrandsView
    },*/
  ]
})

export default router
