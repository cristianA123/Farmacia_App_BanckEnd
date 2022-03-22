<template>
  <v-file-input
    v-model="file"
    label="Cargue su audio"
    :loading="isFileLoading"
    outlined
    :error-messages="errorMessageFile"
    @change="onChangeFile"
  />
</template>

<script>
import BackendApi from '@/services/backend.service'

export default {
  data() {
    return {
      file: null,
      errorMessageFile: '',
      isFileLoading: false
    }
  },
  methods: {
    onChangeFile(file) {
      if (file) {
        this.isFileLoading = true
    
        if (file.name.split('.').pop() === 'mp3') {

          const formData = new FormData()

          formData.append('file', file)

          BackendApi.post('/upload/audio', formData).then((response) => {
            if (response.data.success) {
              this.$emit('onChangeFile', {
                file_id: response.data.data.id,
                url_audio: response.data.data.name
              })
              
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
    errorFile (text) {
      this.isFileLoading = false
      this.errorMessageFile = text
    }
  }
}
</script>