<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Canales</div>
      </div>
      <v-spacer></v-spacer>
      <v-dialog
        v-model="dialog"
        max-width="500px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            class="mb-2"
            v-bind="attrs"
            v-on="on"
          >
            Nueva ruta
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  class="my-0 py-0"
                  lg="6"
                >
                  <v-text-field
                    v-model="editedItem.name"
                    :error-messages="isValidName"
                    label="Nombre"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col
                  class="my-0 py-0"
                  lg="6"
                >
                  <v-text-field
                    v-model="editedItem.price"
                    :error-messages="isValidPrice"
                    label="Precio"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col
                  class="my-0 py-0"
                  lg="12"
                >
                  <v-text-field
                    v-model="editedItem.description"
                    label="Descripción"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col
                  class="my-0 py-0"
                  lg="6"
                >
                  <v-text-field
                    v-model="editedItem.api_Key"
                    :error-messages="isValidApi_Key"
                    label="Apikey"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col
                  class="my-0 py-0"
                  lg="6"
                >
                  <v-select
                    v-model="editedItem.provider_id"
                    :error-messages="isValidProvider_id"
                    label="Seleccione proveedor"
                    solo
                    dense
                    hide-details
                    hide-selected
                    :items="intervals"
                    item-text="name"
                    item-value="id"
                    outlined
                  ></v-select>
                </v-col>
                <v-col
                  class="my-0 py-0"
                  lg="6"
                >
                  <v-text-field
                    v-model="editedItem.sender"
                    :error-messages="isValidSender"
                    label="Sender"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col
                  class="my-0 py-0"
                  lg="6"
                >
                  <v-text-field
                    v-model="editedItem.authorization"
                    :error-messages="isValidAuthorization"
                    label="Authorization"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col
                  class="my-0 py-0"
                  lg="6"
                >
                  <v-text-field
                    v-model="editedItem.var1"
                    label="Var1"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col
                  class="my-0 py-0"
                  lg="6"
                >
                  <v-text-field
                    v-model="editedItem.var2"
                    label="Var2"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="close"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              :loading="isLoading"
              @click="save"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    
    <v-card>
      <v-data-table
        :headers="headers"
        :items="items"
        class="flex-grow-1"
        :loading="isLoading"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
        </template> 
      </v-data-table>
    </v-card>

  </div>
</template>

<script>
import BackendApi from '@/services/backend.service'

export default {
  data: () => ({
    backendErrors:{
      name:'',
      price:'',
      api_Key:'',
      authorization:'',
      provider_id:'',
      sender:''
    },
    selectedInterval: 0,
    intervals: [
      'Last 7 days',
      'Last 28 days',
      'Last month',
      'Last year'
    ],
    isLoading: false,
    btnLoading: false,
    dialog: false,
    dialogDelete: false,
    itemSelected: 0,
    headers: [
      { text: 'Canal', value: 'id' },
      { text: 'Nombre', value: 'name' },
      { text: 'Proveedor', value: 'provider' },
      { text: 'Descripción', value: 'description' },
      { text: 'Precio', value: 'price' },
      { text: 'APIKEY', value: 'api_Key' },
      { text: 'SENDER', value: 'sender' },
      { text: 'AUTHORIZATION', value: 'authorization' },
      { text: 'VAR1', value: 'var1' },
      { text: 'VAR2', value: 'var2' },
      { text: 'Modificar', value: 'actions' }
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      description: '',
      price:1,
      api_Key: '',
      sender: '',
      authorization: '',
      var1: '',
      var2: '',
      provider_id: null
    },
    defaultItem: {
      name: '',
      description: '',
      price:1,
      api_Key: '',
      sender: '',
      authorization: '',
      var1: '',
      var2: '',
      provider_id: null
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nuevo ruta de proveedor' : 'Editar ruta de proveedor'
    },
    isValidName () {
      return this.backendErrors?.name === undefined ? '' : this.backendErrors?.name[0]
    },
    isValidPrice () {
      return this.backendErrors?.price === undefined ? '' : this.backendErrors.price[0]
    },
    isValidApi_Key () {
      return this.backendErrors?.api_Key === undefined ? '' : this.backendErrors.api_Key[0]
    },
    isValidAuthorization () {
      return this.backendErrors?.authorization === undefined ? '' : this.backendErrors.authorization[0]
    },
    isValidSender () {
      return this.backendErrors?.sender === undefined ? '' : this.backendErrors.sender[0]
    },
    isValidProvider_id () {
      return this.backendErrors?.provider_id === undefined ? '' : this.backendErrors.provider_id[0]
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.items = []
      BackendApi.get('/channel').then((response) => {
        if (response.data.success) {
          this.items = response.data.data
        } else {
          // this.$store.dispatch('app/showToast', response.data.message)
        }
        this.isLoading = false
      })

      this.intervals = []
      BackendApi.get('/provider').then((response) => {
        if (response.data.success) {
          this.intervals = response.data.data
        } else {
          // this.$store.dispatch('app/showToast', response.data.message)
        }
        this.isLoading = false
      })
    },

    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.itemSelected = item.id
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    
    save () {
      this.btnLoading = true
      const payload =  this.editedItem

      if (this.editedIndex > -1) {
        BackendApi.put('/channel/' + this.itemSelected, payload)
          .then((response) => {
            if (response.data.success) {
              this.items = response.data.data
              this.initialize()
            }
            this.close()
            this.btnLoading = false
          })
          .catch( (error) => {
            // this.close()
            this.btnLoading = false
            this.backendErrors = error.response.data.errors
          })
      } else {
        BackendApi.post('/channel', payload, { headers: { 'Authorization': 'Bearer ' + window.localStorage.token } })
          .then((response) => {
            if (response.data.success) {
              this.items = response.data.data
              this.initialize()
            }
            this.btnLoading = false
            this.close()

          })
          .catch( (error) => {
            this.backendErrors = error.response.data.errors
            console.log(error)
            this.btnLoading = false
            // this.close() 
          })
      }
    }
  }
}
</script>
