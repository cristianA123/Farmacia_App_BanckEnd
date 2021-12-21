<template>
  <div class="my-2">
    <div>
      <v-card v-if="user.status !== 1 && mode !== 'create'" class="warning mb-4" light>
        <v-card-title>Usuario deshabilitado</v-card-title>
        <v-card-subtitle>¡Este usuario ha sido deshabilitado! Se revocaron los accesos de inicio de sesión.</v-card-subtitle>
        <v-card-text>
          <v-btn dark @click="enableUser()">
            <v-icon left small>mdi-account-check</v-icon>Habilitar usuario
          </v-btn>
        </v-card-text>
      </v-card>

      <v-card :loading="isLoading" :disabled="isLoading">
        <v-card-title>Información básica</v-card-title>
        <v-card-text>
          <div class="d-flex flex-column flex-sm-row">
            <div>
              <v-img
                :src="user.avatar"
                aspect-ratio="1"
                class="blue-grey lighten-4 rounded elevation-3"
                max-width="90"
                max-height="90"
              ></v-img>
              <v-btn class="mt-1" small>Editar avatar</v-btn>
            </div>
            <div class="flex-grow-1 pt-2 pa-sm-2">
              <v-form
                @submit.prevent="submit()"
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <v-text-field 
                  v-model="user.name" 
                  :error-messages="errors.name"
                  label="Nombre" 
                  placeholder="name"
                  :rules="[v => !!v || 'Nombre es obligatorio']"
                />
                <v-text-field 
                  v-model="user.company" 
                  :error-messages="errors.company"
                  label="Empresa" 
                  placeholder="name"
                  :rules="[v => !!v || 'Empresa es obligatorio']"
                />
                <v-text-field 
                  v-model="user.email" 
                  :error-messages="errors.email"
                  label="Email" 
                  :rules="[
                    v => !!v || 'Email es obligatorio',
                    v => /.+@.+\..+/.test(v) || 'Email no es válido'
                  ]"
                />
                <v-slider
                  v-model="user.start_credit"
                  label="Créditos"
                  class="align-center"
                  :max="maxCredits"
                  :min="minCredits"
                  hide-details
                >
                  <template v-slot:append>
                    <v-text-field
                      v-model="user.start_credit"
                      class="mt-0 pt-0"
                      hide-details
                      single-line
                      type="number"
                      style="width: 200px"
                    ></v-text-field>
                  </template>
                </v-slider>
                <br>
                <div class="d-flex">
                  <v-spacer></v-spacer>
                  <v-btn 
                    color="primary"
                    type="submit"
                    :loading="isLoading"
                  >
                    {{ mode === 'create' ? "Crear" : "Editar"}} 
                  </v-btn>
                </div>

              </v-form>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <v-expansion-panels v-if="$store.state.users.userRegistrationMode !== 'create'" v-model="panel" multiple class="mt-3">
        <v-expansion-panel>
          <v-expansion-panel-header class="title">Contraseña de acceso</v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="mb-2">
              <div class="title">Restablecer contraseña</div>
              <div class="subtitle mb-2">Puede restablecer una nueva contraseña que el sistema generará de manera segura, tenga en cuenta que si reestablece una nueva contraseña la contraseña actual dejará de funcionar.</div>
              <v-btn
                class="mb-2"
                @click
              >
                <v-icon left small>mdi-email</v-icon>Restablecer y enviar email
              </v-btn>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="title">Metadata</v-expansion-panel-header>
          <v-expansion-panel-content class="body-2">
            <span class="font-weight-bold">Creado:</span>
            {{ user.created_at | formatDate('lll') }}
            <br />
            <span class="font-weight-bold">Último inicio de sesión:</span>
            {{ user.lastSignIn | formatDate('lll') }}
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="title">API</v-expansion-panel-header>
          <v-expansion-panel-content>
            <pre class="body-2">{{ user }}</pre>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
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
    
    <!----- Snackbar  -->
    <template>
      <div class="text-center ma-2">
        <v-snackbar
          v-model="snackbar"
        >
          {{ textSnackbar }}

          <template v-slot:action="{ attrs }">
            <v-btn
              color="pink"
              text
              v-bind="attrs"
              @click="snackbar = false"
            >
              Cerrar
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </template>

    <!-- delete modal -->
    <v-dialog v-model="dialogPassword" max-width="600">
      <v-card>
        <v-card-title class="headline">Contraseña generada por el sistem</v-card-title>
        <v-card-text>
          <copy-label :text="password" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialogPassword = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import CopyLabel from '../../../components/common/CopyLabel'
import axios from 'axios'
import headers from '@/configs/headers.js'

export default {
  components: {
    CopyLabel
  },
  props: {
    user: {
      type: Object,
      default: () => ({})
    },
    mode: {
      default: () => ({})
    }
  },
  mounted() {
    this.startCredit = this.user.start_credit
  },
  data() {
    return {
      dialogPassword: false,
      password: 'asdasdas',
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
      startCredit: 0
    }
  },
  computed: {
    maxCredits : function () {
      const maxCredits = this.startCredit + parseInt(this.$store.state.credits.availableCredits)

      return maxCredits
    },
    minCredits : function () {
      const { balance, sms_out, sms_in, ivr, whatsapp } = this.user

      const minCredits = parseInt(balance) +  parseInt(sms_out) +  parseInt(whatsapp) +  parseInt(sms_in) +  parseInt(ivr) +  parseInt(whatsapp)

      return minCredits
    }
  },
  methods : {
    submit () { 
      if (this.$refs.form.validate()) {
        this.isLoading = true

        if (this.mode === 'create') {
        
          axios.post('/createUserBasicInformation', this.user, headers)
            .then((response) => {
              if (response.data.success) {
                this.snackbar = true
                this.textSnackbar = response.data.message
                this.errors = {}
                this.dialogPassword = true
                this.password = response.data.password

                console.log(response.data.password)

              } else {
                this.snackbar = true
                this.textSnackbar = 'Error al crear el usuario'
                this.errors = response.data.errors
              }
              this.isLoading = false
            })
            .catch((error) => {
              this.isLoading = false
              console.log(error)
            })
        } else {

          const config = {
            headers: { Authorization: `Bearer ${localStorage.token}` }
          }

          const payload = {
            user_id_update: this.user.id,
            status: this.user.status,
            name: this.user.name,
            email: this.user.email,
            company: this.user.company,
            start_credits: this.user.start_credit,
            route_name: this.user.route_name
          }

          axios.post('/updateUserBasicInformation', payload, { headers: { 'Authorization': 'Bearer ' + window.localStorage.token } })
            .then((response) => {
              if (response.data.success) {
                this.snackbar = true
                this.textSnackbar = response.data.message
              } else {
                this.snackbar = true
                this.textSnackbar = 'Error al actualizar el usuario'
              }
              this.isLoading = false
              console.log(response.data)
            })
            .catch((error) => {
              this.isLoading = false
              console.log(error)
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
    }
  }
}
</script>
