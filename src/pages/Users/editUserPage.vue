<template>
  <div class="flex-grow-1">
    <div class="d-flex align-center pb-3">
      <div>
        <div class="display-1">{{ isEdit ? "Editar usuario" : "Crear usuario" }}</div>
      </div>
      <v-spacer></v-spacer>
      <Back-Page 
        to="users"
      />
    </div>

    <div class="my-2">
      <div>
        <v-card v-if="user.status === false" class="warning mb-4" light>
          <v-card-title>Usuario deshabilitado</v-card-title>
          <v-card-subtitle>¡Este usuario ha sido deshabilitado! Se revocaron los accesos de inicio de sesión.</v-card-subtitle>
          <v-card-text>
            <v-btn dark @click="enableUser()">
              <v-icon left small>mdi-account-check</v-icon>Habilitar usuario
            </v-btn>
          </v-card-text>
        </v-card>

        <v-card :loading="isLoading" :disabled="isLoading">

          <v-card-title>
            Información básica
          </v-card-title>

          <v-card-text>
            <div class="d-flex flex-column flex-sm-row">
              
              <!-- <div v-if="user.name !== ''">
                <userAvatar :key="user.id" :user="user" :detail="false" />
              </div> -->

              <div class="flex-grow-1 pt-2 pa-sm-2">  
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                  @submit.prevent="submit"
                >
                  <v-text-field 
                    v-model="user.name" 
                    :error-messages="isValidName"
                    label="Nombre" 
                    placeholder="Mi nombre"
                    :rules="[v => !!v || 'Nombre es obligatorio']"
                    outlined
                    prepend-icon="mdi-account-outline"
                  />
                  <!-- ********************************************************** -->

                  <v-combobox
                    v-model="model"
                    :disabled="!isAdmin"
                    :hide-no-data="!search"
                    :search-input.sync="search"
                    :filter="filter"
                    :items="companies"
                    prepend-icon="mdi-briefcase-outline"
                    label="Seleccione la empresa"
                    :rules="[v => !!v || 'Empresa es obligatorio']"
                    outlined
                    small-chips
                  >
                    <template v-slot:no-data>
                      <v-list-item>
                        <span class="subheading">Crear</span>
                        <v-chip
                          :color="`${colors[nonce - 1]} lighten-3`"
                          label
                          small
                          @click="createCompany"
                        >
                          {{ search }}
                        </v-chip>
                      </v-list-item>
                    </template>
                    <template v-slot:selection="{ attrs, item, parent, selected }">
                      <v-chip
                        v-if="item === Object(item)"
                        v-bind="attrs"
                        :color="`${item.color} lighten-3`"
                        :input-value="selected"
                        label
                        small
                      >
                        <span class="pr-2">
                          {{ item.text }}
                        </span>
                        <v-icon
                          small
                          @click="parent.selectItem(item)"
                        >
                          $delete
                        </v-icon>
                      </v-chip>
                    </template>
                    <template v-slot:item="{ index, item }">
                      <v-text-field
                        v-if="editing === item"
                        v-model="editing.text"
                        autofocus
                        flat
                        background-color="transparent"
                        hide-details
                        solo
                        @keyup.enter="edit(index, item)"
                      ></v-text-field>
                      <v-chip
                        v-else
                        :color="`${item.color} lighten-3`"
                        dark
                        label
                        small
                      >
                        {{ item.text }}
                      </v-chip>
                      <v-spacer></v-spacer>
                      <!-- <v-list-item-action @click.stop>
                        <v-btn
                          icon
                          @click.stop.prevent="edit(index, item)"
                        >
                          <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
                        </v-btn>
                      </v-list-item-action> -->
                    </template>
                  </v-combobox>

                  <!-- **************************************************************** -->
                  <!-- <v-text-field
                    v-else
                    v-model="user.company"
                    :disabled="!isAdmin"
                    label="Empresa" 
                    :rules="[v => !!v || 'Empresa es obligatorio']"
                    outlined
                    prepend-icon="mdi-briefcase-outline"
                  /> -->
                  <v-text-field 
                    v-model="user.email" 
                    :error-messages="isValidEmail"
                    label="Email" 
                    :rules="[
                      v => !!v || 'Email es obligatorio',
                      v => /.+@.+\..+/.test(v) || 'Email no es válido'
                    ]"
                    prepend-icon="mdi-at"
                    outlined
                  />
                  <v-text-field 
                    v-model="user.credit" 
                    :error-messages="isValidCredit"
                    label="Credito inicial [min: 100, máx: 7280]" 
                    :rules="creditRules"
                    prepend-icon="mdi-currency-usd"
                    outlined
                  />

                  <v-row>
                    <v-col>
                      <v-card
                        outlined
                      >
                        <v-card-title>
                          Servicios
                        </v-card-title>

                        <v-card-text>
                          <ServicesCheckComponent
                            :services="services"
                            :user="user"
                            :backend-errors="backendErrors"
                            @onChange="onChangeServicesCheck"
                          />
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>

                  <div class="d-flex">
                    <v-spacer></v-spacer>
                    <v-btn 
                      color="primary"
                      type="submit"
                      :loading="isLoading"
                    >
                      {{ isEdit ? "Editar" : "Crear" }} 
                    </v-btn>
                  </div>

                </v-form>
                <v-row v-if="isEdit">
                  <v-col>
                    <v-card
                      outlined
                    >
                      <v-card-title>
                        Restablecer contraseña
                      </v-card-title>

                      <v-card-text 
                        class="d-flex justify-center"
                      >
                        <v-btn
                          class="primary"
                          :loading="isLoadingResetPassword"
                          @click="sureResetPassword"
                        >
                          Generar nueva contraseña
                        </v-btn>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </div>

      <!-- disable modal -->
      <v-dialog v-model="disableDialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Disable User</v-card-title>
          <v-card-text>Are you sure you want to disable this user?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="disableDialog = false">Cancel</v-btn>
            <v-btn color="warning" @click="user.disabled = true; disableDialog = false">Disable</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- delete modal -->
      <v-dialog v-model="deleteDialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Delete User</v-card-title>
          <v-card-text>Are you sure you want to delete this user?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="deleteDialog = false">Cancel</v-btn>
            <v-btn color="error" @click="deleteDialog = false">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- preguntar si esta seguro de reset password -->
      <v-dialog
        v-model="dialogConfirmResetPassword"
        width="600px"
      >
        <v-card>
          <v-card-title> <v-icon>mdi-login-variant</v-icon>Generar contraseña</v-card-title>

          <v-card-text>
            <p style="font-size: 18px">Está seguro que desea generar una nueva contraseña para este usuario?</p>
          </v-card-text>

          <v-card-actions>
            <v-btn text @click="dialogConfirmResetPassword = false">Cancelar</v-btn>
            <v-spacer></v-spacer>
            <v-btn text @click="resetPassword">Crear</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <Dialog-Password-Component 
        ref="dialogPassword" 
        @onOk="$router.push({ name: 'users' })"
      />

      <Dialog-Password-Component 
        ref="dialogResetPassworh"
        @onOk="onResetPassword" 
      />
      <!-- @onOk="$router.push({ name: 'users' })" -->

      <Company
        ref="newCompany"
        @onCreatedCompany="onCreatedCompany"
      />

    </div>
  
  </div>
</template>

<script>
import BackPage from '@/components/common/BackPage'
import headers from '@/configs/headers.js'
// import userAvatar from '@/components/reports/userAvatar'
import DialogPasswordComponent from './components/DialogPasswordComponent'
import ServicesCheckComponent from '@/pages/Users/components/ServicesCheckComponent.vue'
import BackendApi from '@/services/backend.service'
import Company from './components/NewCompanyComponent.vue'

export default {
  components: {
    BackPage,
    // userAvatar,
    DialogPasswordComponent,
    ServicesCheckComponent,
    Company
  },
  data() {
    return {
      // variables de prueba
      activator: null,
      attach: null,
      colors: ['red','blue','green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
      editing: null,
      editingIndex: -1,
      companies: [
        { header: 'Seleccione una empresa o cree una' }
      ],
      nonce: 1,
      menu: false,
      model: null,
      x: 0,
      search: null,
      y: 0,
      //*************** */
      company_id: '',
      backendErrors:{
        name:'',
        email:'',
        company:'',
        credit:'',
        channel_id:''
      },
      user: {},
      breadcrumbs: [
        {
          text: 'Usuarios',
          to: '/usuarios/',
          exact: true
        },
        {
          text: 'Editar usuario'
        }
      ],
      services: [],
      providers: [],
      dialogPassword: false,
      password: '',
      errors: {
        name:'',
        company: '',
        email: ''
      },
      isLoading: false,
      deleteDialog: false,
      disableDialog: false,
      valid: true,
      slider: 50,
      min: 0,
      max: 300,
      startCredit: 0,
      creditRules: [
        (v) => (v > this.min || v < this.max) || 'No se puede asignar este crédito'
      ],
      isLoadingResetPassword: false,
      dialogConfirmResetPassword: false
    }
  },
  computed: {
    isEdit: function () {
      
      return this.$route.params.userId ? true : false
    },
    isValidName () {

      return this.backendErrors.name === undefined ? '' : this.backendErrors.name
    },
    isValidEmail () {

      return this.backendErrors.email === undefined ? '' : this.backendErrors.email
    },
    isValidCompany () {

      return this.backendErrors.company === undefined ? '' : this.backendErrors.company
    },
    isValidCredit () {
      
      return this.backendErrors.credit === undefined ? '' : this.backendErrors.credit
    },
    isAdmin () {
      return $cookies.get('user').isAdmin
    }

  },
  watch: {
    model (val, prev) {
      if (val === prev) return

      this.model = val
    }
  },
  mounted() {
    if (this.isEdit) {
      this.getUserInfo()
    } else {
      this.getServicesAndCompanyUser()
      this.services =  [],
      this.$refs.form.reset()
      this.user = {
        name: '',
        email: '',
        company: '',
        sms:false,
        ivr:false,
        whatsapp:false,
        mailling:false,
        channel_id: null,
        credit: 0,
        provider_id: 1
      }
    }
  },
  created() {
    this.getCompanies()
  },
  methods: {
    //metodos para el combobox
    edit (index, item) {
      if (!this.editing) {
        this.editing = item
        this.editingIndex = index
      } else {
        this.editing = null
        this.editingIndex = -1
      }
    },
    filter (item, queryText, itemText) {
      if (item.header) return false

      const hasValue = (val) => val !== null ? val : ''

      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1
    },
    createCompany() {
      this.$refs.newCompany.open(this.search)
    },
    onCreatedCompany(data)  {
      this.getCompanies()
      const newCompany = {
        id: data.id,
        text: data.company,
        color: this.colors[this.nonce - 1]
      }

      this.nonce++
      this.model = newCompany
    },
    getUserInfo () {
      BackendApi.get('/user/' + this.$route.params.userId).then((response) => {
        if (response.data.success) {
          this.user = response.data.data
          const data = {
            id: response.data.data.company.id,
            text: response.data.data.company.company,
            color: this.colors[this.nonce - 1]
          }
  
          this.model = data
          this.nonce++

          this.services = response.data.data.father_services
        }
      })
    },
    getServicesAndCompanyUser () {
      BackendApi.get('/user/company/' + $cookies.get('user').id).then((response) => {
        if (response.data.success) {
          if (response.data.data.company?.id) {
            const data = {
              id: response.data.data.company.id,
              text: response.data.data.company.company,
              color: this.colors[this.nonce - 1]
            }
    
            this.model = data
            this.nonce++
          }

          if ( response.data.data?.channel_id) {
            this.user.channel_id = response.data.data.channel_id
          }

          this.services = response.data.data?.father_services || []
        }
      })
    },
    submit () { 
      if (this.$refs.form.validate()) {
        this.isLoading = true

        const payload = {
          name: this.user.name,
          email: this.user.email,
          company: this.user.company,
          services: this.services,
          credit: this.user.credit,
          channel_id: this.user.channel_id,
          user_id: this.$route.params.userId,
          company_id: this.model.id
        }

        if (this.isEdit) {

          BackendApi.post('/user', payload).then((response) => {
            if (response.data.success) {
              this.isLoading = false
              this.$router.push({ name: 'users' })
            }
          }).catch((error) => {
            this.isLoading = false
            this.backendErrors = error.response.data.errors
            // this.$store.dispatch('app/showError', { message: error.response.data.message, error: '' } )
          })

        } else {

          BackendApi.post('/user', payload)
            .then((response) => {
              if (response.data.success) {
                this.isLoading = false
                this.$refs.dialogPassword.open(response.data.data.email, response.data.data.userPassword)
              }
            })
            .catch((error) => {
              this.backendErrors = error.response.data.errors
              this.isLoading = false
              // this.$store.dispatch('app/showError', { message: 'No se pudo crear el usuario', error: '' } )
              this.errors = {
                email: 'Este email ya existe'
              }
            })
        }
      }
    },
    enableUser () {
      const payload = {
        user_id_disable: this.user.id,
        status: 1
      }

      axios.post('/disableUser', payload, headers)
        .then((response) => {
          if (response.data.success) {
            this.snackbar = true
            this.textSnackbar = response.data.message
          } else {
            this.snackbar = true
            this.textSnackbar = 'Error al habilitar el usuario'
          }
          this.isLoading = false
        })
        .catch((error) => {
          this.isLoading = false
        })
    },
    getProviders () {
      BackendApi.get('/provider').then((response) => {
        if (response.data.success) {
          this.providers = response.data.data
        }
      })
    },
    getCompanies () {
      BackendApi.get('/user/companies').then((response) => {
        if (response.data.success) {
          response.data.data.forEach((company) => {
            const data = {
              id: company.id,
              text: company.company,
              color: this.colors[this.nonce - 1]
            }
  
            this.companies.push(data)
  
            this.nonce++
          })
        }
      })
    },
    onChangeServicesCheck(services) {
      
      this.services = services
    },
    sureResetPassword() {
      this.dialogConfirmResetPassword = true
    },
    resetPassword () {
      this.dialogConfirmResetPassword = false
      this.isLoadingResetPassword = true

      const payload = {
        user_id: this.user.id
      }

      BackendApi.post('/resetPassword', payload)
        .then((response) => {
          if (response.data.success) {
            this.$refs.dialogResetPassworh.open(this.user.email, response.data.data.userPassword)
            this.isLoadingResetPassword = false
          }
        })
        .catch((error) => {
          this.isLoadingResetPassword = false
        })

    },
    onResetPassword() {
      this.$refs.dialogResetPassworh.close()
    }
  }
  
}
</script>
