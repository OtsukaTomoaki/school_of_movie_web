import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/SignInView.vue')
  },
  {
    path: '/signup_google',
    name: 'signup_google',
    component: () => import('../views/SignUpWithOauthProvider.vue')
  },
  {
    path: '/signin_with_token',
    name: 'signin_with_token',
    component: () => import('../views/SignInWithToken.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue')
  },
  {
    path: '/movies',
    name: 'movies',
    component: () => import('../views/movies/MovieView.vue')
  },
  {
    path: '/talk_rooms',
    name: 'talk_rooms',
    component: () => import('../views/TalkRooms.vue')
  },
  {
    path: '/talk_rooms/message',
    name: 'talk_rooms/message',
    component: () => import('../views/talk_rooms/MessageView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
