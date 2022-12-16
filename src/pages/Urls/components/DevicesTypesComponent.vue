<template>
  <div>
    <v-card >
      <v-card-title>Dispositivos conectados</v-card-title>
      <v-card-text>
        <div>
          <apexchart type="bar" width="350" :options="chartOptions" :series="series"></apexchart>
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
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['divices']
        },
        yaxis: {
          title: {
            text: '$ (thousands)'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val
            }
          }
        }
      }
    }
  },
  created() {
    this.getDivices()
  },
  methods: {
    async getDivices() {
      const payload = {
        url_id: this.$route.params.id
      }

      await BackendApi.post('/divicesType', payload).then(({ data }) => {
        if (data.success) {
          this.series = data.data
        }
      })
    }
  }
}
</script>