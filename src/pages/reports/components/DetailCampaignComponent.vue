<template>
  <v-card>
    <v-card-title>
      Resultados:
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchText"
        v-debounce:250="ongetSms"
        append-icon="mdi-magnify"
        class="flex-grow-1 mr-md-2"
        dense
        clearable
        placeholder="Ej.: Filtrar por name, email, empresa, etc"
      />
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers" 
        :items="campaigns"
        hide-default-footer 
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
                link
                @click="openDialogCreate(item)"
              >
                Modificar
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
        <p>{{ campaigns }}</p>
      </v-data-table>
      <v-pagination
        v-model="pagination.current"
        :length="pagination.total"
        @input="ongetSms"
      ></v-pagination>
    </v-card-text>

  </v-card>
</template>

<script>

export default {
  name:'DetailCampaignComponent',
  props: {
    pagination: {
      type: Object,
      default: () => ({})
    },
    campaigns: {
      type: Array,
      default: () => ({})

    }
  },
  data () {
    return {
      // campaigns : [],
      headers: [
        { text: 'Telefono', value: 'phone' },
        { text: 'Mensaje', value: 'content' },
        { text: 'Fecha', value: 'created' },
        { text: 'Estado', value: 'status' }
      ],
      campaign_id: null,
      searchText: '',
      // pagination: {
      //   current: 1,
      //   total: 0
      // },
      service_id: null
    }
  },
  mounted () {

    this.ongetSms()
  },
  methods: {

    ongetSms() {

      this.$emit('ongetSms', this.searchText)

      // console.log(this.searchText)
      // const payload = {
      //   campaign_id : this.$route.params.campaign_id,
      //   service_id : 1,
      //   searchtext : this.searchText
      // }

      // BackendApi.post('/smsCampaignDetail?page=' + this.pagination.current,payload)
      //   .then((response) => {
      //     if (response.data.success) {

      //       this.campaigns = response.data.data.data
      //       console.log(this.campaigns)
      //       this.pagination.current = response.data.data.current_page
      //       this.pagination.total = response.data.data.last_page
      //     }

      //   })
    }
  }
}
</script>

<style>

</style>