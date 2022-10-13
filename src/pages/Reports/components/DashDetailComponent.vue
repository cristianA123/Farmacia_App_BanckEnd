<template>
  <div>
    <v-row>
      <!-- Campaña -->
      <v-col
        cols="12"
        xs="12"
        sm="6"
        lg="4"
      >
        <v-card 
          color="light-blue darken-4"
          dark
        >
          <v-card-title>Campaña:</v-card-title>
          <v-card-text>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Nombre:</v-list-item-title>
                <v-list-item-subtitle>{{ getName }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Fecha:</v-list-item-title>
                <v-list-item-subtitle>{{ getDate }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- Progreso -->
      <v-col
        cols="12"
        xs="12"
        sm="6"
        lg="4"
      >
        <v-card >
          <v-card-title>Progreso</v-card-title>
          <v-card-text>
            <div v-if="showChartProgress">
              <apexchart
                type="donut"
                width="300"
                :options="chartOptionsProgress"
                :series="seriesProgress"
              ></apexchart>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- Entregabilidad -->
      <v-col
        cols="12"
        xs="12"
        sm="6"
        lg="4"
      >
        <v-card >
          <v-card-title>Entregabilidad</v-card-title>
          <v-card-text>
            <div v-if="showChartDeliverability">
              <apexchart
                type="donut"
                width="300"
                :options="chartOptionsDeliverability"
                :series="seriesDeliverability"
              ></apexchart>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>

</template>

<script>

import BackendApi from '@/services/backend.service'
import moment from 'moment'
moment.locale('es')
export default {
  props: {
    campaing: {
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
    getName() {
      return this.campaing?.name || ''
    },
    getDate() {
      
      return moment(this.campaing?.updated_at).format('Y-M-D H:M:S') || ''
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