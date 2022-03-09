<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Enviar SMS a una agenda de contactos</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
      <v-spacer></v-spacer>
    </div>

    <v-card>
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
          :buttons="true"
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

    </v-card>

  </div>
</template>

<script>
import OptionsComponent from './components/OptionsComponent.vue'
import BackendApi from '@/services/backend.service'
import MessageInputComponent from './components/MessageInputComponent.vue'

export default {
  components: {
    OptionsComponent,
    MessageInputComponent
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
      }]
    }
  },
  created() {
    this.getAgendas()
  },
  methods: {
    submit() {
      const payload = {
        campaing_type_id: 2,
        name: 'Agenda de contactos',
        destinations: this.agendaSelected,
        message: this.message,
        url_id: null,
        options: this.options
      }

      BackendApi.post('/campaing', payload).then((response) => {
        console.log(response)
        if (response.data.success) {
          this.$store.dispatch('app/showToast', response.data.message)
        }
      })
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
    }
  }
}
</script>
