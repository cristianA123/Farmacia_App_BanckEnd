<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Reporte de servicios</div>
      </div>
      <v-spacer></v-spacer>
    </div>

    <!-- dash campaing detail -->
    <DashDetailComponent/>

    <!-- componente url campaing detail -->
    <UrlDashDetailComponent v-if="has_url"/>

    <v-btn
      depressed
      class="mb-3"
      color="primary"
      @click="descargarExcel"
    >
      Descargar como excel
    </v-btn>
    <!-- pagination -->
    <DetailCampaignComponent
      ref="detailCampaignComponent"
      :campaigns="campaigns"
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

import xlsx from 'json-as-xlsx'

export default {
  name:'DetailSmsReport',
  components:{
    DashDetailComponent,
    UrlDashDetailComponent,
    DetailCampaignComponent
  },
  data () {
    return {
      has_url: true,
      campaigns : [],
      pagination: {
        current: 1,
        total: 0
      },
      allSmsOfCampaing: [],
      search: ''
    }
  },
  computed:{
    changedSearch () {
      return this.search
    }
  },
  mounted() {
    this.ongetSms()
  },
  methods: {

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
    }
  }

}
</script>

<style>

</style>