export default [{
  path: '/config',
  redirect: 'users-list'
}, 
{
  path: '/config/users',
  name: 'users',
  component: () => import('@/pages/users/users.vue')
}, 
{
  path: '/config/users/register/:userId?',
  name: 'register-user',
  props: true,
  component: () => import('@/pages/users/EditUserPage.vue')
}, 
{
  path: '/config/user',
  name: 'user',
  component: () => import('@/pages/users/myUser.vue')
}]
