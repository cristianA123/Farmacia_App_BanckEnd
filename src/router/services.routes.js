export default [
  //SERVICES
  {
    path: '/services',
    name: 'services',
    component: () => import('@/pages/services')
  },
  //SMS
  {
    path: '/sms/create_campaing',
    name: 'create-campaing-sms',
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
  },
  {
    path: '/sms/report',
    name: 'sms-report',
    component: () => import('@/pages/sms/SmsReport.vue')
  },
  //IVR
  {
    path: '/ivr/create_campaing',
    name: 'create-campaing-ivr',
    component: () => import('@/pages/ivr/CreateCampaing.vue')
  },
  {
    path: '/ivr/create_campaing/ivr_individual',
    name: 'ivr-individual',
    component: () => import('@/pages/ivr/IvrIndividual.vue')
  },
  {
    path: '/ivr/create_campaing/ivr_agendas',
    name: 'ivr-agendas',
    component: () => import('@/pages/ivr/IvrAgendas.vue')
  },
  {
    path: '/ivr/create_campaing/ivr_excel',
    name: 'ivr-excel',
    component: () => import('@/pages/ivr/IvrExcel.vue')
  },
  {
    path: '/ivr/report',
    name: 'ivr-report',
    component: () => import('@/pages/ivr/IvrReport.vue')
  }
]
