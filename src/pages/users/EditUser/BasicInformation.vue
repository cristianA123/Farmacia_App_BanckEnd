<template>
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
            
            <div v-if="user.name !== ''">
              <userAvatar :key="user.id" :user="user" :detail="false" />
            </div>

            <div class="flex-grow-1 pt-2 pa-sm-2">  
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                @submit.prevent="submit"
              >
                <v-text-field 
                  v-model="user.name" 
                  :error-messages="errors.name"
                  label="Nombre" 
                  placeholder="name"
                  :rules="[v => !!v || 'Nombre es obligatorio']"
                  outlined
                  prepend-icon="mdi-account-outline"
                />
                <v-text-field 
                  v-model="user.company" 
                  :error-messages="errors.company"
                  label="Empresa" 
                  placeholder="name"
                  :rules="[v => !!v || 'Empresa es obligatorio']"
                  prepend-icon="mdi-briefcase-outline"
                  outlined
                />
                <v-text-field 
                  v-model="user.email" 
                  :error-messages="errors.email"
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
                  :error-messages="errors.credit"
                  label="Credito inicial [min: 100, máx: 7280]" 
                  :rules="creditRules"
                  prepend-icon="mdi-currency-usd"
                  outlined
                />

                <v-row>
                  <v-col>
                    <v-card>
                      <v-card-title>
                        Servicios
                      </v-card-title>

                      <v-card-text>
                        <ServicesCheckComponent
                          @onChange="onChangeServicesCheck"
                        />
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <v-col>
                    <v-card>
                      <v-card-title>
                        Password
                      </v-card-title>

                      <v-card-text>
                        <v-btn>
                          Reiniciar contraseña
                        </v-btn>
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
                    {{ edit ? "Editar" : "Crear" }} 
                  </v-btn>
                </div>

              </v-form>
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

    <Dialog-Password-Component ref="dialogPassword" @onOk="$router.push({ name: 'users' })"/>

  </div>
</template>

<script>
import BackendApi from '@/services/backend.service'
import headers from '@/configs/headers.js'
import userAvatar from '@/components/reports/userAvatar'
import DialogPasswordComponent from '../components/DialogPasswordComponent'
import ServicesCheckComponent from '@/pages/users/components/ServicesCheckComponent.vue'

export default {
  components: {
    userAvatar,
    DialogPasswordComponent,
    ServicesCheckComponent
  },
  props: {
    user: {
      type: Object,
      default: () => ({})
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      services: [],
      dialogPassword: false,
      password: '',
      errors: {
        name:'',
        company: '',
        email: ''
      },
      snackbar: false,
      textSnackbar: '',
      isLoading: false,
      panel: [1],
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
      providers: []
    }
  },
  computed: {
    maxCredits : function () {

      return this.user.availableCredit
    },
    minCredits : function () {
      
      return this.user.usedCredit
    }
  },
  mounted() {
    this.getProviders()
  },
  methods : {
    submit () { 
      if (this.$refs.form.validate()) {
        this.isLoading = true

        const payload = {
          name: this.user.name,
          email: this.user.email,
          company: this.user.company,
          services: this.services,
          credit: this.user.credit,
          provider_id: this.user.provider_id,
          user_id: this.$route.params.userId
        }

        if (this.edit) {

          BackendApi.post('/user', payload).then((response) => {
            if (response.data.success) {
              this.isLoading = false
              this.$store.dispatch('app/showToast', response.data.message)
              this.$router.push({ name: 'users' })
            }
          }).catch((error) => {
            this.isLoading = false
            this.$store.dispatch('app/showError', { message: error.response.data.message, error: '' } )
          })

        } else {

          BackendApi.post('/user', payload).then((response) => {
            if (response.data.success) {
              this.isLoading = false
              this.$store.dispatch('app/showToast', response.data.message)
              this.$refs.dialogPassword.open(response.data.data.userPassword)
            }
          }).catch((error) => {
            this.isLoading = false
            this.$store.dispatch('app/showError', { message: 'No se pudo crear el usuario', error: '' } )
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
          console.log(error)
        })
    },
    getProviders () {
      BackendApi.get('/provider').then((response) => {
        if (response.data.success) {
          this.providers = response.data.data
        }
      })
    },
    onChangeServicesCheck(services) {
      this.services = services
    }
  }
}
</script>
