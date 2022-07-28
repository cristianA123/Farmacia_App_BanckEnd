<template>
  <div>
    <v-row>
      <!-- Campaña -->
      <v-col
        cols="12"
        xs="12"
        sm="6"
        lg="4"
      >
        <v-card 
          color="light-blue darken-4"
          dark
        >
          <v-card-title>Campaña:</v-card-title>
          <v-card-text>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Nombre:</v-list-item-title>
                <v-list-item-subtitle>Campaña de prueba</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Fecha:</v-list-item-title>
                <v-list-item-subtitle>Campaña de prueba</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- Progreso -->
      <v-col
        cols="12"
        xs="12"
        sm="6"
        lg="4"
      >
        <v-card >
          <v-card-title>Progreso</v-card-title>
          <v-card-text>
            <div v-if="showChartProgress">
              <apexchart
                type="donut"
                width="300"
                :options="chartOptionsProgress"
                :series="seriesProgress"
              ></apexchart>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <!-- Entregabilidad -->
      <v-col
        cols="12"
        xs="12"
        sm="6"
        lg="4"
      >
        <v-card >
          <v-card-title>Entregabilidad</v-card-title>
          <v-card-text>
            <div v-if="showChartProgress">
              <apexchart
                type="donut"
                width="300"
                :options="chartOptionsProgress"
                :series="seriesProgress"
              ></apexchart>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>

</template>

<script>

export default {
  data() {
    return {
      // variables para entregabilidad
      showChart: true,
      series: [90, 10],
      chartOptions: {
        colors: ['#4caf50', '#e57373'],
        labels: ['DELIVERED', 'REJECTED'],
        chart: {
          type: 'pie'
        },
        responsive: [{
          breakpoint: 337,
          options: {
            chart: {
              width: 100
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
        colors: ['#00b0ff', '#9e9e9e'],
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