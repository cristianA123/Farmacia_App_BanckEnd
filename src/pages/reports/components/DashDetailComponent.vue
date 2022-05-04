<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        lg="6"
      >
        <!-- entregabilidad -->
        <div>
          <v-card >
            <v-card-title>Entregabilidad</v-card-title>
            <v-card-text>
              <div v-if="showChart">
                <apexchart
                  type="donut"
                  width="400"
                  :options="chartOptions"
                  :series="series"
                ></apexchart>
              </div>
            </v-card-text>
          </v-card>
        </div>
      
      </v-col>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        lg="6"
      >
      
        <!-- Progreso -->
        <div>
          <v-card >
            <v-card-title>Progreso</v-card-title>
            <v-card-text>
              <div v-if="showChartProgress">
                <apexchart
                  type="donut"
                  width="400"
                  :options="chartOptionsProgress"
                  :series="seriesProgress"
                ></apexchart>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </div>

</template>

<script>

export default {
  data() {
    return {
      // variables para entregabilidad
      showChart: false,
      series: [40, 60],
      chartOptions: {
        colors: ['#6BCB77', '#FF6B6B'],
        labels: ['DELIVERED', 'REJECTED'],
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
      // variables para Progreso
      showChartProgress: false,
      seriesProgress: [40, 60],
      chartOptionsProgress: {
        colors: ['#6BCB77', '#FFF56D'],
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
      }
    }
  },
  mounted() {
    // para entregabilidad
    this.showChart = true
    // // para Progreso ******
    this.showChartProgress = true
    
  }
}
</script>

<style>

</style>