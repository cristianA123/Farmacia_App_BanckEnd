<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Reporte de servicios</div>
      </div>
      <v-spacer></v-spacer>
      <v-btn
        small
        outlined
        color="primary"
        :loading="isLoadingDownload"
        @click="descargarExcel"
      >
        <v-icon>mdi-progress-download</v-icon>
      </v-btn>
      <BtnToReload />

    </div>

    <TableReportComponent
      :headers="headers"
      :items="reports"
      :total-cost-campaign="totalCostCampaign"
      :search_text="search_text"
      :is-loading="isLoading"
      @onfilter="on_filter"
      @onreadyusers="onreadyusers"
      @onDetail="onDetail"
    />
    
  </div>
</template>

<script>
import TableReportComponent from './components/TableReportComponent.vue'
import BackendApi from '@/services/backend.service'
import BtnToReload from '@/components/common/BtnToReload.vue'

import moment from 'moment'
import xlsx from 'json-as-xlsx'

export default {
  components: {
    TableReportComponent,
    BtnToReload

  },
  data() {
    return {
      search_text: '',
      users: [],
      reports: [],
      headers: [
        { text: 'Usuario' ,align:'center', sortable: false,value: 'user_name' },
        { text: 'Campaña' ,align:'center', sortable: false,value: 'name' },
        { text: 'Fecha de envío',align:'center' , value: 'created_at' },
        { text: 'Estado' ,align:'center', sortable: false,value: 'status' },
        { text: 'Créditos' , value: 'total_cost' },
        { text: 'Acciones', align:'center',sortable: false,value: 'actions' }
      ],
      isLoading: false,
      isLoadingDownload: false,
      totalCostCampaign: 0
    }
  },
  mounted() {
    this.onreadyusers()

  },
  methods: {
    getReports(filters) {
      this.totalCostCampaign = 0
      this.reports = []
      this.isLoading = true
      
      BackendApi.post('/userCampaignBetween', filters).then((response) => {
        if (response.data.success) {
          this.reports = response.data.data
          this.reports.forEach((element) => {
            this.totalCostCampaign += element.total_cost
          })
        }
        this.isLoading = false
      })
    },
    on_filter(data) {
      const { users, services } = data
      
      if (users.find((user) => user === 0) !== undefined) {
        const i = users.indexOf(0)

        users.splice(i, 1)
      }

      if (services.find((user) => user === 0) !== undefined) {
        const i = services.indexOf(0)

        services.splice(i, 1)
      }

      const filters = {
        users: users,
        services: services,
        start_date: data.start_date,
        final_date: data.final_date
      } 

      this.getReports(filters)
    },
    onDetail(item) {
      this.$router.push({ path: '/reports/sms/detail/' + item.id })
    },
    onreadyusers (users) {

      this.totalCostCampaign = 0

      this.isLoading = true
      const payload = {
        users: users,
        services: [1,2],
        start_date : moment().format('YYYY-MM-DD'),
        final_date : moment().format('YYYY-MM-DD')
      }

      if ( users !== undefined ) {
        BackendApi.post('/userCampaignBetween', payload).then((response) => {
          if (response.data.success) {
            this.reports = response.data.data
            this.reports.forEach((element) => {
              this.totalCostCampaign += element.total_cost
            })
          }
          this.isLoading = false
        })
      }
    },
    descargarExcel () {

      this.isLoadingDownload = true
      const data = [
        {
          sheet: 'Campañas',
          columns: [
            { label: 'Usuario', value: 'user' },
            { label: 'Email', value: 'email' },
            { label: 'Campaña', value: 'name' },
            { label: 'Servicio', value: 'service' },
            { label: 'Fecha de envio', value: 'created_at' },
            { label: 'Estado',  value: (row) => (row.status === 0 ? 'cancelado' : ( row.status === 1 ? 'finalizado' : (row.status === 2 ? 'pendiente' : ( row.status === 3 ? 'procesando' : 'agendado')))) },
            { label: 'Usuario', value: 'user' },
            { label: 'Créditos', value: 'total_cost' }
          ],
          content: [
            ...this.reports
          ]
        }]

      const settings = {
        sheetName: 'Reporte',
        fileName: 'Reporte de servicios'
      }

      xlsx(data, settings)
      this.isLoadingDownload = false
    }
  }
}
</script>