<template>
  <div class="d-flex flex-grow-1 flex-column">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Dashboard</div>
      </div>
      <v-spacer></v-spacer>
    </div>
    <v-btn
      depressed
      class="mb-3"
      color="primary"
      :loading="loadingDownloadPdf"
      @click="downloadPdf"
    >
      Descargar PDF
    </v-btn>
    <v-row id="dashBoard" class="flex-grow-0" dense>

      <InitialCreditComponent 
        :credit="credits.credit"
        :is-loading="isLoading"
      /> 

      <AvailableCreditComponent
        :available-credit="credits.availableCredit"
        :credits="credits"
        :is-loading="isLoading"
      />

      <ServiceCreditComponent
        
        :credits="credits"
        :is-loading="isLoading"
      />

    </v-row>
  </div>
</template>

<script>
import BackendApi from '@/services/backend.service'
import InitialCreditComponent from './components/InitialCreditComponent.vue'
import AvailableCreditComponent from './components/AvailableCreditComponent.vue'
import ServiceCreditComponent from './components/ServiceCreditComponent.vue'

import jspdf from 'jspdf'
import html2canvas from 'html2canvas'

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
      },
      loadingDownloadPdf: false
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
    },
    downloadPdf () {
      console.log(this.loadingDownloadPdf)
      this.loadingDownloadPdf = true
      const options = {
        scale: 3
      }

      html2canvas(document.getElementById('dashBoard'),options).then(
        (canvas) => {
          const imgData = canvas.toDataURL('image/png')
          const doc = new jspdf('p', 'pt', 'a4')
          const bufferX = 15
          const bufferY = 15
          const imgProps = doc.getImageProperties(imgData)
          const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

          doc.addImage(imgData, 'JPEG',bufferX ,bufferY ,    pdfWidth,
            pdfHeight, undefined, 'FAST')
          doc.save('Reporte de campaña.pdf')
        }
      )
      this.loadingDownloadPdf = false
    }
  }
}
</script>
