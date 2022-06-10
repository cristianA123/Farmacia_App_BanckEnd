<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3 pb-0">
      <div>
        <div class="display-1">Selecciona el servicio a utilizar</div>
      </div>
      <v-spacer></v-spacer>
    </div>

    <v-col
      class="pt-0"
    >
      <v-row>
        <v-col
          v-for="(service ) in services"
          :key="service.id"
          class="pl-0"
          cols="12"
          sm="6"
          md="6"
          lg="3"
        >
          <CardComponent :title="service.name" :img="service.icon" :descripcion="descriptionOfServices[service.service_id - 1]" :types-campaing="typesCampaing[service.service_id - 1]"></CardComponent>
        </v-col>
      </v-row>
    </v-col>

  </div>
</template>

<script>
import BackendApi from '@/services/backend.service'
import CardComponent from './components/CardComponent.vue'

export default {
  components: {
    CardComponent
  },
  data() {
    return {
      breadcrumbs: [{
        text: 'Servicios',
        disabled: false,
        to: '/services'
      }],
      services: [],
      descriptionOfServices: ['160 Caracteres = ~1 crédito', '10 Segundos = ~1 crédito'],
      selectedService: null,
      typesCampaing: [
        [
          {
            name: 'Individual',
            icon: 'mdi-cellphone-text',
            description: 'Ingresa manualmente los destinatarios',
            path: 'sms-individual'
          },
          {
            name: 'Desde Excel',
            icon: 'mdi-file-excel-box-outline',
            description: 'Suba un archivo Excel',
            path: 'sms-excel'
          },
          {
            name: 'Desde Agendas',
            icon: 'mdi-contacts-outline',
            description: 'Utiliza una de tus agendas de contactos',
            path: 'sms-agendas'
          }
        ],
        [
          {
            name: 'Individual',
            icon: 'mdi-cellphone-text',
            description: 'Ingresa manualmente los destinatarios',
            path: 'ivr-individual'
          },  
          {
            name: 'Desde Excel',
            icon: 'mdi-file-excel-box-outline',
            description: 'Suba un archivo Excel',
            path: 'ivr-excel'
          },
          {
            name: 'Desde Agendas',
            icon: 'mdi-contacts-outline',
            description: 'Utiliza una de tus agendas de contactos',
            path: 'ivr-agendas'
          }
        ]
      ]
    }
  },
  mounted() {
    this.getServices()
  },
  methods: {
    getServices() {
      BackendApi.get('/userServices').then((response) => {
        if (response.data.success) {
          this.services =   response.data.data
        }
      })
    },    
    selectServie(service) {

      this.selectedService = service.id

      setTimeout(() => {
        this.$router.push({ name: service.path })
      }, 300)
    }
  }
}
</script>

<style>

.white-text {
  color: #FFF !important;
}

</style>
