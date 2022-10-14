<template>
  <div>
  
    <v-card >
      <v-card-title>Métrica</v-card-title>
      <v-card-text>
          
        <div v-if="showChart">
          <apexchart type="radialBar" height="250" :options="chartOptions" :series="series"></apexchart>
        </div>
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
  
  },
  data() {
    return {
      allSmsOfCampaing: [],
      // variables para metrica
      showChart: false,
      series: [],
      chartOptions: {
        chart: {
          height: 250,
          type: 'radialBar'
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: '27px'
              },
              value: {
                fontSize: '16px'
              },
              total: {
                show: true,
                label: 'Destinatarios',
                formatter: function (w) {
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  return 250
                }
              }
            }
          }
        },
        labels: ['Procesando', 'Entregados', 'Aperturados']
      }
    }
  },
  computed: {
   
  },
  created() {
    this.getAllSmsByCampaing()
  },
  mounted() {
    this.showChart = true
  },
  methods: {
    async getAllSmsByCampaing() {
      const payload = {
        campaign_id : this.$route.params.campaign_id,
        service_id : 1,
        searchtext : ''
      }
  
      await BackendApi.post('/dashBoardProgress', payload)
        .then(({ data }) => {
          if (data.success) {
  
            this.series.push(data.data.processing)
            this.series.push(data.data.delivered)
            if (data.data.opened) {
              this.series.push(data.data.opened)
            }
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