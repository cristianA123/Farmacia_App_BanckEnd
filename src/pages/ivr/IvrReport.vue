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
      :items="items"
      :search_text="search_text"
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
      isLoading: false,
      items: [],
      headers: [
        { text: 'Usuario', value: 'user' },
        { text: 'Nombre', value: 'name' },
        { text: 'Creditos', value: 'totalCost' }
      ]
    }
  },
  mounted() {
    this.getReports()
  },
  methods: {
    getReports() {
      this.isLoading = true

      BackendApi.get('/ivr/campaigns').then((response) => {
        if (response.data.success) {
          this.items = response.data.data
        }
        this.isLoading = false
      })
    }
  }
}
</script>