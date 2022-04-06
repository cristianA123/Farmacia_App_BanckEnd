export default [
  //SERVICES
  {
    path: '/services',
    name: 'services',
    component: () => import('@/pages/Services/services.vue')
  },
  //SMS
  {
    path: '/sms/create_campaing',
    name: 'create-campaing-sms',
    component: () => import('@/pages/Services/sms/CreateCampaing.vue')
  },
  {
    path: '/sms/create_campaing/sms_individual',
    name: 'sms-individual',
    component: () => import('@/pages/Services/sms/SmsIndividual.vue')
  },
  {
    path: '/sms/create_campaing/sms_agendas',
    name: 'sms-agendas',
    component: () => import('@/pages/Services/sms/SmsAgendas.vue')
  },
  {
    path: '/sms/create_campaing/sms_excel',
    name: 'sms-excel',
    component: () => import('@/pages/Services/sms/SmsExcel.vue')
  },
  //REPORTS
  {
    path: '/reports',
    name: 'reports',
    component: () => import('@/pages/reports/Reports.vue')
  },
  {
    path: '/reports/sms/detail/:campaign_id',
    name: 'reports-sms',
    component: () => import('@/pages/reports/DetailSmsReport.vue')
  },
  //IVR
  {
    path: '/ivr/create_campaing',
    name: 'create-campaing-ivr',
    component: () => import('@/pages/Services/ivr/CreateCampaing.vue')
  },
  {
    path: '/ivr/create_campaing/ivr_individual',
    name: 'ivr-individual',
    component: () => import('@/pages/Services/ivr/IvrIndividual.vue')
  },
  {
    path: '/ivr/create_campaing/ivr_agendas',
    name: 'ivr-agendas',
    component: () => import('@/pages/Services/ivr/IvrAgendas.vue')
  },
  {
    path: '/ivr/create_campaing/ivr_excel',
    name: 'ivr-excel',
    component: () => import('@/pages/Services/ivr/IvrExcel.vue')
  }
]
