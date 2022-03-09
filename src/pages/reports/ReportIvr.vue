<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Reporte IVR</div>
      </div>
      <v-spacer></v-spacer>
    </div>

    <ReportCampaingComponent
      :headers="headers"
      :items="reports"
      :search_text="search_text"
      :isLoading="isLoading"
      @onfilter="on_filter"
      @onDetail="onDetail"
    />

  </div>
</template>

<script>
import ReportCampaingComponent from '@/components/reports/campaings.vue'
import BackendApi from '@/services/backend.service'

export default {
  components: {
    ReportCampaingComponent
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
      
      BackendApi.post('/ivr/userCampaignBetween', filters).then((response) => {
        if (response.data.success) {
          this.reports = response.data.data
        }
        this.isLoading = false
      })
    },
    on_filter(data) {
      const users = data.usersSelected
      
      if (users.find((user) => user === 0) !== undefined) {
        const i = users.indexOf(0)

        users.splice(i, 1)
      }

      const filters = {
        users: users,
        start_date: data.dateStart,
        final_date: data.dateEnd
      } 

      this.getReports(filters)
    },
    onDetail(item) {
      this.$router.push({ path: 'ivr/detail/' + item.id })
    }
  }
}
</script>