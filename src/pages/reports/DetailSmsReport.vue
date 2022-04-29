<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Reporte de servicios</div>
      </div>
      <v-spacer></v-spacer>
    </div>
    <v-card>
      <v-card-title>
        Resultados:
        <v-spacer></v-spacer>
        <v-text-field
          v-model="searchText"
          v-debounce:250="getSms"
          append-icon="mdi-magnify"
          class="flex-grow-1 mr-md-2"
          dense
          clearable
          placeholder="Ej.: Filtrar por name, email, empresa, etc"
        />
      </v-card-title>
      <v-data-table
        :headers="headers" 
        :items="campaigns"
        hide-default-footer 
        class="elevation-1"
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
      <v-pagination
        v-model="pagination.current"
        :length="pagination.total"
        @input="onPageChange"
      ></v-pagination>
    </v-card>
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
      searchText: '',
      pagination: {
        current: 1,
        total: 0
      },
      service_id: null
    }
  },
  mounted () {

    // this.campaign_id = this.$route.params.campaign_id
    this.getCampaings()
  },
  methods: {

    getCampaings () {
      const payload = {
        campaign_id: this.$route.params.campaign_id,
        service_id: 1,
        searchtext : ''
      }

      BackendApi.post('/smsCampaignDetail?page=' + this.pagination.current, payload).then((response) => {
        if (response.data.success) {

          this.campaigns = response.data.data.data
          this.pagination.current = response.data.data.current_page
          this.pagination.total = response.data.data.last_page
          console.log(this.campaigns)
        }
      })

    },
    onPageChange() {
      this.getSmsCampaign()
    },
    getSms() {
      console.log(this.searchText)
      const payload = {
        campaign_id : 3,
        service_id : 1,
        searchtext : this.searchText
      }

      BackendApi.post('/smsCampaignDetail?page=' + this.pagination.current,payload)
        .then((response) => {
          this.campaigns = response.data.data.data
          console.log(this.campaigns)
          this.pagination.current = response.data.data.current_page
          this.pagination.total = response.data.data.last_page
        })
    }
  }
}
</script>

<style>

</style>