import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: () => import('./views/Welcome.vue'),
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('./views/List/List.vue'),
    },
    {
      path: '/new',
      name: 'new',
      component: () => import('./views/New/New.vue'),
    },
    {
      path: '/new-place',
      name: 'new-place',
      component: () => import('./views/NewPlace/NewPlace.vue'),
    },
    {
      path: '/new-garment-type',
      name: 'new-garment-type',
      component: () => import('./views/NewGarmentType/NewGarmentType.vue'),
    },
    {
      path: '/garment/:garmentId/edit',
      name: 'edit',
      component: () => import('./views/Edit/Edit.vue'),
      props: true,
    },
    {
      path: '/garment/:garmentId',
      name: 'garment',
      component: () => import('./views/GarmentDetail/GarmentDetail.vue'),
      props: true,
    },
    {
      path: '/washing',
      name: 'washing',
      component: () => import('./views/Washing/Washing.vue'),
    },
  ],
})

export default router
