export default [{
  path: '/auth/signin',
  name: 'auth-signin',
  component: () => import(/* webpackChunkName: "auth-signin" */ '@/pages/auth/SigninPage.vue'),
  meta: {
    layout: 'auth'
  }
}, {
  path: '/auth/signup',
  name: 'auth-signup',
  component: () => import(/* webpackChunkName: "auth-signup" */ '@/pages/auth/SignupPage.vue'),
  meta: {
    layout: 'auth'
  }
}, {
  path: '/auth/forgot-password',
  name: 'auth-forgot',
  component: () => import(/* webpackChunkName: "auth-forgot" */ '@/pages/auth/ForgotPage.vue'),
  meta: {
    layout: 'auth'
  }
}, {
  path: '/auth/reset-password',
  name: 'auth-reset',
  component: () => import(/* webpackChunkName: "auth-reset" */ '@/pages/auth/ResetPage.vue'),
  meta: {
    layout: 'auth'
  }
}, {
  path: '/error/not-found',
  name: 'error-not-found',
  component: () => import(/* webpackChunkName: "error-not-found" */ '@/pages/error/NotFoundPage.vue'),
  meta: {
    layout: 'error'
  }
}, {
  path: '/error/unexpected',
  name: 'error-unexpected',
  component: () => import(/* webpackChunkName: "error-unexpected" */ '@/pages/error/UnexpectedPage.vue'),
  meta: {
    layout: 'error'
  }
}, {
  path: '/utility/maintenance',
  name: 'utility-maintenance',
  component: () => import(/* webpackChunkName: "utility-maintenance" */ '@/pages/utility/MaintenancePage.vue'),
  meta: {
    layout: 'auth'
  }
}, {
  path: '/utility/coming-soon',
  name: 'utility-soon',
  component: () => import(/* webpackChunkName: "utility-soon" */ '@/pages/utility/SoonPage.vue'),
  meta: {
    layout: 'auth'
  }
}, {
  path: '/tools/filescloud',
  name: 'files-cloud',
  component: () => import( '@/pages/files/filesCloud.vue')
}, {
  path: '/tools/shorturl',
  name: 'short-url',
  component: () => import( '@/pages/url/index.vue')
}, 
{
  path: '/tools/agendas',
  name: 'agendas',
  component: () => import( '@/pages/agendas/agenda.vue')
}, 
{
  path: '/tools/agendas/:agendaId/contacts',
  name: 'contacts',
  component: () => import( '@/pages/agendas/contacts.vue'),
  props: true
}, 
{
  path: '/channels/vendors',
  name: 'channels-vendors',
  component: () => import( '@/pages/channels/vendors.vue')
}]
