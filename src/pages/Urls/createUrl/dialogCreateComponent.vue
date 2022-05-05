<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-form
        ref="formUploadFile"
        lazzy-validation
        @submit.prevent="submit"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ isEdit ? "Editar url corta" : "Crear url corta" }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="name"
                    label="Nombre de la URL"
                    :error-messages="isValidName"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="url"
                    type="url"
                    label="Url"
                    :error-messages="isValidUrl"
                    required
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
              @click="close()"
            >
              Cerrar
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              type="submit"
              :loading="isLoading"
            >
              {{ isEdit ? "Editar" : "Crear" }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios'
import headers from '@/configs/headers.js'
import BackendApi from '@/services/backend.service'

export default {
  props: {
  },
  data: () => ({
    backendErrors: {
      long_url:'',
      name:''
    },
    isLoading: false,
    item : null,
    name : '',
    url: '',
    dialog: false
  }),
  computed: {
    isEdit: function () {
      return this.item === undefined ? false : true
    },
    isValidName: function () {
      return this.backendErrors.name === undefined ? '' : this.backendErrors.name[0]
    },
    isValidUrl: function () {
      return this.backendErrors.long_url === undefined ? '' : this.backendErrors.long_url[0]
    }
  },
  methods: {
    open(item) {
      this.item = item
      console.log(this.item)
      if ( this.isEdit ) {
        this.name = item.name
        this.url = item.long_url
      } else {
        this.name = null
        this.url = null
      }
      this.dialog = true
    },
    close () {
      this.$refs.formUploadFile.reset()
      this.isLoading = false
      this.dialog = false
      this.$emit('onDialogCreateFinish')
    }, 
    async submit () {
      if (this.$refs.formUploadFile.validate()) {
        this.isLoading = true
        const payload = {
          name: this.name,
          long_url: this.url
        }
  
        if ( !this.isEdit ) {
          await BackendApi.post('/url', payload)
            .then((response) => {
              if (response.data.success) {
                this.close()
                this.$store.dispatch('app/showToast', response.data.message)
              }
            })
            .catch( (error) => {
              this.backendErrors = error.response.data.errors
              this.isLoading = false
            } )
        } else {
  
          BackendApi.put('/url/' + this.item.id, payload)
            .then((response) => {
              if (response.data.success) {
                this.close()
                this.$store.dispatch('app/showToast', response.data.message)
              }
            })
            .catch( (error) => {
              this.backendErrors = error.response.data.errors
              this.isLoading = false
            } )
        }
      }
    }
  }
}
</script>
