export default [{
  path: '/config',
  redirect: 'users-list'
}, 
{
  path: '/config/users',
  name: 'users',
  component: () => import('@/pages/Users/users.vue')
}, 
{
  path: '/config/users/register/:userId?',
  name: 'register-user',
  props: true,
  component: () => import('@/pages/Users/editUserPage.vue')
},
{
  path: '/config/users/endpoint/:userId?',
  name: 'endpoint-user',
  props: true,
  component: () => import('@/pages/Users/components/EndPointComponent.vue')
}, 
{
  path: '/config/user',
  name: 'user',
  component: () => import('@/pages/Users/myUser.vue')
}]
