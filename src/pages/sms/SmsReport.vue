<template>
  <ReportCampaingComponent
    :headers="headers"
    :items="items"
    :search_text="search_text"
  />
</template>

<script>
import ReportCampaingComponent from '@/components/reports/campaings.vue'
import BackendApi from '@/services/backend.service'

export default {
  components: {
    ReportCampaingComponent
  },
  mounted() {
    this.getReports()
  },
  methods: {
    getReports() {
      BackendApi.get('/')
    }
  }
}
</script>