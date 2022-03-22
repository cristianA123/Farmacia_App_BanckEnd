<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center pb-3">
      <div>
        <div class="display-1">Enviar SMS a una base de contactos Excel</div>
      </div>
      <v-spacer></v-spacer>
      <BackPage 
        to="create-campaing-sms"
      />
    </div>

    <v-card>
      <v-card-text>
        <v-row>
          <v-col>
            <v-icon>mdi-cloud-download-outline</v-icon>
            <v-btn  
              text
              @click="downloadFile"
            >
              Descargar formato Excel
            </v-btn>
          </v-col>
        </v-row>
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
        >
          
        </v-file-input>
        <Message-Input-Component 
          :buttons="true"
          @onChangeMessage="(msg) => message = msg"
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
import MessageInputComponent from './components/MessageInputComponent.vue'
import BackPage from '@/components/common/BackPage.vue'

export default {
  components: {
    OptionsComponent,
    MessageInputComponent,
    BackPage
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

          BackendApi.post('/upload/ExcelCampaing', formData).then((response) => {
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
    submit() {
      const payload = {
        service_id: 1,
        campaign_type_id: 3,
        name: this.name,
        destinations: this.fileId,
        message: this.message,
        url_id: null,
        options: this.options
      }

      BackendApi.post('/campaign', payload).then((response) => {
        if (response.data.success) {
          this.$store.dispatch('app/showToast', response.data.message)
        }
      })
    },
    downloadFile () {
      window.open('https://appenviamas.com/files/FormatoExcelSmsAvanzado.xlsx', '_blank').focus()
    }
  }
}
</script>
