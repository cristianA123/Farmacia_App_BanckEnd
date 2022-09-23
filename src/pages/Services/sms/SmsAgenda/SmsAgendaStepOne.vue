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
            @change="onChangeAgenda"  
          />
        </v-card-text>
        <br>

        <v-card-actions>
          <v-row
            justify="center"
          >
            <v-btn
              class="my-2"
              color="primary"
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
      </v-card>

    </v-form>

  </div>
</template>

<script>
import BackendApi from '@/services/backend.service'
import BackPage from '@/components/common/BackPage.vue'

export default {
  components: {
    BackPage
  },
  data() {
    return {
      errors : {
        name:''
      },
      name: '',
      options: {},
      agendas: [],
      agendaSelected: null,
      isLoading: true
    }
  },
  computed: {
    showExample: function () {
      return this.exampleContact.length !== 0
    },
    exampleContactComputed: function () {
      return this.exampleContact
    },
    isValidName: function () {
      return this.errors.name === undefined ? '' : this.errors.name[0] 
    }
  },
  created() {
    this.getAgendas()
  },
  methods: {
    getAgendas() {
      BackendApi.get('/agenda').then((response) => {
        if (response.data.success) {
          this.agendas = response.data.data
        }
      })
    },
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
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('name', this.name)
        this.$router.push({ name: 'sms-agenda-step-two' })
      }
    },
    onChangeAgenda() {
      //Traer ejemplo y cantidad de contactos
      const payload = {
        agenda_id : this.agendaSelected
      }

      BackendApi.post('/showContactExample', payload).then((response) => {
        if (response.data.success) {
          this.$store.dispatch('fileData', response.data.data )
        }
      }).catch((error) => {
        this.$store.dispatch('app/showToast', error.response.data.message)
      })

    }
  }
}
</script>
