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
      
        <template v-slot:item.name="{ item }">
          {{ item.name }}
          <br>
          {{ item.service }}
        </template>

        <template v-slot:item.status="{ item }">
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
            Finalizado
          </v-chip>

          <v-chip
            v-if="item.status === 2"
            class="ma-2"
            text-color="white"
            small
          >
            Pendiente
          </v-chip>

          <v-chip
            v-if="item.status === 3"
            class="ma-2"
            text-color="white"
            small
          >
            Procesando
          </v-chip>

          <v-chip
            v-if="item.status === 3"
            class="ma-2"
            color="orange"
            text-color="white"
            small
          >
            Agendado
          </v-chip>

        </template>

        <template v-slot:item.sms_credit_send="{ item }">
          {{ new Intl.NumberFormat().format(item.sms_credit_send) }}
        </template>

        <template v-slot:item.user_name="{ item }">
          <userAvatar :user="{ name: item.user, company: item.company, email:item.email }" />
        </template>

        <template v-slot:item.actions="{ item }">
          <v-menu
            offset-y
          >
            <template v-slot:activator="{ attrs, on }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                text
              >
                Acciones
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                @click="detalle(item)"
                link
              >
                Ver detalle
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
  methods: {
    detalle(item) {
      
      this.$router.push({ path: '/reports/sms/detail/' + item.id })
    },
    onfilter(data) {
      this.$emit('onfilter', data)
    },
    onreadyfilters() {
      this.$emit('onreadyfilters')
    },
    onreadyusers(data) {
      this.$emit('onreadyusers',data)
    }
  }
}
</script>
