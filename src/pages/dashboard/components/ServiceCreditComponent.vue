<template>
  <v-col cols="12" lg="3" xl="3">
    <v-card
      height="200px"
      color="light-blue darken-4"
      dark
    >
      <v-card-title>
        Crédito {{ service }} consumido
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
            <div class="text-h3">
              {{ credits.sms_cost + credits.ivr_cost | formatCurrency(configFormat) }}
            </div>
            <div class="d-flex justify-end">
              <span>Créditos</span>
            </div>
          </div>
        </v-col>
      </v-card-text>
    </v-card>

    <v-dialog
      v-model="dialogDetailAvailableCredit"
      width="800px"
    >
      <v-card>
        <v-card-title>Detalle de créditos</v-card-title>
        <v-card-text>
          <table>
            <tr>
              <td>Crédito inicial:</td>
              <td>sd -</td>
            </tr>
            <tr>
              <td>Crédito asignado a sub-usuarios:</td>
              <td>sd</td>
            </tr>
            <tr>
              <td>Crédito utilizado por mi usuario:</td>
              <td>sd</td>
            </tr>
            ______________
            <tr>
              <td>Crédito disponible:</td>
              <td>sd</td>
            </tr>
          </table>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text>Más detalle</v-btn>
          <v-btn text>Entiendo</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
export default {
  props: {
    service: {
      type: String,
      default: () => ''
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    credits: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      dialogDetailAvailableCredit: false
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