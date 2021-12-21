<template>
  <div class="flex-grow-1">
    <v-card class="my-2">
      <v-card-title>Configuración de servicios</v-card-title>
      <v-card-text>
        <v-form
          @submit.prevent="submit()"
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-row>
            <v-col
              class="pb-0 mb-0"
            >
              <v-checkbox
                v-model="user.service_sms"
                label="SMS"
              ></v-checkbox>
            </v-col>
            <v-col
              class="pb-0 mb-0"
            >
              <v-select
                v-model="user.route_id"
                :items="providers"
                item-text="name"
                item-value="id"
                :loading="isLoadingProviders"
                label="Ruta"
                color="red"
                :rules="[v => !!v || 'Ruta es obligatorio']"
                append-icon="mdi-call-split"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              class="py-0 my-0"
            >
              <v-checkbox
                v-model="user.service_ivr"
                label="IVR"
              ></v-checkbox>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              class="pt-0 mt-0"
            >
              <v-checkbox
                v-model="user.service_whatsapp"
                label="WHATSAPP"
              ></v-checkbox>
            </v-col>
          </v-row>
          
          <div class="d-flex">
            <v-spacer></v-spacer>
            <v-btn color="primary" type="submit">Guardar</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
    <v-card class="my-2">
      <v-card-title>Configuración de apariencia</v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col>
              <v-text-field
                label="Footer"
              ></v-text-field>
              <v-file-input
                accept="image/*"
                label="Logo"
              ></v-file-input>
            </v-col>
            <v-col>
              <v-card
                width="200px"
                height="200px"
              >
                
              </v-card>
            </v-col>
          </v-row>
          
          <div class="d-flex">
            <v-spacer></v-spacer>
            <v-btn color="primary">Guardar</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>

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
  </div>
</template>

<script>
import axios from 'axios'

export default {
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
    this.getProviders()
  },
  data: () => ({
    providers: [],
    isLoadingProviders: false,
    snackbar: false,
    textSnackbar: null,
    valid: true,
    test: true,
    date: '1990-10-09',
    menu: false,
    gender: 'male'
  }),
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    save (date) {
      this.$refs.menu.save(date)
    },
    submit () {
      if (this.$refs.form.validate()) {
        this.isLoading = true

        if (this.mode === 'create') {
          console.log('holis')
        } else {

          const payload = {
            user_id_update: this.user.id,
            sms: this.user.service_sms,
            ivr: this.user.service_ivr,
            whatsapp: this.user.service_whatsapp,
            route_id: this.user.route_id
          }

          axios.post('/updateUserServices', payload, { headers: { 'Authorization': 'Bearer ' + window.localStorage.token } })
            .then((response) => {
              console.log(response)
              if (response.data.success) {
                this.snackbar = true
                this.textSnackbar = response.data.message
              } else {
                this.snackbar = true
                this.textSnackbar = 'Error al actualizar el usuario'
              }
              this.isLoading = false
            })
            .catch((error) => {
              this.isLoading = false
              console.log(error)
            })
        }
      }
    },
    getProviders () {
      this.isLoadingProviders = true
      
      axios.get('/getRoutes', { headers: { Authorization: 'Bearer ' + window.localStorage.token } }).then((response) => {
        const providers = response.data.data
        
        this.providers = providers
        this.isLoadingProviders = false
      }).catch((error) => {
        this.isLoadingProviders = false
        console.log(error)
      })
    }
  }
}
</script>
