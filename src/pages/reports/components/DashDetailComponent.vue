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
      seriesDeliverability: [90, 10],
      chartOptionsDeliverability: {
        colors: ['#00b0ff', '#9e9e9e'],
        labels: ['DELIVERED', 'REJECTED'],
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
      return this.campaing?.updated_at || ''
    }
  },
  mounted() {
    // para entregabilidad
    this.showChartDeliverability = true
    // // para Progreso ******
    this.showChartProgress = true

    this.getAllSmsByCampaing()
  },
  methods: {
    async getAllSmsByCampaing() {
      const payload = {
        campaign_id : this.$route.params.campaign_id,
        service_id : 1,
        searchtext : ''
      }

      await BackendApi.post('/smsCampaignDetailAll', payload)
        .then((response) => {
          if (response.data.success) {
            this.allSmsOfCampaing = response.data.data
            let cont_sms_enviados = 0
            let cont_sms_fallados = 0

            this.allSmsOfCampaing.map( (sms) => {

              if (sms.status === 'DELIVERED') {
                cont_sms_enviados++
              }
              if (sms.status === 'REJECTED') {
                cont_sms_fallados++
              }
              
              return ''
            })
            this.seriesProgress.push(cont_sms_enviados)
            this.seriesProgress.push(this.allSmsOfCampaing.length - cont_sms_enviados)

            this.seriesDeliverability.push(cont_sms_enviados)
            this.seriesDeliverability.push(cont_sms_fallados)

          }

          return ''

        })
    },
    progress () {

    }
  }
}
</script>

<style>

</style>