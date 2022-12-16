<template>
  <div id="hola" class="d-flex flex-column flex-grow-1">
      
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Reporte de tracking URL:</div>
      </div>
      <v-spacer></v-spacer>
      <!-- <v-btn
        outlined
        color="primary"
        :loading="loadingDownloadPdf"
        @click="descargarExcel"
      >
        <v-icon>mdi-progress-download</v-icon>
      </v-btn> -->
      <BtnToReload />
      <BackPage
        class="ml-2"
        to="short-url"
      />
    </div>
  
    <v-row>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        lg="8"
      >
        <DetailShortUrlComponent/>
      </v-col>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        lg="4"
      >
        <OpenClicksComponent/>
      </v-col>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        lg="4"
      >
        <ClicksOverTimeComponent/>
      </v-col>

      <v-col
        cols="12"
        xs="12"
        sm="6"
        lg="4"
      >
        <ClicksGeoreferencingComponent/>
      </v-col>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        lg="4"
      >
        <DevicesTypesComponent/>
      </v-col>
    </v-row>
  
  </div>
</template>
  
<script>
// import xlsx from 'json-as-xlsx'
// import jspdf from 'jspdf'
// import html2canvas from 'html2canvas'
  
import BackendApi from '@/services/backend.service'
import BackPage from '@/components/common/BackPage.vue'
import BtnToReload from '@/components/common/BtnToReload.vue'

import ClicksGeoreferencingComponent from './components/ClicksGeoreferencingComponent.vue'
import ClicksOverTimeComponent from './components/ClicksOverTimeComponent.vue'
import DetailShortUrlComponent from './components/DetailShortUrlComponent.vue'
import DevicesTypesComponent from './components/DevicesTypesComponent.vue'
import OpenClicksComponent from './components/OpenClicksComponent.vue'
  
export default {
  name:'DetailSmsReport',
  components:{
    ClicksGeoreferencingComponent,
    ClicksOverTimeComponent,
    DetailShortUrlComponent,
    DevicesTypesComponent,
    OpenClicksComponent,
    BackPage,
    BtnToReload
  },
  data () {
    return {
      url: null
    }
  },
  computed:{
  
  },
  created() {
    this.existUrl()
  },
  mounted() {
    console.log(this.$route.params)
    this.url = this.$route.params.url
  },
  methods: {
    file_to_json () {
    },
    existUrl() {
      if (!this.$route.params.url) {
        this.$router.push({ name: 'short-url' })
      }
    },
    async getCampaing() {
      // await BackendApi.get('/campaign/' + this.$route.params.campaign_id).then((response) => {
      //   if (response.data.success) {
      //     console.log('wwwwwwwwwwwwwwww')
      //     console.log(response.data)
      //     this.dataCampaign = response.data.data
      //     this.registers = response.data.data.registers
      //   }
      // })
    }
   
  }
}
</script>
