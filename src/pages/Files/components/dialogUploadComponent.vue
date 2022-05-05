<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-form
        ref="form"
        lazzy-validation
        @submit.prevent="submit"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ isEdit ? 'Modificar archivo' : 'Crear archivo' }}  </span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="name"
                    label="Nombre de archivo"
                    :rules="[v => !!v || 'Nombre es obligatorio']"
                    :error-messages="isValidName"
                    outlined
                    required
                  ></v-text-field>
                  
                  <div
                    v-if="isEdit"
                  >
                    <v-switch
                      v-model="isEditFile"
                      label="Modificar archivo"
                    />

                    <v-file-input
                      v-if="isEditFile"
                      v-model="file"
                      label="Nombre de archivo"
                      :rules="[v => !!v || 'El archivo es obligatorio']"
                      :error-messages="isValidFile"
                      outlined
                      required
                    /> 

                    <v-img
                      v-else
                      :src="long_url"
                      height="194"
                    />

                  </div>

                  <v-file-input
                    v-if="!isEdit"
                    v-model="file"
                    label="Nombre de archivo"
                    :rules="[v => !!v || 'El archivo es obligatorio']"
                    :error-messages="isValidFile"
                    outlined
                    required
                  /> 
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
              Subir
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
import BackendApi from '@/services/backend.service'

export default {
  data() {
    return {
      backendErrors: {
        name:'',
        file:''
      },
      isEditFile: false,
      dialog: false,
      item: null,
      isLoading: false,
      name: '',
      file: null,
      long_url: null
    }
  },
  computed: {
    isEdit: function () {
      return this.item === undefined ? false : true
    },
    isValidName () {
      return this.backendErrors.name === undefined ? '' : this.backendErrors.name[0]
    },
    isValidFile () {
      return this.backendErrors.file === undefined ? '' : this.backendErrors.file[0]
    }

  },
  methods: {
    open(item) {
      this.item = item

      if (this.isEdit) {
        this.name = item.name
        this.file = item.file
        this.long_url = item.long_url
      } else {
        this.name = null
        this.file = null
        this.long_url = null
      }

      this.dialog = true
    },
    close () {
      this.$refs.form.reset()
      this.isLoading = false
      this.$emit('onDialogUploadFinish')
      this.dialog = false
                    
    }, 
    submit () {

      if (this.$refs.form.validate()) {

        this.isLoading = true
        const formData = new FormData()

        if (this.file) {
          formData.append('file', this.file)
        }

        formData.append('name', this.name)

        if (this.isEdit) {
          BackendApi.post('/bucket/' + this.item.id, formData)
            .then((response) => {
              if (response.data.success) {
                this.close()
              }
            })
            .catch( (error) => {
              this.backendErrors = error.response.data.errors
              
              this.isLoading = false

            })
        } else {
          BackendApi.post('/uploadFile', formData)
            .then((response) => {

              if (response.data.success) {
                const { long_url, id } = response.data.data

                this.close()

                /*BackendApi.post('/createUrlByFile', { long_url: long_url, file_id: id }).then((response) => {
                  
                })  */
              }
            })
            .catch( (error) => {
              this.backendErrors = error.response.data.errors
              this.isLoading = false

            })
        }

      }
    }
  }
}
</script>
