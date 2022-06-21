<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center pb-3">
      <div>
        <div class="display-1">SMS Excel</div>
      </div>
      <v-spacer></v-spacer>

      <v-spacer></v-spacer>
      <BackPage 
        to="services"
      />
    </div>

    <v-form
      ref="form"
      lazy-validation
      @submit.prevent="submit"
    >

      <v-card-text>
        <v-card
          outlined
        >
          <v-card-text>
            <v-col
              class="pt-0"
            >
              <v-data-table
                :headers="headers"
                :items="$store.state.sms.file.example"
                :items-per-page="5"
                hide-default-footer
              >
                
              </v-data-table>
            </v-col>

            <Message-Input-Component 
              :agenda="false"
              :excel="true"
              :errors="errors"
              @onChangeMessage="onChangeMessage"
            />
          </v-card-text>

          <v-card-actions>
            <v-row
              justify="center"
            >
              <v-btn
                color="primary"
                dark
                type="submit"
              >
                Siguiente
                <v-icon>
                  mdi-chevron-right
                </v-icon>
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-card-text>

      <template>
        <div class="text-center">
          <v-bottom-sheet 
            v-model="optionsShow"
            inset
          >
            
            <Options-Component
              class="ml-3"
              :errors="errors"
              @onChange="onChangeOptions"
              @onSubmit="openPreviewComponent"
            />
            
          </v-bottom-sheet>
        </div>
      </template>

    </v-form>
    <PreviewSmsComponent
      ref="dialogPreview"
      :options="options" 
      :message="message"
      :file-data="$store.state.sms.file"
      :is-excel="true"
      :example-contact="exampleExelComputed"
      :is-btn-loading="isBtnLoading"
      :credit-to-use="creditToUse"
      :available-credit="availableCredit"
      @onPreviewSmsSubmit="PreviewSmsSubmit"
    />

  </div>
</template>

<script>
import OptionsComponent from '../components/OptionsComponent.vue'
import BackendApi from '@/services/backend.service'
import MessageInputComponent from '../components/MessageInputComponent.vue'
import BackPage from '@/components/common/BackPage.vue'
import PreviewSmsComponent from '../components/PreviewSmsComponent'
// import InputFileDragAndDrop  from '@/components/common/InputFileDragAndDrop.vue'

export default {
  components: {
    OptionsComponent,
    MessageInputComponent,
    BackPage,
    PreviewSmsComponent
    // InputFileDragAndDrop
  },
  data() {
    return {
      optionsShow: false,
      errors : {
        scheduled:'',
        message:''
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
              this.isFileLoading = false
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
        this.optionsShow = true
      }
    },
    async openPreviewComponent() {
      await this.availableCreditByUser()
      this.optionsShow = false
      this.$refs.dialogPreview.open()
    },
    PreviewSmsSubmit() {
      const payload = {
        service_id: 1,
        campaign_type_id: 3,
        name: this.$store.state.sms.name,
        destinations: this.$store.state.sms.file.id,
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
