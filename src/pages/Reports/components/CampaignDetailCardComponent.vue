<template>
  <div>
   
    <v-card 
      color="light-blue darken-4"
      dark
    >
      <v-card-title>Campaña:</v-card-title>
      <v-card-text>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>USUARIO:</v-list-item-title>
            <v-list-item-subtitle>{{ getNameUser }} {{ getNameCompany }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>NOMBRE DE CAMPAÑA:</v-list-item-title>
            <v-list-item-subtitle>{{ getNameCampaign }}</v-list-item-subtitle>
            <v-list-item-title>TIPO:</v-list-item-title>
            <v-list-item-subtitle>{{ getTypeCampaign }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>FECHA Y HORA:</v-list-item-title>
            <v-list-item-subtitle>{{ getDate }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card-text>
    </v-card>
     
  </div>
    
</template>
    
<script>
    
import BackendApi from '@/services/backend.service'
import moment from 'moment'
moment.locale('es')
export default {
  props: {
    dataCampaign: {
      type: Object,
      default: () => ({
        name: '',
        updated_at: ''
      })
    }
  },
  data() {
    return {
      allSmsOfCampaing: [],
      // variables para Progreso
      showChartProgress: false,
      seriesProgress: [],
      chartOptionsProgress: {
        colors: ['#00b0ff', '#9e9e9e'],
        labels: ['ENVIADOS', 'PROCESANDO'],
        chart: {
          type: 'donut'
        },
        responsive: [{
          breakpoint: 337,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
    
      // variables para entregabilidad
      showChartDeliverability: true,
      seriesDeliverability: [],
      chartOptionsDeliverability: {
        colors: ['#59CE8F', '#FF1E00'],
        labels: [' Enviados', 'Rechazados'],
        chart: {
          type: 'pie'
        },
        responsive: [{
          breakpoint: 337,
          options: {
            chart: {
              width: 100
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
    }
  },
  computed: {
    getNameUser() {
      return this.dataCampaign?.user?.name || ''
    },
    getNameCompany() {
      return this.dataCampaign?.company?.company ? '(' + this.dataCampaign?.company?.company + ')' : ''
    },
    getNameCampaign() {
      return this.dataCampaign?.campaing?.name || ''
    },
    getTypeCampaign() {
      return this.dataCampaign?.type_company?.name || ''
    },
    getDate() {
          
      return moment(this.dataCampaign?.campaing?.updated_at).format('DD-MM-YYYY H:mm:ss') || ''
    }
  },
  created() {
    this.getAllSmsByCampaing()
  },
  mounted() {
    // para entregabilidad
    this.showChartDeliverability = true
    // // para Progreso ******
    this.showChartProgress = true
  },
  methods: {
    async getAllSmsByCampaing() {
      const payload = {
        campaign_id : this.$route.params.campaign_id,
        service_id : 1,
        searchtext : ''
      }
    
      await BackendApi.post('/dashBoardProgress', payload)
        .then((response) => {
          if (response.data.success) {
    
            this.seriesProgress.push(response.data.data.progress_sms)
            this.seriesProgress.push(response.data.data.progress_resto)
    
            this.seriesDeliverability.push(response.data.data.count_status_delivered)
            this.seriesDeliverability.push(response.data.data.count_status_rejected)
    
          }
        })
    },
    progress () {
    
    }
  }
}
</script>
    
    <style>
    
    </style>