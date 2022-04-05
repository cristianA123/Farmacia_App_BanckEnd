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
      <v-form
        ref="form"
        lazy-validation
        @submit.prevent="submit"
      >
        <v-card-text>
          <DownloadBottonComponent
            path="/files/sms_campaing.xlsx"
          />

          <v-text-field
            v-model="name"
            label="Ingrese nombre de campaña"
            prepend-icon="mdi-tag-text-outline"
            :rules="[v=>!!v || 'El nombre es obligatorio']"
            outlined
            required
          />
          
          <v-file-input
            v-model="file"
            label="Cargue su base de contactos"
            :loading="isFileLoading"
            outlined
            :rules="[v=>!!v || 'El nombre es obligatorio']"
            :error-messages="errorMessageFile"
            required
            @change="onChangeExcel"
          />

          <InputFileDragAndDrop 
            :dialog="true"
          />

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
            type="submit"
          >
            Siguiente paso
          </v-btn>
        </v-card-actions>
      </v-form>

    </v-card>

    <PreviewSmsComponent
      ref="dialogPreview"
      :options="options" 
      :message="message"
      :creditToUse="creditToUse"
      :availableCredit="availableCredit"
      @onPreviewSmsSubmit="PreviewSmsSubmit"
    />

  </div>
</template>

<script>
import OptionsComponent from './components/OptionsComponent.vue'
import BackendApi from '@/services/backend.service'
import MessageInputComponent from './components/MessageInputComponent.vue'
import BackPage from '@/components/common/BackPage.vue'
import DownloadBottonComponent from '@/components/common/DownloadBottonComponent.vue'
import PreviewSmsComponent from './components/PreviewSmsComponent'
import InputFileDragAndDrop  from '@/components/common/InputFileDragAndDrop.vue'

export default {
  components: {
    OptionsComponent,
    MessageInputComponent,
    BackPage,
    DownloadBottonComponent,
    PreviewSmsComponent,
    InputFileDragAndDrop
  },
  data() {
    return {
      rows: 0,
      name: '',
      file: null,
      message: '',
      options: {
        is_push: false,
        scheduled: null,
        bidireccional: false
      },
      isFileLoading: false,
      errorMessageFile: null,
      fileId: null,
      itemsExample: null,
      creditToUse : 0,
      availableCredit : 0
    }
  },
  methods: {
    calculateCreditToUse() {
      const payload = {
        message: this.message,
        numberOfContacts: this.rows
      }

      BackendApi.post('/calculateMessageCredits', payload).then((response) => {
        if (response.data.success) {
          this.creditToUse = response.data.data.creditsToUse
        }
      })
    },
    availableCreditByUser() {
      BackendApi.get('/creditsUsedByUser').then((response) => {
        if (response.data.success) {
          this.availableCredit = response.data.data.availableCredit
        }
      })
    },
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

          BackendApi.post('/sms/upload/excelcampaing', formData).then((response) => {
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
      /*
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
      })*/
      if (this.$refs.form.validate()) {
        this.calculateCreditToUse()
        this.availableCreditByUser()
        this.$refs.dialogPreview.open()
      }
    },
    PreviewSmsSubmit() {
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
    }
  }
}
</script>
