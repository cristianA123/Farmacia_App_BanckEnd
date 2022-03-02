<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Enviar IVR a una base de contactos Excel</div>
      </div>
      <v-spacer></v-spacer>
    </div>

    <v-card>
      <v-card-text>
        <v-text-field
          v-model="name"
          label="Ingrese nombre de campaña"
          prepend-icon="mdi-tag-text-outline"
          outlined
        />
        
        <v-file-input
          v-model="file"
          label="Cargue su base de contactos"
          :loading="isFileLoading"
          outlined
          :error-messages="errorMessageFile"
          @change="onChangeExcel"
        />

        <Audio-File-Component
          @onChangeFile="onChangeFile"
        />

        <Options-Component
          @onChange="onChangeOptions"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          @click="submit"
        >
          Enviar mensaje
        </v-btn>
      </v-card-actions>

    </v-card>

  </div>
</template>

<script>
import OptionsComponent from './components/OptionsComponent.vue'
import BackendApi from '@/services/backend.service'
import AudioFileComponent from './components/AudioFileComponent.vue'

export default {
  components: {
    OptionsComponent,
    AudioFileComponent
  },
  data() {
    return {
      name: '',
      file: null,
      message: '',
      options: null,
      isFileLoading: false,
      errorMessageFile: null,
      fileId: null,
      itemsExample: null
    }
  },
  methods: {
    onChangeOptions(options) {
      this.options = options
    },
    errorFile (text) {
      this.isFileLoading = false
      this.errorMessageFile = text
    },
    onChangeExcel(file) {
      if (file) {
        this.isFileLoading = true
    
        if (file.name.split('.').pop() === 'xlsx' || file.name.split('.').pop() === 'xls') {

          const formData = new FormData()

          formData.append('file', file)

          BackendApi.post('/ivr/upload/ExcelCampaign', formData).then((response) => {
            if (response.data.success) {
              this.fileId = response.data.data.id
              this.itemsExample = response.data.data.example
              this.rows = response.data.data.rows
              this.destinatarios = this.fileUploaded
              this.errorFile(null)
            } else {
              this.errorFile(response.data.message)
            }
            this.isFileLoading = false
          })
        } else {
          this.errorFile('No es un archivo Excel')
        }
      }
    },
    onChangeFile(audio) {
      this.url_audio = audio.url_audio,
      this.file_id = audio.file_id
    },
    submit() {
      const payload = {
        campaing_type_id: 3,
        name: this.name,
        destinations: this.fileId,
        message: this.message,
        url_id: null,
        options: this.options
      }

      BackendApi.post('/ivr/campaign', payload).then((response) => {
        if (response.data.success) {
          this.$store.dispatch('app/showToast', response.data.message)
        }
      })
    }
  }
}
</script>
