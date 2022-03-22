<template>
  <v-col cols="12" lg="6">
    <v-card
      height="270px"
      @click="detailAvailableCredit"
    >
      <v-card-title>
        Crédito disponible
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
              {{ availableCredit | formatCurrency(configFormat) }}
            </div>
            <div class="d-flex justify-end">
              <span>Créditos</span>
            </div>
          </div>
        </v-col>
      </v-card-text>
    </v-card>

    <v-dialog
      v-model="diaglog"
      width="300px"
    >
      <v-card>
        <v-card-title>Detalle de créditos</v-card-title>
        <v-card-text>
          <table>
            <tr>
              <td style="width: 100%;"><strong>Inicial:</strong></td>
              <td style="text-align: right;">{{ credits.credit | formatCurrency(configFormat) }}</td>
              <td>-</td>
            </tr>
            <tr>
              <td style="width: 300px;"><strong>Sub-usuarios:</strong></td>
              <td style="text-align: right;">{{ assignedCredits | formatCurrency(configFormat) }}</td>
            </tr>
            <tr>
              <td style="width: 300px;"><strong>Mi usuario:</strong></td>
              <td style="text-align: right;">{{ credits.sms_cost + credits.ivr_cost | formatCurrency(configFormat) }}</td>
            </tr>
            <tr>
              <td></td>
              <td>_________</td>
            </tr>
          
            <tr>
              <td style="width: 300px;"><strong>Disponible:</strong></td>
              <td style="text-align: right;">{{ credits.availableCredit | formatCurrency(configFormat) }}</td>
            </tr>
          </table>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text>Más detalle</v-btn>
          <v-btn text @click="diaglog=false">Entiendo</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<script>
import BackendApi from '@/services/backend.service'

export default {
  props: {
    credits: {
      type: Object,
      default: () => {}
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    availableCredit: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      diaglog: false,
      assignedCredits: 0
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
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    detailAvailableCredit() {
      this.diaglog = true
    },
    getUsers() {
      BackendApi.get('/user').then((response) => {
        if (response.data.success) {
          const users = response.data.data

          users.forEach((user) => {
            this.assignedCredits = this.assignedCredits + user.credit
          })
        }
      })
    }
  }
}
</script>