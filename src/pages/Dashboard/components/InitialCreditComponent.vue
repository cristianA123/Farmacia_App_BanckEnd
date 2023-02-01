<template>
  <v-col cols="12" lg="6">
    <v-card
      color="#1E1E35"
      dark
      height="270px"
    >
      <v-card-title>
        Crédito inicial
      </v-card-title>
      <v-card-text>
        <v-col class="d-flex justify-center">
          <div
            v-if="isLoading"
          >
            <v-progress-circular
              :size="50"
              indeterminate
            ></v-progress-circular>
          </div>
          <div
            v-else
          >
            <div class="text-h1">
              {{ credit | formatCurrency(configFormat) }}
            </div>
            <div class="d-flex justify-end">
              <span>Créditos</span>
            </div>
          </div>
        </v-col>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    credit: {
      type: Number,
      default: 0
    }
  },
  computed: {
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
  }
    
}
</script>