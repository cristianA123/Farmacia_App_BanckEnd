<template>
  <div id="hola" class="d-flex flex-column flex-grow-1">
    
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Reporte de servicios</div>
      </div>
      <v-spacer></v-spacer>
      <v-btn
        outlined
        color="primary"
        :loading="loadingDownloadPdf"
        @click="descargarExcel"
      >
        <v-icon>mdi-progress-download</v-icon>
      </v-btn>
      <BtnToReload />
      <BackPage
        class="ml-2"
        to="reports"
      />
    </div>

    <v-row>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        lg="4"
      >
        <CampaignDetailCardComponent 
          :data-campaign="dataCampaign"
        />
      </v-col>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        lg="4"
      >
        <CampaignMetricsdCardComponent/>
      </v-col>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        lg="4"
      >
        <CampaignProgressComponent/>
      </v-col>
    </v-row>

    <DetailCampaignComponent
      ref="detailCampaignComponent"
      class="mb-4"
      :campaigns="campaigns"
      :headers="headersForTable"
      :registers="registers"
      :pagination="pagination"
      @ongetSms="ongetSms"
    />

    <DetailSmsReceivedCampaignComponent
      v-if="!!is_bidireccional"
      ref="detailCampaignComponent"
      :campaigns="smsReceiveds"
      :registers="registers"
      :pagination="paginationSmsReceived"
      @ongetSms="ongetSmsReceived"
    />
  </div>
</template>

<script>
import xlsx from 'json-as-xlsx'
import jspdf from 'jspdf'
import html2canvas from 'html2canvas'

import BackendApi from '@/services/backend.service'
import DetailCampaignComponent from './components/DetailCampaignComponent.vue'
import DetailSmsReceivedCampaignComponent from './components/DetailSmsReceivedCampaignComponent.vue'
import BackPage from '@/components/common/BackPage.vue'
import BtnToReload from '@/components/common/BtnToReload.vue'

import CampaignDetailCardComponent from './components/CampaignDetailCardComponent.vue'
import CampaignMetricsdCardComponent from './components/CampaignMetricsdCardComponent.vue'
import CampaignProgressComponent from './components/CampaignProgressComponent.vue'

export default {
  name:'DetailSmsReport',
  components:{
    CampaignDetailCardComponent,
    CampaignMetricsdCardComponent,
    DetailCampaignComponent,
    CampaignProgressComponent,
    DetailSmsReceivedCampaignComponent,
    BackPage,
    BtnToReload
  },
  data () {
    return {
      dataCampaign: null,
      registers: 0,
      excelprueba: null,
      loadingDownloadPdf: false,
      has_url: true,
      campaigns : [],
      smsReceiveds: [],
      pagination: {
        current: 1,
        total: 0
      },
      paginationSmsReceived: {
        current: 1,
        total: 0
      },
      allSmsOfCampaing: [],
      allSmsReceivedOfCampaing: [],
      search: '',
      searchSmsReceived: '',
      isLoadingDownload: false

    }
  },
  computed:{
    changedSearch () {
      return this.search
    },
    headersForTable () {
      if (this.has_url) {
        return [
          { text: 'Telefono', value: 'phone' },
          { text: 'Mensaje', value: 'content' },
          { text: 'Fecha', value: 'created' },
          { text: 'Link', value: 'times_open' },
          { text: 'Crédito', value: 'credit' },
          { text: 'Operador', value: 'carrier' },
          { text: 'Estado', value: 'status' }
        ]
      } else {
        return  [
          { text: 'Telefono', value: 'phone' },
          { text: 'Mensaje', value: 'content' },
          { text: 'Fecha', value: 'created' },
          { text: 'Crédito', value: 'credit' },
          { text: 'Operador', value: 'carrier' },
          { text: 'Estado', value: 'status' }
        ]
      }
    },
    is_bidireccional () {
      return this.dataCampaign?.sms_campaing?.is_bidireccional
    }
  },
  created() {
    this.getCampaing()
  },
  mounted() {
    this.ongetSms()
  },
  methods: {
    file_to_json () {
    },

    async getSmsReceived(searchText) {
      this.searchSmsReceived = searchText
      const payload = {
        campaign_id : this.$route.params.campaign_id,
        service_id : 1,
        searchtext : searchText
      }

      if ( searchText !== '' ) {
        this.paginationSmsReceived.current = 1
      }
      BackendApi.post('/smsReceiveds?page=' + this.paginationSmsReceived.current,payload)
        .then((response) => {
          if (response.data.success) {

            this.smsReceiveds = response.data.data.data
            this.paginationSmsReceived.current = response.data.data.current_page
            this.paginationSmsReceived.total = response.data.data.last_page
            
          }
        })
    },
    ongetSmsReceived(searchText) {
      this.searchSmsReceived = searchText
      const payload = {
        campaign_id : this.$route.params.campaign_id,
        service_id : 1,
        searchtext : searchText
      }

      if ( searchText !== '' ) {
        this.paginationSmsReceived.current = 1
      }
      BackendApi.post('/smsReceiveds?page=' + this.paginationSmsReceived.current,payload)
        .then((response) => {
          if (response.data.success) {

            this.smsReceiveds = response.data.data.data
            this.paginationSmsReceived.current = response.data.data.current_page
            this.paginationSmsReceived.total = response.data.data.last_page
            
          }
        })
    },
    async getCampaing() {
      await BackendApi.get('/campaign/' + this.$route.params.campaign_id).then((response) => {
        if (response.data.success) {
          this.dataCampaign = response.data.data
          this.registers = response.data.data.registers
        }
      })
    },
    ongetSms(searchText) {
      this.search = searchText
      const payload = {
        campaign_id : this.$route.params.campaign_id,
        service_id : 1,
        searchtext : searchText
      }

      if ( searchText !== '' ) {
        this.pagination.current = 1
      }
      BackendApi.post('/smsCampaignDetail?page=' + this.pagination.current,payload)
        .then((response) => {
          if (response.data.success) {

            this.campaigns = response.data.data.data
            this.pagination.current = response.data.data.current_page
            this.pagination.total = response.data.data.last_page
            if ( response.data.data.data[0].url_id === null && response.data.data.data[0].long_url === null) {
              this.has_url = false
            }
          }
        })
    },
    async descargarExcel () {

      this.isLoadingDownload = true

      const payload = {
        campaign_id : this.$route.params.campaign_id,
        service_id : 1,
        searchtext : ''
      }

      await BackendApi.post('/smsCampaignDetailAll', payload)
        .then((response) => {
          if (response.data.success) {
            this.allSmsOfCampaing = response.data.data
            console.log('sms')
            console.log(this.allSmsOfCampaing)
          }
        })

      await BackendApi.post('/smsReceivedCampaignDetailAll', payload)
        .then((response) => {
          if (response.data.success) {
            this.allSmsReceivedOfCampaing = response.data.data
            console.log('received')
            console.log(this.allSmsReceivedOfCampaing)
          }
        })

      // { label: 'Link', value: (row) => (this.has_url ? (row.times_open ? 'ABIERTO' : 'NO ABIERTO') : '' ) },
      let columnas = []

      if (this.has_url)  {
        columnas = [{ label: 'Telefono', value: 'phone' },
          { label: 'Mensaje', value: 'content' },
          { label: 'Fecha', value: 'send_at' },
          { label: 'Link', value: (row) => (row.times_open ? 'ABIERTO' : 'NO ABIERTO') },
          { label: 'Credito', value: 'credit' },
          { label: 'Operador', value: 'carrier' },
          { label: 'Estado', value: 'status' }]
      } else {
        columnas = [{ label: 'Telefono', value: 'phone' },
          { label: 'Mensaje', value: 'content' },
          { label: 'Fecha', value: 'send_at' },
          { label: 'Credito', value: 'credit' },
          { label: 'Operador', value: 'carrier' },
          { label: 'Estado', value: 'status' }]
      }

      const data = [
        {
          sheet: 'Sms',
          columns: [
            ...columnas
          ],
          content: [
            ...this.allSmsOfCampaing
          ]
        }
      ]
      
      if (this.is_bidireccional) {
        data.push({
          sheet: 'Respondidos',
          columns: [
            { label: 'Telefono', value: 'phone' },
            { label: 'Mensaje', value: 'content' },
            { label: 'Fecha', value: 'created' },
            { label: 'Credito', value: 'credit' }
          ],
          content: [
            ...this.allSmsReceivedOfCampaing
          ]
        })
      }
      
      const settings = {
        sheetName: 'Sms',
        fileName: 'Reporte de campaña'
      }

      xlsx(data, settings)
      this.isLoadingDownload = false
    },
    async downloadPdf () {

      const options = {
        background: 'white',
        scale: 3
      }

      html2canvas(document.getElementById('dashboarDetail'),options).then(
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
    }
  }
}
</script>
