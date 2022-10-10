<template>
  <div>
    <v-row>
      <!-- apertura --> 
      <v-col
        cols="12"
        xs="12"
        sm="6"
        lg="6"
      >
        <div>
          <v-card >
            <v-card-title >Apertura Link</v-card-title>
            <v-card-text>
              <div v-if="showChart">
                <apexchart
                  type="donut"
                  width="400"
                  :options="chartOptions"
                  :series="series_apertura_link"
                ></apexchart>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>

      <!-- click y comportamiento -->
      <v-col
        cols="12"
        xs="12"
        sm="6"
        lg="6"
      >
        <div v-if="false">
          <v-card >
            <v-card-title >Comportamiento</v-card-title>
            <v-card-text>
              <TrackCard
                label="assasasa"
                class="h-full"
                color="#8c9eff"
                :value="432"
                :percentage="4.333"
                percentage-label="10000"
                :loading="false"
                :series="ordersSeries"
              ></TrackCard>
            </v-card-text>
          </v-card>
        </div>

      </v-col>
    </v-row>
  </div>
</template>

<script>
import TrackCard from './TrackCard.vue'
import BackendApi from '@/services/backend.service'

export default {
  components:{
    TrackCard
  },
  data() {
    return {
      // variables para apertura
      showChart: false,
      series_apertura_link: [],
      chartOptions: {
        colors: ['#FF6B6B', '#6BCB77'],
        labels: ['NO ABIERTO', 'ABIERTO'],
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
              position: 'right'
            }
          }
        }]
      },
      // variables para click y comportamiento
      lastweek:[1,2,3,4],
      ordersSeries: [{
        name: 'Orders',
        data: [
          ['2020-02-02', 4],
          ['2020-02-03', 5],
          ['2020-02-04', 6],
          ['2020-02-05', 4]
        ]
      }]
    }
  },
  mounted() {
    // para entregabilidad
    this.showChart = true
    // // para click y comportamiento ******
    this.showChart2 = false
  
  },
  created() {
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
          let cont = 0

          if (response.data.success) {

            response.data.data.forEach((sms) => {
              
              if (sms.times_open > 0) {
                cont++
              }

            })
            this.series_apertura_link.push(response.data.data.length - cont)
            this.series_apertura_link.push(cont)
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