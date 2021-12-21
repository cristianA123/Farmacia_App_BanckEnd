export default [{
  path: '/config',
  redirect: 'users-list'
}, {
  path: '/config/users',
  name: 'users-list',
  component: () => import('@/pages/users/UsersPage.vue')
}, {
  path: '/config/users/edit',
  name: 'register-user',
  component: () => import('@/pages/users/EditUserPage.vue')
}, {
  path: '/config/user',
  name: 'user',
  component: () => import('@/pages/users/myUser.vue')
}]
