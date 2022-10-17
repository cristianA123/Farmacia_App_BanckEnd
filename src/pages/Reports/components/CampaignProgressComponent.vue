<template>
  <div>
    <v-card >
      <v-card-title>Progreso</v-card-title>
      <v-card-text>
        <div v-if="showChart">
          <apexchart
            :key="dd"
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
    this.getAllSmsByCampaing()
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
            data.data.forEach( (sms) => {
              this.data.push(sms.sms_by_minute)
            })
            this.series.push({ data : this.data })
          }
          
        })
    },
    progress () {
  
    }
  }
}
</script>
