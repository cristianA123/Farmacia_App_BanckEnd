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
      }
    }
  },
  mounted() {
    this.ongetSms()
  },
  methods: {

    ongetSms(searchText) {
      console.log(searchText)
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
    }
  }

}
</script>

<style>

</style>