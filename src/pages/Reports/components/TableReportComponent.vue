<template>
  <div>

    <!-- search bar form -->
    <FiltersReportComponent
      @onfilter="onfilter"
      @onreadyfilters="onreadyfilters"
      @onreadyusers="onreadyusers"
    />

    <v-card>
      <v-card-title>
        Resultados:
        <v-spacer></v-spacer>
        <v-text-field
          v-model="searchQuery"
          append-icon="mdi-magnify"
          class="flex-grow-1 mr-md-2"
          dense
          clearable
          placeholder="Ej.: Filtrar por name, email, empresa, etc"
          @keyup.enter="searchUser(searchQuery)"
        />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        :loading="isLoading"
        :search="searchQuery"
        class="flex-grow-1"
      >
      
        <template v-slot:[`item.name`]="{ item }">
          {{ item.name }}
          <v-chip
            class="ma-1"
            outlined
            x-small
          >
            {{ item.service }}
          </v-chip>
          <v-chip
            v-if="item.is_bidireccional"
            outlined
            x-small
          >
            <v-icon>mdi-swap-horizontal</v-icon>
          </v-chip>
          
        </template>

        <template v-slot:[`item.total_cost`]="{ item }">
          {{ item.total_cost | formatCurrency(configFormat) }}
          <!-- <v-chip
            class="ma-2"
            outlined
            x-small
          >
            {{ item.service }}
          </v-chip> -->
          
        </template>

        <template v-slot:[`item.status`]="{ item }">
          <v-chip
            v-if="item.status === 0"
            class="ma-2"
            color="red"
            text-color="white"
            small
          >
            Cancelado
          </v-chip>

          <v-chip
            v-if="item.status === 1"
            class="ma-2"
            color="green"
            text-color="white"
            small
          >
            FINALIZADO
          </v-chip>

          <v-chip
            v-if="item.status === 2"
            class="ma-2"
            text-color="white"
            small
            dark
          >
            PENDIENTE
          </v-chip>

          <v-chip
            v-if="item.status === 3"
            class="ma-2"
            small
            color="orange"
            dark
          >
            PROCESANDO
          </v-chip>

          <v-chip
            v-if="item.status === 4"
            class="ma-2"
            color="orange"
            text-color="white"
            small
          >
            AGENDADO
          </v-chip>

        </template>

        <template v-slot:[`item.sms_credit_send`]="{ item }">
          {{ new Intl.NumberFormat().format(item.sms_credit_send) }}
        </template>

        <template v-slot:[`item.user_name`]="{ item }">
          <userAvatar :user="{ name: item.user, company: item.company, email:item.email }" />
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-menu
            offset-y
          >
            <template v-slot:activator="{ attrs, on }">
              <v-btn
                v-bind="attrs"
                text
                v-on="on"
              >
                Acciones
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                link
                @click="detalle(item)"
              >
                Ver detalle
              </v-list-item>
              <v-list-item
                v-if="isAdmin"
                link
                @click="downloadFile(item)"
              >
                Archivo
              </v-list-item>
              
            </v-list>
          </v-menu>
        </template>

      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import userAvatar from '@/components/reports/userAvatar'
import FiltersReportComponent from './FiltersReportComponent'

export default {
  components: {
    FiltersReportComponent,
    userAvatar
  },
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchQuery: ''
    }
  },
  computed: {
    isAdmin () {
      return $cookies.get('user').isAdmin
    },
    configFormat () {
      return {
        decimalDigits: 0,
        decimalSeparator: '.',
        thousandsSeparator: ',',
        currencySymbol: '',
        currencySymbolNumberOfSpaces: 0,
        currencySymbolPosition: 'left'
      }
    }
  },
  methods: {
    detalle(item) {
      
      this.$router.push({ path: '/reports/sms/detail/' + item.id })
    },
    downloadFile(item) { 
      window.location.assign(process.env.VUE_APP_BACKEND_ENDPOINT)
    },
    onfilter(data) {
      this.$emit('onfilter', data)
    },
    onreadyfilters() {
      this.$emit('onreadyfilters')
    },
    onreadyusers(data) {
      this.$emit('onreadyusers',data)
    },
    prueba() {
      console.log(this.items)
    }
  }
}
</script>
