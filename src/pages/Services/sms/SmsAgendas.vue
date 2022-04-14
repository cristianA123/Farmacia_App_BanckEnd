<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center pb-3">
      <div>
        <div class="display-1">Enviar SMS a una agenda de contactos</div>
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
          <v-text-field
            v-model="name"
            label="Ingrese nombre de campaña"
            prepend-icon="mdi-tag-text-outline"
            outlined
          />
          <v-select
            v-model="agendaSelected"
            label="Seleccione una nueva agenda"
            :items="agendas"
            item-text="name"
            item-value="id"
            prepend-icon="mdi-contacts-outline"
            outlined
          />

          <Message-Input-Component
            :agenda="true"
            :excel="false"
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
            @click="submit"
          >
            Enviar mensaje
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
import PreviewSmsComponent from './components/PreviewSmsComponent.vue'

export default {
  components: {
    OptionsComponent,
    MessageInputComponent,
    BackPage,
    PreviewSmsComponent
  },
  data() {
    return {
      agendas: [],
      agendaSelected: null,
      message: '',
      breadcrumbs: [{
        text: 'Servicios',
        disabled: false,
        to: '/services'
      },
      {
        text: 'SMS',
        disabled: false,
        to: '/sms/create_campaing/'
      },
      {
        text: 'Agenda',
        disabled: true,
        to: '/sms/create_campaing/sms_agenda'
      }],
      creditToUse : 0,
      availableCredit : 0,
      numberOfContacts:0
    }
  },
  created() {
    this.getAgendas()
  },
  methods: {
    calculateCreditToUse() {

      this.agendas.map( (agenda) => {
        if (agenda.id === this.agendaSelected) {
          this.numberOfContacts = agenda.all_contacts

          return agenda.all_contacts
        } else {
          return null
        } 

      })

      const payload = {
        message: this.message,
        numberOfContacts: this.numberOfContacts 
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
    submit() {
      /*
      const payload = {
        service_id: 1,
        campaign_type_id: 2,
        name: 'Agenda de contactos',
        destinations: this.agendaSelected,
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
    getAgendas() {
      BackendApi.get('/agenda').then((response) => {
        if (response.data.success) {
          this.agendas = response.data.data
          console.log(this.agendas)
        }
      })
    },
    onChangeOptions(options) {
      this.options = options
    },
    PreviewSmsSubmit() {
      const payload = {
        service_id: 1,
        campaign_type_id: 2,
        name: this.name,
        destinations: this.agendaSelected,
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
