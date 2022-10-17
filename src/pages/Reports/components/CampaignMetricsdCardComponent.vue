<template>
  <div>
  
    <v-card >
      <v-card-title>Métrica</v-card-title>
      <v-card-text>
          
        <div v-if="showChart">
          <apexchart
            :key="total"
            type="radialBar"
            height="250"
            :options="chartOptions"
            :series="series"
          ></apexchart>
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
      dd: 1,
      total:10,
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
                formatter: () => {
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  console.log('tttttttttttttttt')
                  console.log(this.total)
                  console.log('tttttttttttttttt')
                  let pro = 0

                  pro = 2

                  return this.total
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
            if (data.data.opened >= 0) {
              this.series.push(data.data.opened)
            }

            this.total = data.data.total
           
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