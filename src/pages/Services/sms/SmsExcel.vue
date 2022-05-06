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
            :error-messages="isValidName"
            :rules="[v=>!!v || 'El nombre es obligatorio']"
            outlined
            required
          />
          
          <v-file-input
            v-model="file"
            label="Cargue su base de contactos"
            :loading="isFileLoading"
            outlined
            :rules="[v=>!!v || 'Seleccione excel']"
            :error-messages="isValidFile"
            required
            @change="onChangeExcel"
          />
          <!-- aqui es donde van los ejemplos -->
          <v-col
            v-if="showExample && !isValidFile"
            class="pt-0"
          >
            <p>Ejemplos:</p>
            <v-data-table
              :headers="headers"
              :items="excelExample"
              :items-per-page="5"
              class="elevation-1"
            >
              
            </v-data-table>
          </v-col>

          <!--    <InputFileDragAndDrop 
            :dialog="true"
          /> -->

          <Message-Input-Component 
            :agenda="false"
            :excel="true"
            :errors="errors"
            @onChangeMessage="onChangeMessage"
          />

          <Options-Component
            :errors="errors"
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
      :isExcel="true"
      :exampleContact="exampleExelComputed"
      :isBtnLoading="isBtnLoading"
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
// import InputFileDragAndDrop  from '@/components/common/InputFileDragAndDrop.vue'

export default {
  components: {
    OptionsComponent,
    MessageInputComponent,
    BackPage,
    DownloadBottonComponent,
    PreviewSmsComponent
    // InputFileDragAndDrop
  },
  data() {
    return {
      errors : {
        name:'',
        scheduled:'',
        message:'',
        file:''
      },
      headers: [
        { text: 'Número', value: 'CELULAR' },
        { text: 'VAR 1', value: 'VAR1' },
        { text: 'VAR 2', value: 'VAR2' },
        { text: 'VAR 3', value: 'VAR3' },
        { text: 'VAR 4', value: 'VAR4' },
        { text: 'VAR 5', value: 'VAR5' },
        { text: 'VAR 6', value: 'VAR6' },
        { text: 'VAR 7', value: 'VAR7' },
        { text: 'VAR 8', value: 'VAR8' }
      ],
      excelExample: [],
      rows: 0,
      name: '',
      file: null,
      message: '',
      url_id: '',
      long_url: '',
      options: {
        is_push: false,
        scheduled: null,
        bidireccional: false
      },
      isFileLoading: false,
      errorMessageFile: null,
      fileId: null,
      creditToUse : 0,
      availableCredit : 0,
      isBtnLoading: true

    }
  },
  computed: {
    showExample: function () {

      return this.excelExample.length !== 0
    },
    exampleExelComputed: function () {

      return this.excelExample
    },
    isValidName: function () {

      return this.errors.name === undefined ? '' : this.errors.name[0]
    },
    isValidFile: function () {

      return this.errors.file === undefined ? '' : this.errors.file[0]
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
    async availableCreditByUser() {

      await this.calculateCreditToUse()

      BackendApi.get('/creditsUsedByUser').then((response) => {
        if (response.data.success) {
          this.availableCredit = response.data.data.availableCredit
          this.isBtnLoading = false
        }
      })
    },
    onChangeOptions(options) {
      this.options = options
    },
    errorFile (text) {
      this.isFileLoading = false
      this.errors.file = [text]
    },
    onChangeExcel(file) {
      
      if (file) {
      
        this.isFileLoading = true
    
        if (file.name.split('.').pop() === 'xlsx' || file.name.split('.').pop() === 'xls') {

          const formData = new FormData()

          formData.append('file', file)

          BackendApi.post('/sms/upload/excelcampaing', formData)
            .then((response) => {
              console.log(response)
              if (response.data.success) {
                this.fileId = response.data.data.id
                this.excelExample = response.data.data.example
                this.rows = response.data.data.rows
                this.destinatarios = this.fileUploaded
                this.errorFile(null)
                this.errors = {
                  name:'',
                  scheduled:'',
                  message:'',
                  file:''
                }
              } else {
                this.errorFile(response.data.message)
              }
              this.isFileLoading = false
            })
            .catch ( (error) => {
              this.fileId = null
              this.errors = error.response.data.errors
            })
        } else {
          console.log('error')
          this.errorFile('No es un archivo Excel')
        }
      }
    },
    async submit() {

      if (this.$refs.form.validate()) {
        await this.availableCreditByUser()
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
        url_id: this.url_id,
        options: this.options,
        long_url: this.long_url
      }

      BackendApi.post('/campaign', payload)
        .then((response) => {
          if (response.data.success) {
            this.$store.dispatch('app/showToast', response.data.message)
            this.$router.push({ name: 'reports' })

          }
        })
        .catch( (error) => {

          this.$store.dispatch('app/showToast', 'No se pudo enviar la campaña, revise los datos ingresados')
          this.errors = error.response.data.errors
        } )
    },
    onChangeMessage(msg, url_id, long_url) {
      this.message = msg
      this.url_id = url_id
      this.long_url = long_url
    }
  }
}
</script>
