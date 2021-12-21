<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Agenda de contactos</div>
      </div>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        @click="openNewAgenda()"
      >
        Crear nueva agenda
      </v-btn>
    </div>

    <template>
      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:item.entregabilidad="{ item }">
          {{ item.entregabilidad*100 }}%
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip
            v-if="item.status === 1"
            class="ma-2"
            color="green"
            text-color="white"
            small
          >
            Ok
          </v-chip>
          <v-chip
            v-if="item.status === 2"
            class="ma-2"
            color="orange"
            text-color="white"
            small
          >
            Procesando
          </v-chip>
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
                @click="openNewAgenda(item)"
                link
              >
                Modificar
              </v-list-item>
              <v-list-item
                @click="manage(item)"
                link
              >
                Gestionar
              </v-list-item>

              <template>
                <div class="text-center">
                  <v-dialog
                    v-model="dialogConfirm"
                    persistent
                    max-width="400"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-list-item
                        v-on="on"
                        v-bind="attrs"
                        link
                      >
                        Eliminar
                      </v-list-item>
                    </template>
                    <v-card>
                      <v-card-title class="text-h5">
                        Seguro de eliminar esta agenda?
                      </v-card-title>
                      <v-card-text>Una vez eliminado esta agenda, no podrá recuperarla. Las campañas que se esten procesando y que hagan uso de esta agenda se enviarán con normalidad.</v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="secondary"
                          text
                          @click="dialog = false"
                        >
                          Cancelar
                        </v-btn>
                        <v-btn
                          color="success"
                          text
                          @click="deleteItem(item)"
                        >
                          Confirmo
                        </v-btn>
                      </v-card-actions>
                    </v-card>

                  </v-dialog>
                </div>
              </template>

            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </template>

    <new-agenda ref="newAgenda" @onCreated="onCreated"/>

  </div>
</template>

<script>
import newAgenda from './components/newAgenda'
import axios from 'axios'

export default {
  components: {
    newAgenda
  },
  mounted() {
    this.getAgendas()
  },
  data () {
    return {
      headers: [
        { text: 'Agenda', value: 'name' },
        { text: 'Creación', value: 'created_at' },
        { text: 'Contactos', value: 'contacts' },
        { text: 'Última modificación', value: 'updated_at' },
        { text: 'Entregabilidad', value: 'entregabilidad' },
        { text: 'Estado', value: 'status' },
        { text: 'Acciones', value: 'actions' }
      ],
      items: [],
      dialogConfirm: false
    }
  },
  methods: {
    getAgendas () {
      axios.get('/getAgendas', { headers: { Authorization: 'Bearer ' + window.localStorage.token } }).then((response) => {
        if (response.data.success) {
          this.items = response.data.data
        } else {
          this.$store.dispatch('app/showToast', response.data.message)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    openNewAgenda (agenda) {
      this.$refs.newAgenda.open(agenda)
    },
    confirmDelete (agenda) {
      this.deleteItem (agenda)
    },
    deleteItem (agenda) {
      const payload = {
        agenda_id: agenda.id
      }

      axios.post('/deleteAgenda', payload, { headers: { 'Authorization': 'Bearer ' + window.localStorage.token } }).then((response) => {
        if (response.data.success) {
          this.$store.dispatch('app/showToast', 'Agenda eliminada exitosamente')
          this.dialogConfirm = false
          this.getAgendas()
        } else {
          this.$store.dispatch('app/showToast', response.data.message)
        }
      })
    },
    manage(agenda) {
      this.$router.push({ name: 'contacts', params: { agenda: agenda } })
    },
    onCreated () {
      this.getAgendas()
    }
  }
}
</script>