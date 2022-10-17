<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Reporte de servicios</div>
      </div>
      <v-spacer></v-spacer>
      <v-btn
        outlined
        color="primary"
        :loading="isLoadingDownload"
        @click="descargarExcel"
      >
        <v-icon>mdi-progress-download</v-icon>
      </v-btn>
    </div>

    <TableReportComponent
      :headers="headers"
      :items="reports"
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
import moment from 'moment'
import xlsx from 'json-as-xlsx'

export default {
  components: {
    TableReportComponent
  },
  data() {
    return {
      search_text: '',
      users: [],
      reports: [],
      headers: [
        { text: 'Usuario' , value: 'user_name' },
        { text: 'Campaña' , value: 'name' },
        { text: 'Fecha de lanzamineto' , value: 'created_at' },
        { text: 'Estado' , value: 'status' },
        { text: 'Creditos' , value: 'total_cost' },
        { text: 'Acciones', value: 'actions' }
      ],
      isLoading: false,
      isLoadingDownload: false
    }
  },
  mounted() {
    this.onreadyusers()

  },
  methods: {
    getReports(filters) {
      this.isLoading = true
      
      BackendApi.post('/userCampaignBetween', filters).then((response) => {
        if (response.data.success) {
          this.reports = response.data.data
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
            { label: 'Fecha de lanzamiento', value: 'created_at' },
            { label: 'Estado',  value: (row) => (row.status === 0 ? 'cancelado' : ( row.status === 1 ? 'finalizado' : (row.status === 2 ? 'pendiente' : ( row.status === 3 ? 'procesando' : 'agendado')))) },
            { label: 'Usuario', value: 'user' },
            { label: 'Creditos', value: 'total_cost' }
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