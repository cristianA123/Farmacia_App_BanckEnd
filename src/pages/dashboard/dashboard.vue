<template>
  <div class="d-flex flex-grow-1 flex-column">
    <!-- <div class="d-flex align-center py-3"> -->
    <div class="d-flex justify-space-between align-content-center mb-1">
      <div class="display-1">Dashboard</div>
      <v-spacer></v-spacer>
      <v-btn
        depressed
        outlined
        color="primary"
        class="mx-2"
        :loading="loadingDownloadPdf"
        @click="downloadPdf"
      >
        <v-icon>mdi-share-all-outline</v-icon>
      </v-btn>

      <v-btn
        outlined
        color="primary"
        :loading="loadingDownloadPdf"
        @click="downloadPdf"
      >
        <v-icon>mdi-progress-download</v-icon>
      </v-btn>
    
      <!-- </div> -->
    </div>
   
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
import moment from 'moment'
moment.locale('es')

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
    async downloadPdf () {
      this.loadingDownloadPdf = true
      console.log(this.loadingDownloadPdf)

      const options = {
        scale: 3
      }

      await html2canvas(document.getElementById('dashBoard'),options).then(
        (canvas) => {
          const imgData = canvas.toDataURL('image/png')
          const doc = new jspdf('p', 'pt', 'a4')
          const bufferX = 25
          const bufferY = 135
          const imgProps = doc.getImageProperties(imgData)
          const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
          const sizeHead = 16

          doc.setFontSize(sizeHead)
          const optionsHeader = {
            align: 'center',
            font: 'helvetica'
          }

          doc.text('Dashboard', pdfWidth / 2, 40, optionsHeader)
          doc.setFontSize(12)
          doc.text('FECHA Y HORA:' + ' ' + moment().format('MMMM Do YYYY, h:mm:ss a') , 25, 65)
          doc.text('DATOS DEL USUARIO:', 25, 80)
          doc.text('NOMBRE: ' +  $cookies.get('user').name , 25, 95)
          doc.text('CORREO: ' +  $cookies.get('user').email , 25, 110)
          doc.text('CAMPAÑIA: ' +  $cookies.get('user').company , 25, 125)
          doc.addImage(imgData, 'JPEG',bufferX ,bufferY , pdfWidth, pdfHeight, undefined, 'FAST')
          
          doc.save('Reporte de campaña.pdf')
        }
      )
      this.loadingDownloadPdf = false
    }
  }
}
</script>
