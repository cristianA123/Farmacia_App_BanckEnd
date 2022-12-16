<template>
  <div class="padin">
    <v-card >
      <v-card-title>Georeferenciación de clics</v-card-title>
      <v-card-text>
        <div v-if="showChart">
          <apexchart
            type="donut"
            width="350"
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

export default {
  data() {
    return {
      showChart: false,
      series: [],
      chartOptions: {
        chart: {
          type: 'donut'
        },
        responsive: [{
          breakpoint: 400,
          options: {
            chart: {
              width: 400
            },
            legend: {
              position: 'bottom'
            }
          }
        }],
        labels: []
      }
    }
  },
  mounted() {
    this.showChart = true
  },
  created () {
    this.getGeorefereClicks()
  },
  methods: {
    async getGeorefereClicks() {
      const payload = {
        url_id: this.$route.params.id
      }

      await BackendApi.post('/clicksGeoreferencing', payload).then(({ data }) => {
        if (data.success) {
          data.data.forEach( (clic) => {
            this.series.push(clic.total)
            this.chartOptions.labels.push(clic.location)
          })
        }
      })
    }
  }
}
</script>