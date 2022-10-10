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
      <BackPage
        class="ml-2"
        to="reports"
      />
    </div>

    <div id="dashboarDetail">
      <!-- dash campaing detail -->
      <DashDetailComponent 
        :campaing="campaing"
      />
    </div>

    <!-- componente url campaing detail -->
    <UrlDashDetailComponent 
      v-if="has_url"
    />

    <!-- pagination -->
    <DetailCampaignComponent
      ref="detailCampaignComponent"
      :campaigns="campaigns"
      :headers="headersForTable"
      :registers="registers"
      :pagination="pagination"
      @ongetSms="ongetSms"
    />
  </div>
</template>

<script>
import BackendApi from '@/services/backend.service'
import DashDetailComponent from './components/DashDetailComponent.vue'
import UrlDashDetailComponent from './components/UrlDashDetailComponent.vue'
import DetailCampaignComponent from './components/DetailCampaignComponent.vue'
import BackPage from '@/components/common/BackPage.vue'

import xlsx from 'json-as-xlsx'
import jspdf from 'jspdf'
import html2canvas from 'html2canvas'

export default {
  name:'DetailSmsReport',
  components:{
    DashDetailComponent,
    UrlDashDetailComponent,
    DetailCampaignComponent,
    BackPage
  },
  data () {
    return {
      campaing: null,
      registers: 0,
      excelprueba: null,
      loadingDownloadPdf: false,
      has_url: true,
      campaigns : [],
      pagination: {
        current: 1,
        total: 0
      },
      allSmsOfCampaing: [],
      search: '',
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
          { text: 'Credito', value: 'credit' },
          { text: 'Estado', value: 'status' }
        ]
      } else {
        return  [
          { text: 'Telefono', value: 'phone' },
          { text: 'Mensaje', value: 'content' },
          { text: 'Fecha', value: 'created' },
          { text: 'Credito', value: 'credit' },
          { text: 'Estado', value: 'status' }
        ]
      }
    }
  },
  mounted() {
    this.ongetSms()
    this.getCampaing()
  },
  methods: {
    file_to_json () {
      console.log('holis')
    },
   
    getCampaing() {
      BackendApi.get('/campaign/' + this.$route.params.campaign_id).then((response) => {
        if (response.data.success) {
          console.log('eeeeeeeeeeeee')
          console.log(response.data.data)
          console.log('eeeeeeeeeeeee')
          this.campaing = response.data.data.campaing
          this.registers = response.data.data.registers
        }
      })
    },
    ongetSms(searchText) {
      console.log(searchText)
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
            console.log(this.campaigns)
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
          }
        })
      const data = [
        {
          sheet: 'Sms',
          columns: [
            { label: 'Telefono', value: 'phone' },
            { label: 'Mensaje', value: 'content' },
            { label: 'Fecha programada', value: 'scheduled' },
            { label: 'Estado', value: 'status' }
          ],
          content: [
            ...this.allSmsOfCampaing
          ]
        }]
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
