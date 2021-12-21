export default [
  {
    path: '/sms/campaing',
    name: 'sms-campaing',
    component: () => import('@/pages/sms/Campaing.vue')
  }, 
  {
    path: '/sms/report',
    name: 'sms-report',
    component: () => import('@/pages/sms/Report.vue')
  },
  {
    path: '/sms/report/detail/:id',
    name: 'sms-report-detail',
    component: () => import('@/pages/sms/Detail.vue')
  }
]
