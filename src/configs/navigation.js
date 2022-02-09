import menuUI from './menus/ui.menu'
import menuApps from './menus/apps.menu'
import menuPages from './menus/pages.menu'

export default {
  // main navigation - side menu
  menu: [{
    text: '',
    key: '',
    items: [
      { icon: 'mdi-view-dashboard-outline', text: 'Dashboard', link: '/dashboard/analytics' }
    ]
  }, 
  {
    text: 'Servicios',
    items: [
      { icon: 'mdi-android-messages', text: 'SMS', link: '/sms/create_campaing' },
      { icon: 'mdi-chart-line', text: 'SMS', link: '/sms/report' }
    ]
  },
  {
    text: 'Herramientas',
    key: '',
    items: [
      { icon: 'mdi-file-image', text: 'Archivos', link: '/tools/filescloud' },
      { icon: 'mdi-link-plus', text: 'Url', link: '/tools/shorturl' },
      { icon: 'mdi-contacts', text: 'Agendas', link: '/tools/agendas' }
    ]
  },
  {
    text: 'Configuración',
    key: '',
    items: [
      { icon: 'mdi-account',  text: 'Mi usuario', link: '/config/user' },
      { icon: 'mdi-account-group', text: 'Sub usuarios', link: '/config/users' }
    ]
  },
  {
    text: 'Canales',
    key: '',
    items: [
      { icon: 'mdi-call-split', text: 'Proveedores', link: '/channels/vendors' }
    ]
  }]
}
