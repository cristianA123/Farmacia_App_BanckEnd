<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Reportes SMS</div>
      </div>
      <v-spacer></v-spacer>
    </div>

    <ReportCampaings 
      :items="items"
      :headers="headers"
      :isLoading="isLoading"
      @onDetail="onDetail"
      v-on:onfilter="onFilter"
    />
  </div>
</template>

<script>
import BackendApi from '@/services/backend.service'
import ReportCampaings from '../../components/reports/campaings'

export default {
  components: {
    ReportCampaings
  },
  data () {
    return {
      isLoading: false,
      headers: [
        { text: 'Usuario', value: 'user_name' },
        { text: 'Fecha', value: 'upload_at' },
        { text: 'Nombre', value: 'campaing_name' },
        { text: 'Estado', value: 'camp_status' },
        { text: 'Créditos', value: 'sms_credit_send' },
        { text: 'Acciones', value: 'actions' }
      ],
      items: []
    }
  },
  methods: {
    onFilter : function (payload) {
      this.isLoading = true
      BackendApi.get('/getReport', { params: payload }).then((response) => {
        response.data.success ? this.items = response.data.report : this.$store.dispatch('app/showToast',response.data.message)
        this.isLoading = false
      }).catch((error) => {
        console.log(error)
        this.isLoading = false
      })
    },
    onDetail(item) {
      this.$router.push({ name: 'sms-report-detail', params: item })
    }
  }
}
</script>
