<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Reporte de servicios</div>
      </div>
      <v-spacer></v-spacer>
    </div>

    <v-data-table
      :headers="headers"
      :items="campaigns"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-menu
          offset-y
        >
          <template v-slot:activator="{ attrs, on }">
            <v-btn
              v-bind="attrs"
              v-on="on"
            >
              Acciones
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              @click="openDialogCreate(item)"
              link
            >
              Modificar
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <p>{{campaigns}}</p>
    </v-data-table>
  </div>

</template>

<script>
import BackendApi from '@/services/backend.service'

export default {
  name:'DetailSmsReport',
  data () {
    return {
      campaigns : [],
      headers: [
        { text: 'Telefono', value: 'phone' },
        { text: 'Mensaje', value: 'content' },
        { text: 'Fecha programada', value: 'send_at' },
        { text: 'Estado', value: 'status' }
        // { text: 'Última modificacion', value: 'updated' },
        // { text: 'Acciones', value: 'actions' }
      ],
      campaign_id: null,
      service_id: null
    }
  },
  mounted () {

    // this.campaign_id = this.$route.params.campaign_id
    this.getSmsCampaign()
  },
  methods: {

    getSmsCampaign () {
      const payload = {
        campaign_id: this.$route.params.campaign_id,
        service_id: 1
      }

      BackendApi.post('/smsCampaignDetail', payload).then((response) => {
        if (response.data.success) {

          this.campaigns = response.data.data
          console.log(this.campaigns)
        }
      }).catch((error) => {
        console.log(error)
      })

    }
  }
}
</script>

<style>

</style>