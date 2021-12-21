<template>
  <v-card class="d-flex flex-column flex-grow-1">

    <!-- loading spinner -->
    <div v-if="loading" class="d-flex flex-grow-1 align-center justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <!-- information -->
    <div v-else class="d-flex flex-column flex-grow-1">
      <v-card-title>
        <div>{{ label }}</div>
      </v-card-title>

      <div class="chart-wrap">
        <apexchart
          type="donut"
          width="85%"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </div>
  </v-card>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

/*
|---------------------------------------------------------------------
| DEMO Dashboard Card Component
|---------------------------------------------------------------------
|
| Demo card component to be used to gather some ideas on how to build
| your own dashboard component
|
*/
export default {
  props: {
    series: {
      type: Array,
      default: () => ([])
    },
    label: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#333333'
    },
    percentage: {
      type: Number,
      default: 0
    },
    options: {
      type: Object,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedInterval: 'Last 7 days',
      intervals: [
        'Last 7 days',
        'Last 28 days',
        'Last month',
        'Last year'
      ]
    }
  },
  computed: {
    computedTotal: function () {
     
      return 0
    },
    chartOptions() {
      return {
        chart: {
          type: 'donut',
          animations: {
            speed: 400
          },
          background: 'transparent'
        },
        stroke: {
          show: true,
          colors: [this.$vuetify.theme.isDark ? '#333' : '#fff'],
          width: 1,
          dashArray: 0
        },
        plotOptions: {
          pie: {
            expandOnClick: false,
            donut: {
              size: '74%',
              labels: {
                show: true,
                total: {
                  show: true,
                  label: 'Total',
                  color: '#ffa500',
                  formatter: function (w) {
                    return w.globals.seriesTotals.reduce((a, b) => {
                      return a + b
                    }, 0)
                  }
                }
              }
            }
          }
        },
        theme: {
          mode: this.$vuetify.theme.isDark ? 'dark' : 'light'
        },
        labels: ['Enviados', 'Rechazados', 'Pendientes'],
        dataLabels: {
          enabled: false
        },
        colors: ['#4CAF50', '#F44336', '#D7CCC8'],
        fill: {
          colors: ['#4CAF50', '#F44336', '#D7CCC8']
        },
        legend: {
          offsetY: 40,
          fontSize: '13px',
          fontFamily: 'Quicksand',
          fontWeight: 700
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              offsetY: 0,
              position: 'bottom'
            }
          }
        }],
        ...this.options
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-wrap {
  max-width: 560px;
  max-height: 280px;
}
</style>
