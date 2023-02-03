<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center pb-3">
      <div>
        <div class="display-1">Enviar SMS Individual</div>
      </div>
      <v-spacer></v-spacer>
      <div>
        <BackPage 
          to="services"
        />
      </div>
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
          <Input-Individual-Phones 
            @onInputNewIndividualPhone="onInputNewIndividualPhone"
          />

          <MessageInputComponent 
            :agenda="false"
            :excel="false"
            :errors="errors"
            @onChangeMessage="onChangeMessage"
          />
        </v-card-text>
        <br>

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
    </v-form>

    <PreviewSmsComponent
      ref="dialogPreview"
      :options="options" 
      :message-example="messageExample"
      :data-campaing="dataCampaing"
      :is-excel="false"
      :is-btn-loading="isBtnLoading"
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
    PreviewSmsComponent,
    OptionsComponent,
    InputIndividualPhones,
    MessageInputComponent,
    BackPage
  },
  data() {
    return {
      messageExample: '',
      optionsShow: false,
      errors : undefined,
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
      isBtnLoading: true,
      dataCampaing: {}

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
          this.errors = error.response.data.errors
          console.log('salio el error')
          console.log(error)

          return false
        })
    },
    availableCreditByUser() {

      const payload = {
        message: this.message,
        phones: this.phones
      }

      BackendApi.post('/calculateMessageCreditsSmsIndividual', payload).then((response) => {
        if (response.data.success) {
          this.dataCampaing = response.data.data
          this.isBtnLoading = false
        }
      })
    },
    async submit() {
      if (this.$refs.form.validate()) {
        this.optionsShow = true
      }
    },
    onChangeOptions(options) {
      this.options = options
    },
    onChangeMessage(msg, msgExample, url_id, long_url) {
      this.message = msg
      this.messageExample = msgExample
      this.url_id = url_id
      this.long_url = long_url
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
        long_url: this.long_url,
        options: this.options
      }

      BackendApi.post('/campaign', payload)
        .then((response) => {
          if (response.data.success) {
            this.$store.dispatch('app/showSuccess', response.data.message)
            this.$router.push({ name:  'reports' })
          }
        })
        .catch((error) => {
          this.errors = error.response.data.errors
          console.log( error.response.data)
          const badRequest = {
            error :{
              message:  error.response.data.message
            }
          }
          
          this.$store.dispatch('app/showError', badRequest)
          console.log('salio el error')
          console.log(error)
        })
    },
    async openPreviewComponent() {
      await this.availableCreditByUser()
      this.optionsShow = false
      this.$refs.dialogPreview.open()
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