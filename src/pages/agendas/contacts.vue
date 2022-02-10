<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Administrar contactos: </div>
      </div>
      <v-spacer></v-spacer>
      <v-menu offset-y left transition="slide-y-transition">
        <template v-slot:activator="{ on }">
          <v-btn 
            color="primary"
            v-on="on"
          >
            Nuevos contactos
          </v-btn>
        </template>

        <!-- user menu list -->
        <v-list dense nav>
          <v-list-item @click="openNewContact()">
            <v-list-item-content>
              <v-list-item-title>Individual</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="openNewContactsFromExcel()">
            <v-list-item-content>
              <v-list-item-title>Desde Excel</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <template>
      <v-data-table
        :headers="headers"
        :items="contacts"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:item.is_valid="{ item }">
          <v-chip
            v-if="item.is_valid ===  1"
            color="green"
            text-color="white"
            small
          >
            Correcto
          </v-chip>
          <v-chip
            v-else
            color="red"
            text-color="white"
            small
          >
            Incorrecto
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
                @click="detalle(item)"
                link
              >
                Ver detalle
              </v-list-item>
              <v-list-item
                @click="openNewContact(item)"
                link
              >
                Modificar
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
                        Seguro de eliminar este contacto?
                      </v-card-title>
                      <v-card-text>Una vez eliminado este contacto, no podrá recuperarla. Las campañas que se esten procesando y que hagan uso de esta agenda se enviarán con normalidad.</v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="secondary"
                          text
                          @click="dialogConfirm = false"
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

    <new-contact
      ref="newContact"
      :agendaId="$route.params.agendaId"
      @onCreated="onCreated" 
    />

    <new-contacts-from-excel
      ref="newContactsFromExcel"
    />    

  </div>
</template>

<script>
import newContact from './components/newContact'
import newContactsFromExcel from './components/newContactsFromExcel'
import BackendApi from '@/services/backend.service'

export default {
  components: {
    newContact,
    newContactsFromExcel
  },
  data() {
    return {
      dialogConfirm: false,
      agenda: '',
      lengthPagination: 0,
      itemSelected: '',
      drawer: null,
      contacts: [],
      contact: {
        number: null,
        name1: '',
        name2: '',
        lastname1: '',
        lastname2: '',
        var1: '',
        var2: '',
        var3: '',
        var4: ''
      },
      headers: [
        { text: 'Número', value: 'number' },
        { text: 'Nombre1', value: 'name1' },
        { text: 'Nombre2', value: 'name2' },
        { text: 'Apellido1', value: 'lastname1' },
        { text: 'Apellido2', value: 'lastname2' },
        { text: 'VAR1', value: 'var1' },
        { text: 'VAR2', value: 'var2' },
        { text: 'VAR3', value: 'var3' },
        { text: 'VAR4', value: 'var4' },
        { text: 'Estado', value: 'is_valid' },
        { text: 'Ult. Modif.', value: 'updated' },
        { text: 'Acciones', value: 'actions' }
      ]
    }
  },
  computed: {
    countContacs: function () {

      return this.contacts.length
    }
  },
  mounted() {
    this.agenda = this.$route.params.agenda
    this.getContacts()
  },
  methods: {
    getContacts () {
      this.contacts = []
      BackendApi.get('/contactByAgenda/' + this.$route.params.agendaId).then((response) => {
        if (response.data.success) {
          this.contacts = response.data.data
        } else {
          this.$store.dispatch('app/showToast', response.data.message)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    selectContact (contact) {
      this.contact = contact
    },
    openNewContact (contact) {
      this.$refs.newContact.open(contact)
    },
    openNewContactsFromExcel () {
      this.$refs.newContactsFromExcel.open()
    },
    confirmDelete (contact) {
      this.deleteItem (contact)
    },
    deleteItem (contact) {
      const payload = {
        contact_id: contact.id
      }

      axios.post('/deleteContact', payload, { headers: { 'Authorization': 'Bearer ' + window.localStorage.token } }).then((response) => {
        if (response.data.success) {
          this.$store.dispatch('app/showToast', 'Contacto eliminado exitosamente')
          this.dialogConfirm = false
          this.getContacts()
        } else {
          this.$store.dispatch('app/showToast', response.data.message)
        }
      })
    },
    onCreated () {
      this.getContacts()
    }
  }
}
</script>
