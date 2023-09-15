
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { path: 'all', component: () => import('pages/AllPostPage.vue') },
      { path: 'new', component: () => import('pages/NewPostPage.vue') },
      { path: 'preview', component: () => import('pages/PreviewPostPage.vue') },
      { path: 'edit/:id', component: () => import('pages/EditPostPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
