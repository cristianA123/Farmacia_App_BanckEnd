<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Contactos</div>
      </div>
      <v-spacer></v-spacer>
      
      <v-menu offset-y left transition="slide-y-transition">
        <template v-slot:activator="{ on }">
          <v-btn 
            color="primary"
            v-on="on"
          >
            <v-icon
              left
              dark
            >
              mdi-plus
            </v-icon>
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
      
      <v-btn
        class="ml-2"
        @click="config=true"
      >
        <v-icon>mdi-cog-outline</v-icon>
      </v-btn>
      
    </div>

    <v-navigation-drawer
      v-model="config"
      fixed
      right
      hide-overlay
      temporary
      width="310"
    >
      <div class="d-flex align-center pa-2">
        <div class="title">Configuraciones</div>
        <v-spacer></v-spacer>
        <v-btn icon @click="config = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

      <v-divider></v-divider>

      <div class="pa-2">
        <div class="font-weight-bold my-1">Duplicados</div>
        <span>Permite agregar contactos duplicados</span>
        <br>
        <br>
        <v-switch v-model="duplicateAcept" inset label="Aceptar contactos duplicados"></v-switch>
      </div>

      <div class="pa-2">
        <div class="font-weight-bold my-1">Depurar base</div>
        <span>Elimina todos los números Incorrecto de esta Base de contactos</span>
        <br>
        <br>
        <v-col
          class="pa-0 ma-0"
        >
          <v-btn 
            class="col-lg-12"
            mandatory
          >
            Limpiar
          </v-btn>
        </v-col>
      </div>

    </v-navigation-drawer>

    <Move-Agenda
      ref="moveAgenda"
      @onMoveAgenda="onMoveAgenda"
    />

    <v-card>
      <v-data-table
        v-model="selectedUsers"
        :headers="headers"
        show-select
        :loading="isLoading"
        :items="contacts"
        :items-per-page="10"
        :search="searchTable"
        hide-default-footer
        class="elevation-1"
      >

        <template v-slot:top>
          <v-text-field
            class="pa-2"
            v-model="searchText"
            v-debounce:250="getContacts"
            append-icon="mdi-magnify"
            dense
            clearable
            placeholder="Ej.: Filtrar por numero, nombre1, nombre2,  email, apellido1, apellido2 etc" 
            outlined
          />
        </template>

        <template v-slot:top>
          <v-text-field
            class="pa-2"
            v-model="searchText"
            v-debounce:250="getContacts"
            append-icon="mdi-magnify"
            dense
            clearable
            placeholder="Ej.: Filtrar por numero, nombre1, nombre2,  email, apellido1, apellido2 etc" 
            outlined
          />
        </template>

        <template v-slot:top>
          <v-row>
            <v-col
              class="py-0"
            >
              <div
                class="pa-2"
              >
                <v-menu 
                  offset-y 
                  left
                >
                  <template v-slot:activator="{ on }">
                    <transition name="slide-fade" mode="out-in">
                      <v-btn v-show="selectedUsers.length > 0" v-on="on">
                        Acciones
                        <v-icon right>mdi-menu-down</v-icon>
                      </v-btn>
                    </transition>
                  </template>
                  <v-list dense>
                    <v-list-item @click="deleteItems">
                      <v-list-item-title>Eliminar seleccionados</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="moveItems">
                      <v-list-item-title>Mover a otra agenda</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-col>
            <v-col
              class="pb-0 pr-6"
            >
              <v-text-field
                v-model="searchTable"
                label="Buscar contacto"
                outlined
              />
            </v-col>
          </v-row>
        </template>

        <template v-slot:item.id="{ item }">
          <div class="font-weight-bold"># <copy-label :text="item.id + ''" /></div>
        </template>

        <template v-slot:item.is_valid="{ item }">
          <v-chip
            v-if="item.is_valid === 1"
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

      <v-card-actions>
        <v-row justify="center">
          <v-col 
            class="my-0 py-0"
            cols="10"
          >
            <v-container class="max-width">
              <v-pagination
                v-model="pagination.current"
                :length="pagination.total"
                @input="onPageChange"
              />
            </v-container>
          </v-col>
        </v-row>
      </v-card-actions>

    </v-card>

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
import MoveAgenda from './components/MoveAgenda.vue'

export default {
  components: {
    MoveAgenda,
    newContact,
    newContactsFromExcel
  },
  data() {
    return {
      //pagination
      pagination: {
        current: 1,
        total: 10
      },
      searchText:'',
      // otros
      duplicateAcept: false,
      searchTable: '',
      isLoading: false,
      config: false,
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
        email: '',
        var1: '',
        var2: '',
        var3: '',
        var4: ''
      },
      selectedUsers: [],
      headers: [
        { text: 'Número', value: 'number' },
        { text: 'Nombre1', value: 'name1' },
        { text: 'Nombre2', value: 'name2' },
        { text: 'Apellido1', value: 'last_name1' },
        { text: 'Apellido2', value: 'last_name2' },
        { text: 'EMAIL', value: 'email' },
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
    },
    computedSelectedUsers: function () {

      return [1, 2]
    }
  },
  watch: {
    selectedUsers(val) {

    }
  },
  mounted() {
    this.agenda = this.$route.params.agenda
    this.getContacts()
  },
  methods: {
    //pagination
    onPageChange() {
      this.getContacts()
    },
    
    //otros
    getContacts () {
      this.isLoading = true
      this.selectedUsers = []

      const params = {
        searchtext : this.searchText,
        page:  (this.searchText === '') ? this.pagination.current : 1
      }

      BackendApi.get('/contactByAgenda/' + this.$route.params.agendaId, {
        params: params
      }).then((response) => {
        if (response.data.success) {
          this.contacts = response.data.data.data
          this.pagination.current = response.data.data.current_page
          this.pagination.total = response.data.data.last_page
        } else {
          this.$store.dispatch('app/showToast', response.data.message)
        }
        this.isLoading = false
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

      BackendApi.delete('/contact/' + contact.id).then((response) => {
        if (response.data.success) {
          this.$store.dispatch('app/showToast', 'Contacto eliminado exitosamente')
          this.dialogConfirm = false
          this.getContacts()
        } else {
          this.$store.dispatch('app/showToast', response.data.message)
        }
      })
    },
    deleteItems () {
      const IdsSelectedUsers = []

      this.selectedUsers.forEach((element) => {
        IdsSelectedUsers.push(element.id)
      })

      const payload = {
        contacts_id: IdsSelectedUsers
      }
      
      BackendApi.delete('/agenda/' + this.$route.params.agendaId + '/contacts', { data: payload }).then((response) => {
        if (response.data.success) {
          this.$store.dispatch('app/showToast', response.data.message)
          this.getContacts()
        }
      })
      
    },
    onMoveAgenda (agendaId) {
      const IdsSelectedUsers = []

      this.selectedUsers.forEach((element) => {
        IdsSelectedUsers.push(element.id)
      })

      const payload = {
        agenda_id: agendaId,
        contacts_id: IdsSelectedUsers
      }
      
      BackendApi.post('/move/contact', payload).then((response) => {
        if (response.data.success) {
          this.$store.dispatch('app/showToast', response.data.message)
          this.getContacts()
        }
      })
    },
    moveItems() {
      this.$refs.moveAgenda.open()
    },
    onCreated () {
      this.getContacts()
    }
  }
}
</script>
