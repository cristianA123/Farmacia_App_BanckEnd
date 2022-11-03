<template>
  <div>
    <v-card >
      <v-card-title>Progreso</v-card-title>
      <v-card-text>
        <div v-if="showChart">
          <apexchart
            type="area"
            height="228"
            :options="chartOptionsSpark3"
            :series="series"
          ></apexchart>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import BackendApi from '@/services/backend.service'

export default {
  data() {
    return {
   
      series: [],
      data: [],
      showChart: false,
      chartOptionsSpark3: {
        chart: {
          type: 'area',
          height: 0,
          sparkline: {
            enabled: true
          }
        },
        stroke: {
          curve: 'smooth'
        },
        fill: {
          opacity: 0.3
        },
        xaxis: {
          crosshairs: {
            width: 0
          }
        },
        yaxis: {
          min: 0
        },
        title: {
          text: '',
          offsetX: 0,
          style: {
            fontSize: '24px'
          }
        },
        subtitle: {
          text: '',
          offsetX: 0,
          style: {
            fontSize: '14px'
          }
        }
      }
    }
  },
  mounted() {
    this.showChart = true
  },
  created() {
    this.progress()
  },

  methods: {
    async progress () {
      const payload = {
        campaign_id : this.$route.params.campaign_id,
        service_id : 1,
        searchtext : ''
      }
  
      await BackendApi.post('/dashBoardProgress', payload)
        .then(({ data }) => {
          console.log(data.data)
          if (data.success) {

            data.data.forEach( (sms) => {

              const payload2 = {
                x : sms.created,
                y : sms.sms_by_minute
              }
              
              this.data.push(payload2)
            })

            this.series.push({ name: 'sms', data : this.data })
            console.log(this.series)
          }
          
        })
    }
  }
}
</script>
