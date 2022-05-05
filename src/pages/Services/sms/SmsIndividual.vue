<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center pb-3">
      <div>
        <div class="display-1">Enviar SMS Individual</div>
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
      >
        <v-card-text>

          <Input-Individual-Phones 
            @onInputNewIndividualPhone="onInputNewIndividualPhone"
          />
          
          <MessageInputComponent 
            :agenda="false"
            :excel="false"
            :backendErrors="backendErrors"
            @onChangeMessage="onChangeMessage"
          />
          
          <Options-Component 
            :backendErrors="backendErrors"
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
      :isBtnLoading="isBtnLoading"
      :availableCredit="availableCredit"
      @onPreviewSmsSubmit="PreviewSmsSubmit"
    />

  </div>
</template>

<script>
import OptionsComponent from './components/OptionsComponent.vue'
import InputIndividualPhones from '@/components/common/InputIndividualPhones.vue'
import BackendApi from '@/services/backend.service'
import MessageInputComponent from './components/MessageInputComponent.vue'
import BackPage from '@/components/common/BackPage.vue'
import PreviewSmsComponent from './components/PreviewSmsComponent'

export default {
  components: {
    OptionsComponent,
    InputIndividualPhones,
    MessageInputComponent,
    BackPage,
    PreviewSmsComponent
  },
  data() {
    return {
      backendErrors : undefined,
      phones: [957314449],
      dialogPreview: false,
      isLoading: true,
      campaing_type_id: 1,
      url_audio: '',
      message: '',
      url_id: null,
      options: {
        is_push: false,
        scheduled: null,
        bidireccional: false
      },
      creditToUse : undefined,
      availableCredit : 0,
      isBtnLoading: true

    }
  },
  methods: {
    calculateCreditToUse() {
      const payload = {
        message: this.message,
        numberOfContacts: this.phones.length
      }

      BackendApi.post('/calculateMessageCredits', payload)
        .then((response) => {
          if (response.data.success) {
            this.creditToUse = response.data.data.creditsToUse

            return true
          }
        })
        .catch((error) => {
          this.backendErrors = error.response.data.errors
          console.log('salio el error')
          console.log(error)

          return false
        })
    },
    availableCreditByUser() {
      BackendApi.get('/creditsUsedByUser').then((response) => {
        if (response.data.success) {
          this.availableCredit = response.data.data.availableCredit
          this.isBtnLoading = false

        }
      })
    },
    async submit() {
      if (this.$refs.form.validate()) {
        const a = await this.calculateCreditToUse()

        console.log(a)
        console.log('aaaaa')
        console.log(this.creditToUse)
        console.log(typeof (this.creditToUse))
          
        await this.availableCreditByUser()
        this.$refs.dialogPreview.open()
      }
    },
    onChangeOptions(options) {
      this.options = options
    },
    onChangeMessage(message) {
      this.message = message
    },
    onInputNewIndividualPhone(phones) {
      this.phones = phones
    },
    PreviewSmsSubmit() {
      const payload = {
        service_id: 1,
        campaign_type_id: 1,
        name: 'Individual',
        destinations: this.phones,
        message: this.message,
        url_id: null,
        options: this.options
      }

      BackendApi.post('/campaign', payload)
        .then((response) => {
          if (response.data.success) {
            this.$store.dispatch('app/showToast', response.data.message)
            this.$router.push({ name:  'reports' })
          }
        })
        .catch((error) => {
          this.backendErrors = error.response.data.errors
          console.log('salio el error')
          console.log(error)
        })
    }
  }
}
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>