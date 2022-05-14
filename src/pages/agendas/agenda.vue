<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Agendas</div>
      </div>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="openNewAgenda()">
        Crear nueva agenda
      </v-btn>
    </div>

    <!--Empty items --->
    <EmptyItems
      v-if="itemsEmpty && !isLoading"
      icon="mdi-contacts"
      text="No tiene agendas creadas. Para crear agendas cortas clic en botón Crear Nueva Agenda"
    />

    <template v-else>
      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:item.deliverability="{ item }">
          {{ item.deliverability * 100 }}%
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip
            v-if="item.status === 0"
            class="ma-2"
            color="secondary"
            text-color="white"
            small
          >
            Sin contactos
          </v-chip>
          <v-chip
            v-if="item.status === 1"
            class="ma-2"
            color="green"
            text-color="white"
            small
          >
            Disponible
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
          <v-menu offset-y>
            <template v-slot:activator="{ attrs, on }">
              <v-btn text v-bind="attrs" v-on="on"> Acciones </v-btn>
            </template>

            <v-list>
              <v-list-item link @click="openNewAgenda(item)">
                Renombrar
              </v-list-item>

              <v-list-item link @click="manage(item)">
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
                      <v-list-item link v-bind="attrs" v-on="on">
                        Eliminar
                      </v-list-item>
                    </template>
                    <v-card>
                      <v-card-title class="text-h5">
                        Seguro de eliminar esta agenda?
                      </v-card-title>
                      <v-card-text
                        >Una vez eliminado esta agenda, no podrá
                        recuperarla. Las campañas que se esten procesando y
                        que hagan uso de esta agenda se enviarán con
                        normalidad.</v-card-text
                      >
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
                          @click="confirmDelete(item)"
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

    <new-agenda ref="newAgenda" @onCreated="onCreated" />
  </div>
</template>

<script>
import newAgenda from './components/newAgenda'
import BackendApi from '@/services/backend.service'
import EmptyItems from '@/components/common/EmptyItems'

export default {
  components: {
    newAgenda,
    EmptyItems
  },
  data() {
    return {
      headers: [
        { text: 'Nombre', value: 'name' },
        { text: 'Contactos', value: 'all_contacts' },
        { text: 'Entregabilidad', value: 'deliverability' },
        { text: 'Estado', value: 'status' },
        { text: 'Última modificación', value: 'updated_at' },
        { text: 'Acciones', value: 'actions' }
      ],
      items: [],
      dialogConfirm: false,
      isLoading: false
    }
  },
  computed: {
    itemsEmpty: function () {
      return this.items.length === 0 ? true : false
    }
  },
  mounted() {
    this.getAgendas()
  },
  methods: {
    getAgendas() {
      this.isLoading = false
      BackendApi.get('/agenda')
        .then((response) => {
          this.isLoading = false
          if (response.data.success) {
            this.items = response.data.data
            console.log(this.items)
          } else {
            this.$store.dispatch('app/showToast', response.data.message)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    openNewAgenda(agenda) {
      this.$refs.newAgenda.open(agenda)
    },
    confirmDelete(agenda) {
      this.deleteItem(agenda)
    },
    deleteItem(agenda) {
      BackendApi.delete('/agenda/' + agenda.id).then((response) => {
        if (response.data.success) {
          this.$store.dispatch(
            'app/showToast',
            'Agenda eliminada exitosamente'
          )
          this.dialogConfirm = false
          this.getAgendas()
        } else {
          this.$store.dispatch('app/showToast', response.data.message)
        }
      })
    },
    manage(agenda) {
      this.$router.push({
        path: '/tools/agendas/' + agenda.id + '/contacts',
        params: { agenda: agenda }
      })
    },
    onCreated() {
      this.getAgendas()
    }
  }
}
</script>