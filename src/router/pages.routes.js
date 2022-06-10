export default [{
  path: '/auth/signin',
  name: 'auth-signin',
  component: () => import(/* webpackChunkName: "auth-signin" */ '@/pages/auth/SigninPage.vue'),
  meta: {
    layout: 'auth'
  }
},
{
  path: '/error/not-found',
  name: 'error-not-found',
  component: () => import(/* webpackChunkName: "error-not-found" */ '@/pages/error/NotFoundPage.vue'),
  meta: {
    layout: 'error'
  }
},
{
  path: '/tools/filescloud',
  name: 'files-cloud',
  component: () => import('@/pages/Files/files.vue')
},
{
  path: '/tools/filescloud/:file',
  name: 'show file',
  component: () => import('@/components/common/ShowFile.vue')
},
{
  path: '/tools/shorturl',
  name: 'short-url',
  component: () => import('@/pages/Urls/url.vue')
},
{
  path: '/tools/agendas',
  name: 'agendas',
  component: () => import('@/pages/Agendas/agenda.vue')
},
{
  path: '/tools/agendas/:agendaId/contacts',
  name: 'contacts',
  component: () => import('@/pages/Agendas/contacts.vue'),
  props: true
},
{
  path: '/channels/vendors',
  name: 'channels-vendors',
  component: () => import('@/pages/Channels/channels.vue')
}]
