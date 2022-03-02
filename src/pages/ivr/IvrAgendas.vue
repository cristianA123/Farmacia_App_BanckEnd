<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Enviar IVR a una agenda de contactos</div>
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

        <Audio-File-Component
          @onChangeFile="onChangeFile"
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
import AudioFileComponent from './components/AudioFileComponent.vue'

export default {
  components: {
    OptionsComponent,
    AudioFileComponent
  },
  data() {
    return {
      name: '',
      agendas: [],
      agendaSelected: null,
      message: '',
      url_audio: '',
      file_id: null
    }
  },
  created() {
    this.getAgendas()
  },
  methods: {
    submit() {
      const payload = {
        campaing_type_id: 2,
        name: this.name,
        destinations: this.agendaSelected,
        message: this.message,
        url_id: this.file_id,
        options: this.options
      }

      BackendApi.post('/ivr/campaign', payload).then((response) => {
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
    },
    onChangeFile(audio) {
      this.url_audio = audio.url_audio,
      this.file_id = audio.file_id
    }
  }
}
</script>
