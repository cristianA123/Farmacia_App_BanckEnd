<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center pb-3">
      <div>
        <div class="display-1">Enviar SMS a una agenda de contactos</div>
      </div>
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
        <v-card-title>Mensaje</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="name"
            label="Ingrese nombre de campaña"
            prepend-icon="mdi-tag-text-outline"
            :error-messages="isValidName"
            :rules="[
              v => !!v || 'Ingrese nombre de campaña'
            ]"
            required
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
            :rules="[
              v => !!v || 'Seleccione agenda'
            ]"
            required
            @change="cambio"  
          />
          <!-- aqui es donde van los ejemplos -->
          <!-- <v-col
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
            :errors="errors"
            @onChangeMessage="onChangeMessage"
          /> -->
        </v-card-text>
      </v-card>

      <br>
      
      <!-- <Options-Component 
        :errors="errors"
        @onChange="onChangeOptions"
      /> -->

      <v-card-actions>
        <v-row
          justify="center"
        >
          <v-btn
            class="my-2"
            color="green"
            dark
            @click="submit"
          >
            <v-icon>
              mdi-chevron-right
            </v-icon>
            Siguiente paso
          </v-btn>
        </v-row>
      </v-card-actions>
    </v-form>

    <!-- <PreviewSmsComponent
      ref="dialogPreview"
      :options="options" 
      :message="message"
      :example-contact="exampleContactComputed"
      :is-btn-loading="isBtnLoading"
      :credit-to-use="creditToUse"
      :available-credit="availableCredit"
      @onPreviewSmsSubmit="PreviewSmsSubmit"
    /> -->

  </div>
</template>

<script>
import OptionsComponent from './components/OptionsComponent.vue'
// import OptionsComponent from './../components/OptionsComponent.vue'
import BackendApi from '@/services/backend.service'
import MessageInputComponent from './../components/MessageInputComponent.vue'
import BackPage from '@/components/common/BackPage.vue'
import PreviewSmsComponent from './../components/PreviewSmsComponent.vue'
import moment from 'moment'
import 'moment/locale/es'

export default {
  components: {
    // OptionsComponent,
    // MessageInputComponent,
    BackPage
    // PreviewSmsComponent
  },
  data() {
    return {
      errors : {
        name:'',
        scheduled:'',
        message:''
      },
      name: '',
      options: {},
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
    },
    exampleContactComputed: function () {
      return this.exampleContact
    },
    horaIs: function () {

      const horaNowMasTwoMinute = moment().add(2, 'm').format('HH:mm')
      // const defaultDateMoreTwoMinute = moment().add(2, 'm').format('YYYY-MM-DD HH:mm:ss')
      const defaultDateMoreTwoMinute = moment().format('ll')

      return defaultDateMoreTwoMinute
    },
    isValidName: function () {
      return this.errors.name === undefined ? '' : this.errors.name[0] 
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

      BackendApi.post('/campaign', payload)
        .then((response) => {
          if (response.data.success) {
            this.$store.dispatch('app/showToast', response.data.message)
          }
          this.$router.push({ name: 'reports' })
        })
        .catch ( (error) => {
          this.errors = error.response.data.errors
        } )
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
