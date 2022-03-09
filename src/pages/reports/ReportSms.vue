<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Report SMS</div>
      </div>
      <v-spacer></v-spacer>
    </div>

    <ReportCampaingComponent
      :headers="headers"
      :items="reports"
      :search_text="search_text"
      :isLoading="isLoading"
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
      reports: [],
      headers: [
        { text: 'Usuario' , value: 'user_name' },
        { text: 'Campaña' , value: 'name' },
        { text: 'Creditos' , value: 'total_cost' }
      ],
      isLoading: false
    }
  },
  mounted() {
    this.getReports()
  },
  methods: {
    getReports() {
      this.isLoading = true

      BackendApi.get('/ivr/ChildrenIvrCampaigns').then((response) => {
        if (response.data.success) {
          this.reports = response.data.data
        }
        this.isLoading = false
      })
    }
  }
}
</script>