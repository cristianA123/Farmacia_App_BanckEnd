<template>
  <v-row justify="center">
    <v-dialog
      v-model="show"
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
            <span class="text-h5">Subir archivo a cloud</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="name"
                    label="Nombre de archivo"
                    :rules="[v => !!v || 'Nombre es obligatorio']"
                    required
                  ></v-text-field>
                  <v-file-input
                    v-model="file"
                    label="Nombre de archivo"
                    :rules="[v => !!v || 'El archivo es obligatorio']"
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
import axios from 'axios'

export default {
  props: {
    show: {
      type: Boolean
    }
  },
  data: () => ({
    isLoading: false,
    name: '',
    file: null
  }),
  methods: {
    close () {
      this.$emit('onClose')
    }, 
    submit () {
      if (this.$refs.formUploadFile.validate()) {
        this.isLoading = true

        const formData = new FormData()

        formData.append('file', this.file)
        formData.append('name', this.name)

        axios.post('/createFile', formData, { headers: { 'Authorization': 'Bearer ' + window.localStorage.token } }).then((response) => {
          console.log(response)
          if (response.data.success) {
            this.close()
          }
          this.isLoading = false
        })
      }
    }
  }
}
</script>
