<template>
  <div>
    <v-card >
      <v-card-title>Progreso</v-card-title>
      <v-card-text>
        <div v-if="showChart">
          <apexchart
            type="area"
            height="230"
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
    // console.log(this.$route.params)
  },
  created() {
    this.getOpenClicks()
  },
  methods: {
    async getOpenClicks() {
      const payload = {
        url_id: this.$route.params.id
      }

      await BackendApi.post('/clicksOverTime', payload).then(({ data }) => {
        if (data.success) {
          data.data.forEach( (clic) => {
            this.data.push(clic.times_open)
          })
          this.series.push({ data : this.data })
        }
      })
    }
  }
  
}
</script>

<style>

</style>