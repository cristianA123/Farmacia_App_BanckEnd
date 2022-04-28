<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Reporte de servicios</div>
      </div>
      <v-spacer></v-spacer>
    </div>

    <TableReportComponent
      :headers="headers"
      :items="reports"
      :search_text="search_text"
      :isLoading="isLoading"
      @onfilter="on_filter"
    />

  </div>
</template>

<script>
import TableReportComponent from './components/TableReportComponent.vue'
import BackendApi from '@/services/backend.service'

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
        { text: 'Fecha' , value: 'created_at' },
        { text: 'Estado' , value: 'status' },
        { text: 'Creditos' , value: 'total_cost' },
        { text: 'Acciones', value: 'actions' }
      ],
      isLoading: false
    }
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
    }
  }
}
</script>