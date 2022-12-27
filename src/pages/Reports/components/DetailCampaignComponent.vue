<template>
  <v-card>
    <v-card-title>
      SMS Enviados: {{ campaign.id }}
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
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon 
                v-if="item.times_open"
                v-bind="attrs"
                v-on="on"
              >
                mdi-eye-check-outline
              </v-icon>
              <v-icon 
                v-else
                v-bind="attrs"
                v-on="on"
              >
                mdi-eye-off-outline
              </v-icon>
            </template>
            <span 
              v-if="item.times_open"
            >ABIERTO</span>
            <span 
              v-else
            >NO ABIERTO</span>
          </v-tooltip>
         
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
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon 
                v-if="item.status === 'DELIVERED'"
                v-bind="attrs"
                v-on="on"
              >mdi-email-check-outline
              </v-icon>
              <v-icon 
                v-else
                v-bind="attrs"
                v-on="on"
              >mdi-email-remove-outline
              </v-icon>
            </template>
            <span 
              v-if="item.status === 'DELIVERED'"
            >DELIVERED</span>
            <span 
              v-else
            >REJECTED</span>
          </v-tooltip>
        </template>
        
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
import BackendApi from '@/services/backend.service'

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
    campaign: {
      type: Object,
      default: () => ({ id: 1 })
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
    // this.totalCost()
  },
  methods: {

    ongetSms() {

      this.$emit('ongetSms', this.searchText)

    },
    totalCost()  {
      const payload = {
        campaign_id: campaign.id
      }

      BackendApi.post('/totalCostCampaign', payload).then((response) => {
        if (response.data.success) {
          // this.reports = response.data.data
          console.log(response.data.data)
        }
      })
    }
  }
}
</script>

<style>

</style>