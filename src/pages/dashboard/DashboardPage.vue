<template>
  <div class="d-flex flex-grow-1 flex-column">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Dashboard</div>
      </div>
      <v-spacer></v-spacer>
    </div>

    <v-row class="flex-grow-0" dense>

      <InitialCreditComponent 
        :credit="credits.credit"
        :isLoading="isLoading"
      /> 

      <AvailableCreditComponent
        :availableCredit="credits.availableCredit"
        :isLoading="isLoading"
      />

      <ServiceCreditComponent
        
        :sms_cost="credits.sms_cost"
        :isLoading="isLoading"
      />

    </v-row>
  </div>
</template>

<script>
import BackendApi from '@/services/backend.service'
import InitialCreditComponent from './components/InitialCreditComponent.vue'
import AvailableCreditComponent from './components/AvailableCreditComponent.vue'
import ServiceCreditComponent from './components/ServiceCreditComponent.vue'

export default {
  components: { 
    InitialCreditComponent,
    AvailableCreditComponent,
    ServiceCreditComponent
  },
  data() {
    return {
      isLoading: false,
      credits: {
        credit: 0,
        availableCredit:0
      }
    }
  },
  computed: {
    theme() {
      return this.$vuetify.theme.isDark
        ? this.$vuetify.theme.defaults.dark
        : this.$vuetify.theme.defaults.light
    },
    configFormat: function () {

      return {
        decimalDigits: 0,
        decimalSeparator: '.',
        thousandsSeparator: ',',
        currencySymbol: '',
        currencySymbolNumberOfSpaces: 0,
        currencySymbolPosition: 'left'
      }
    }
  },
  mounted() {
    let count = 0

    // DEMO delay for loading graphics
    this.loadingInterval = setInterval(() => {
      this[`isLoading${count++}`] = false
      if (count === 4) this.clear()
    }, 300)

    this.getCreditsUsedByUser()
  },
  methods: {
    getCreditsUsedByUser() {
      this.isLoading = true
      BackendApi.get('/creditsUsedByUser').then((response) => {
        if (response.data.success) {
          this.credits = response.data.data
          this.isLoading = false
        }
      })
    }
  }
}
</script>
