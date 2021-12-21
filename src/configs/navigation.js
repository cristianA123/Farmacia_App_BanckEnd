import menuUI from './menus/ui.menu'
import menuApps from './menus/apps.menu'
import menuPages from './menus/pages.menu'

export default {
  // main navigation - side menu
  menu: [{
    text: '',
    key: '',
    items: [
      { icon: 'mdi-view-dashboard-outline', key: 'menu.dashboard', text: 'Dashboard', link: '/dashboard/analytics' }
    ]
  }, 
  {
    text: 'Servicios',
    items: [
      { icon: 'mdi-android-messages', text: 'SMS', link: '/sms/campaing' },
      { icon: 'mdi-chart-line', text: 'SMS', link: '/sms/report' }
    ]
  },
  {
    text: 'Herramientas',
    key: '',
    items: [
      { icon: 'mdi-file-image', key: 'Archivos cloud', text: 'Usuarios', link: '/tools/filescloud' },
      { icon: 'mdi-link-plus', key: 'Acortador URL', text: 'Usuarios', link: '/tools/shorturl' },
      { icon: 'mdi-contacts', key: 'Agenda de contactos', text: 'Usuarios', link: '/tools/agendas' }
    ]
  },
  {
    text: 'Configuración',
    key: '',
    items: [
      { icon: 'mdi-account', key: 'Mi cuenta', text: 'Usuarios', link: '/config/user' },
      { icon: 'mdi-account-group', key: 'Sub cuentas', text: 'Usuarios', link: '/config/users' }
    ]
  },
  {
    text: 'Canales',
    key: '',
    items: [
      { icon: 'mdi-call-split', key: 'Proveedores', text: 'Usuarios', link: '/channels/vendors' }
    ]
  }]
}
