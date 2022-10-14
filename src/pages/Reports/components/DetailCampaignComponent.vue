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
        <template v-slot:[`item.times_open`]="{ item }">
          <v-icon v-if="item.times_open">mdi-eye-check-outline</v-icon>
          <v-icon v-else>mdi-eye-off-outline</v-icon>
        </template>

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

        <template v-slot:[`item.status`]="{ item }">
          <v-icon v-if="item.status === 'DELIVERED'">mdi-email-check-outline</v-icon>
          <v-icon v-else>mdi-email-remove-outline</v-icon>
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
    },
    hasUrl: {
      type: Boolean,
      default: true
    },
    headers: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      campaign_id: null,
      searchText: '',
      service_id: null
    }
  },
  mounted () {

    this.ongetSms()
  },
  methods: {

    ongetSms() {

      this.$emit('ongetSms', this.searchText)

    }
  }
}
</script>

<style>

</style>