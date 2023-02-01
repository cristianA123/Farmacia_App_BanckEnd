export default [
  //SERVICES
  {
    path: '/services',
    name: 'services',
    component: () => import('@/pages/Services/services.vue')
  },
  //SMS
  {
    path: '/services/sms/create_campaing',
    name: 'create-campaing-sms',
    component: () => import('@/pages/Services/sms/CreateCampaing.vue')
  },
  {
    path: '/services/sms/create_campaing/sms_individual',
    name: 'sms-individual',
    component: () => import('@/pages/Services/sms/SmsIndividual.vue')
  },
  {
    path: '/services/sms/create_campaing/sms_agendas',
    name: 'sms-agendas',
    component: () => import('@/pages/Services/sms/SmsAgenda/SmsAgendaStepOne.vue')
  },
  {
    path: '/services/sms/create_campaing/sms_agenda_step_two',
    name: 'sms-agenda-step-two',
    component: () => import('@/pages/Services/sms/SmsAgenda/SmsAgendaStepTwo.vue')
  },
  // {
  //   path: '/services/sms/create_campaing/sms_agendas',
  //   name: 'sms-agendas',
  //   component: () => import('@/pages/Services/sms/SmsAgendas.vue')
  // },
  {
    path: '/services/sms/create_campaing/sms_excel',
    name: 'sms-excel',
    component: () => import('@/pages/Services/sms/SmsExcel/SmsExcelStepOne.vue')
  },
  {
    path: '/services/sms/create_campaing/sms_excel_step_two',
    name: 'sms-excel-step-two',
    component: () => import('@/pages/Services/sms/SmsExcel/SmsExcelStepTwo.vue')
  },
  {
    path: '/services/sms/create_campaing/sms_scheduled',
    name: 'sms-calendarizado',
    component: () => import('@/pages/Services/sms/SmsScheduled/SmsScheduledStepOne.vue')
  },
  {
    path: '/services/sms/create_campaing/sms_scheduled_two',
    name: 'sms-excel-schedule-two',
    component: () => import('@/pages/Services/sms/SmsScheduled/SmsScheduledStepTwo.vue')
  },
  //REPORTS
  {
    path: '/reports',
    name: 'reports',
    component: () => import('@/pages/Reports/Reports.vue')
    // component: () => import('@/pages/Reports/components/Paginate.vue')

  },
  {
    path: '/reports/sms/detail/:campaign_id',
    name: 'reports-sms',
    component: () => import('@/pages/Reports/DetailSmsReport.vue')
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
