<template>
  <div>

    <!-- search bar form -->
    <Search-Bar
      @onfilter="onfilter"
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

        <template v-slot:item.camp_status="{ item }">
          <v-chip
            v-if="item.camp_status === '1'"
            class="ma-2"
            color="green"
            text-color="white"
            small
          >
            Finalizado
          </v-chip>

        </template>

        <template v-slot:item.sms_credit_send="{ item }">
          {{ new Intl.NumberFormat().format(item.sms_credit_send) }}
        </template>

        <template v-slot:item.user_name="{ item }">
          <userAvatar :user="item" />
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
                <v-list-item-text>Ver detalle</v-list-item-text>
              </v-list-item>
              <v-list-item
                @click="duplicate(item)"
                link
              >
                <v-list-item-text>Duplicar</v-list-item-text>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>

      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import userAvatar from './userAvatar'
import SearchBar from '@/components/common/SearchBar'

export default {
  components: {
    SearchBar,
    userAvatar
  },
  data() {
    return {
      searchQuery: ''
    }
  },
  props: ['headers','items','isLoading'],
  methods: {
    detalle(item) {
      this.$emit('onDetail', item)
    },
    onfilter(data) {
      this.$emit('onfilter', data)
    }
  }
}
</script>
