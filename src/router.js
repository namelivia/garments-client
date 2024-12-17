import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  base: import.meta.env.BASE_URL,
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
      path: '/random',
      name: 'random',
      component: () => import('./views/Random/Random.vue'),
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
      path: '/new-activity',
      name: 'new-activity',
      component: () => import('./views/NewActivity/NewActivity.vue'),
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
    {
      path: '/thrown_away',
      name: 'thrown_away',
      component: () => import('./views/ThrownAway/ThrownAway.vue'),
    },
    {
      path: '/today',
      name: 'today',
      component: () => import('./views/Today/Today.vue'),
    },
    {
      path: '/rules',
      name: 'rules',
      component: () => import('./views/Rules/Rules.vue'),
    },
    {
      path: '/new-rule',
      name: 'new-rule',
      component: () => import('./views/NewRule/NewRule.vue'),
    },
    {
      path: '/weather',
      name: 'weather',
      component: () => import('./views/Weather/Weather.vue'),
    },
  ],
})

export default router
