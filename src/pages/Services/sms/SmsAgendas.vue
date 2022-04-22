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
            @change="cambio"  
          />
          <!-- aqui es donde van los ejemplos -->
          <v-col
            v-if="showExample"
            class="pt-0"
          >
            <p>Ejemplos:</p>
            <v-data-table
              :headers="headers"
              :items="exampleContact"
              :items-per-page="5"
              class="elevation-1"
            ></v-data-table>
          </v-col>

          <Message-Input-Component
            :agenda="true"
            :excel="false"
            @onChangeMessage="onChangeMessage"
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
      headers: [
        { text: 'Número', value: 'number' },
        { text: 'Primer nombre', value: 'name1' },
        { text: 'Segundo nombre', value: 'name2' },
        { text: 'Primer Apellido', value: 'last_name1' },
        { text: 'Segundo Apellido', value: 'last_name2' },
        { text: 'Email', value: 'email' },
        { text: 'VAR 1', value: 'var1' },
        { text: 'VAR 2', value: 'var2' },
        { text: 'VAR 3', value: 'var3' },
        { text: 'VAR 4', value: 'var4' }
      ],
      exampleContact : [],
      agendas: [],
      agendaSelected: null,
      message: '',
      url_id: '',
      long_url: '',
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
      numberOfContacts:0,
      isBtnLoading: true
    }
  },
  computed: {
    showExample: function () {
      return this.exampleContact.length !== 0
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
    async availableCreditByUser() {

      await this.calculateCreditToUse()

      BackendApi.get('/creditsUsedByUser').then((response) => {
        if (response.data.success) {
          this.availableCredit = response.data.data.availableCredit
          this.isBtnLoading = false
        }
      })
    },
    async submit() {
      if (this.$refs.form.validate()) {
        await this.availableCreditByUser()

        this.$refs.dialogPreview.open()
      }
    },
    getAgendas() {
      BackendApi.get('/agenda').then((response) => {
        if (response.data.success) {
          this.agendas = response.data.data
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
        url_id: this.url_id,
        options: this.options,
        long_url: this.long_url
      }

      BackendApi.post('/campaign', payload).then((response) => {
        if (response.data.success) {
          this.$store.dispatch('app/showToast', response.data.message)
        }
        this.$router.push({ name: 'create-campaing-sms' })
      })
      // this.$refs.form.reset()
    },
    onChangeMessage(msg, url_id, long_url) {
      this.message = msg
      this.url_id = url_id
      this.long_url = long_url
    },
    cambio() {

      const payload = {
        agenda_id : this.agendaSelected
      }

      BackendApi.post('/showContactExample',payload).then((response) => {
        if (response.data.success) {
          this.exampleContact = response.data.data
        }
      }).catch((error) => {
        this.$store.dispatch('app/showToast', error.response.data.message)
      })

    }
   
  }
}
</script>
