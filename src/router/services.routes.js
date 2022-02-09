export default [
  {
    path: '/sms/create_campaing',
    name: 'create-campaing',
    component: () => import('@/pages/sms/CreateCampaing.vue')
  },
  {
    path: '/sms/create_campaing/sms_individual',
    name: 'sms-individual',
    component: () => import('@/pages/sms/SmsIndividual.vue')
  },
  {
    path: '/sms/create_campaing/sms_agendas',
    name: 'sms-agendas',
    component: () => import('@/pages/sms/SmsAgendas.vue')
  },
  {
    path: '/sms/create_campaing/sms_excel',
    name: 'sms-excel',
    component: () => import('@/pages/sms/SmsExcel.vue')
  }
  /*, 
  {
    path: '/sms/report',
    name: 'sms-report',
    component: () => import('@/pages/sms/Report.vue')
  },
  {
    path: '/sms/report/detail/:id',
    name: 'sms-report-detail',
    component: () => import('@/pages/sms/Detail.vue')
  }*/
]
