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
              :is-agenda="false"
              :example-item="$store.state.sms.file.example"
              :errors="errors"
              :vars="vars"
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
      :data-campaing="dataCampaing"
      :message-example="messageExample"
      :is-excel="true"
      :is-btn-loading="isBtnLoading"
      @onPreviewSmsSubmit="PreviewSmsSubmit"
    />
    <!-- :registers="$store.state.sms.file.rows" -->
    <!-- :necessary-credit="necessaryCredit" -->
    <!-- :available-credit="availableCredit" -->
    <!-- :valid-numbers="validNumbers" -->

  </div>
</template>

<script>
import OptionsComponent from '../components/OptionsComponent.vue'
import BackendApi from '@/services/backend.service'
import MessageInputComponent from '../components/MessageInputComponent.vue'
import BackPage from '@/components/common/BackPage.vue'
import PreviewSmsComponent from '../components/PreviewSmsComponent'

export default {
  components: {
    OptionsComponent,
    MessageInputComponent,
    BackPage,
    PreviewSmsComponent
  },
  data() {
    return {
      vars: [
        { text: 'VAR1', value: 'VAR1' }, 
        { text: 'VAR2', value: 'VAR2' }, 
        { text: 'VAR3', value: 'VAR3' }, 
        { text: 'VAR4', value: 'VAR4' }, 
        { text: 'VAR5', value: 'VAR5' }, 
        { text: 'VAR6', value: 'VAR6' }, 
        { text: 'VAR7', value: 'VAR7' }, 
        { text: 'VAR8', value: 'VAR8' }
      ],
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
      messageExample: '',
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
      dataCampaing: {},
      // necessaryCredit : 0,
      // availableCredit : 0,
      // registers: 0,
      // validNumbers: 0,
      // messages_160_letters: 0,
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
  mounted() {
    this.fileExist()
  },
  methods: {
    fileExist() {
      if (!this.$store.state.sms.file?.id) {
        this.$router.push({ name: 'sms-excel' })
      }
    },
    async availableCreditByUser() {

      console.log(this.$store.state.sms.file?.id)

      const payload = {
        message: this.message,
        sms_excel_id: this.$store.state.sms.file?.id
      }

      console.log(payload)

      BackendApi.post('/calculateMessageCreditsSmsExcel', payload).then((response) => {
        if (response.data.success) {
          console.log(response.data.data)
          this.dataCampaing = response.data.data
          this.isBtnLoading = false
          // this.necessaryCredit = response.data.data.necessary_credit
          // this.availableCredit = response.data.data.availableCredit
          // this.registers = response.data.data.rows
          // this.messages_160_letters = response.data.data.messages_160_letters
          // this.validNumbers = response.data.data.valid_number
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
    submit() {

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
      if ($cookies.get('user').channel_id) {
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
          
      } else {
        const badRequest = {
          error :{
            message:  'No se puede crear campaña con este usuario comuniquese con el administrador.'
          }
        }

        this.$store.dispatch('app/showError', badRequest)
      }
    },
    onChangeMessage(msg, msgExample, url_id, long_url) {
      this.message = msg
      this.messageExample = msgExample
      this.url_id = url_id
      this.long_url = long_url
    }
  }
}
</script>
