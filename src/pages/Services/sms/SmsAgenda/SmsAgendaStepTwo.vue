<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center pb-3">
      <div>
        <div class="display-1">SMS Agenda</div>
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
      :messageExample="messageExample"
      :registers="$store.state.sms.file.rows"
      :is-excel="true"
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
        { text: 'NOMBRE1', value: 'name1' }, 
        { text: 'NOMBRE2', value: 'name2' }, 
        { text: 'APELLIDO1', value: 'last_name1' }, 
        { text: 'APELLIDO2', value: 'last_name2' }, 
        { text: 'EMAIL', value: 'email' }, 
        { text: 'VAR1', value: 'var1' }, 
        { text: 'VAR2', value: 'var2' }, 
        { text: 'VAR3', value: 'var3' }, 
        { text: 'VAR4', value: 'var4' }
      ],
      optionsShow: false,
      errors : {
        scheduled:'',
        message:''
      },
      headers: [
        { text: 'Número', value: 'number' },
        { text: 'Nombre 1', value: 'name1' },
        { text: 'Nombre 2', value: 'name2' },
        { text: 'Email+', value: 'email' },
        { text: 'Apellido 1', value: 'last_name1' },
        { text: 'Apellido 2', value: 'last_name2' },
        { text: 'VAR1', value: 'var1' },
        { text: 'VAR2', value: 'var2' },
        { text: 'VAR3', value: 'var3' },
        { text: 'VAR4', value: 'var4' }
      ],
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
    onChangeMessage(msg, msgExample, url_id, long_url) {
      this.message = msg
      this.messageExample = msgExample
      this.url_id = url_id
      this.long_url = long_url
    },
    async submit() {

      if (this.$refs.form.validate()) {
        this.optionsShow = true
      }
    }
  }
}
</script>
