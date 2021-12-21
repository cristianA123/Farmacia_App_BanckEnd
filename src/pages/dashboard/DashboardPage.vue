<template>
  <div class="d-flex flex-grow-1 flex-column">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Dashboard</div>
      </div>
      <v-spacer></v-spacer>
    </div>

    <v-row class="flex-grow-0" dense>

      <v-col cols="12">
        <sales-card
          class="h-full"
          style="min-height: 380px"
          :loading="isLoading1"
          :credits="DashCredits"
        ></sales-card>
      </v-col>

      <Creditos-Iniciales-Card
        :value="creditosIniciales"
      />

      <Donut-Dash-Card
        title='Apertura'
        :labels="['Abiertos','No abiertos']"
        :value="apertura"
      />

      <Donut-Dash-Card
        title='Entregabilidad'
        :labels="['Enviados','Rechazados']"
        :value="entregabilidad"
      />

    </v-row>
  </div>
</template>

<script>
import SalesCard from '../../components/dashboard/SalesCard'
import CreditosInicialesCard from '@/components/dashboard/CreditosInicialesCard'
import DonutDashCard from '@/components/dashboard/DonutDashCard'

export default {
  components: {
    SalesCard,
    CreditosInicialesCard,
    DonutDashCard
  },
  data() {
    return {
      creditosIniciales: 1123212,
      entregabilidad: 99.23,
      apertura: 13.21,
      DashCredits: [
        {
          service: 'SMS',
          credits: 10221
        },
        {
          service: 'IVR',
          credits: 2048
        },
        { service: 'WHATSAPP',
          credits: 140
        }
      ],
      isLoading1: true,
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
      }
    }
  },
  computed: {
    theme() {
      return this.$vuetify.theme.isDark
        ? this.$vuetify.theme.defaults.dark
        : this.$vuetify.theme.defaults.light
    }
  },
  mounted() {
    let count = 0

    // DEMO delay for loading graphics
    this.loadingInterval = setInterval(() => {
      this[`isLoading${count++}`] = false
      if (count === 4) this.clear()
    }, 300)
  },
  beforeDestroy() {
    this.clear()
  },
  methods: {
    clear() {
      clearInterval(this.loadingInterval)
    }
  }
}
</script>
