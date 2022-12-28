<template>
  <v-card>
    <v-card-title>
      SMS Respondidos: {{ totalCostSmsReceived }}
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
        <template v-slot:[`item.chat`]="{item}">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                @click="openChatModal(item)"
              >
                mdi-message-outline
              </v-icon>
            </template>
            <span>chat</span>
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
        <p>{{ campaigns }}</p>
      </v-data-table>
      <v-pagination
        v-model="pagination.current"
        :length="pagination.total"
        @input="ongetSms"
      ></v-pagination>
    </v-card-text>
    <ShowModalChatComponent 
      ref="showModalChat"
    />
  </v-card>
  
</template>
  
<script>

import ShowModalChatComponent from './ShowModalChatComponent.vue'

export default {
  components: {
    ShowModalChatComponent
  },
  props: {
    pagination: {
      type: Object,
      default: () => ({})
    },
    campaigns: {
      type: Array,
      default: () => ({})
    },
    totalCostSmsReceived: {
      type: Number,
      default: 0
    },
    hasUrl: {
      type: Boolean,
      default: true
    }
    // headers: {
    //   type: Array,
    //   default: null
    // }
  },
  data () {
    return {
      campaign_id: null,
      searchText: '',
      service_id: null,
      headers:  [
        { text: 'Telefono', value: 'phone' },
        { text: 'Mensaje', value: 'content' },
        { text: 'Chat', value: 'chat' },
        { text: 'Fecha', value: 'created' },
        { text: 'Credito', value: 'credit' }
      ]
    }
  },
  mounted () {
  
    this.ongetSms()
  },
  methods: {
  
    ongetSms() {
  
      this.$emit('ongetSms', this.searchText)
  
    },
    openChatModal(item) {
      this.$refs.showModalChat.open(item.phone)
    }
  }
}
</script>
  
  <style>
  
  </style>