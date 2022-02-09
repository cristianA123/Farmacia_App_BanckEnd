<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Enviar SMS a una base de contactos Excel</div>
      </div>
      <v-spacer></v-spacer>
    </div>

    <v-card>
      <v-card-text>

        <v-file-input
          v-model="file"
          label="Cargue su base de contactos"
          outlined
        >
          
        </v-file-input>
        <v-textarea
          v-model="message"
          label="Escriba el mensaje a enviar"
          outlined
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

export default {
  components: {
    OptionsComponent
  },
  data() {
    return {
      file: null,
      agendas: [],
      message: '',
      options: null
    }
  },
  methods: {
    submit() {
      const payload = new FormData()

      payload.append('campaing_type_id', 3)
      payload.append('name', 'Envío por Excel')
      payload.append('destinations', this.file)
      payload.append('message', this.message)
      payload.append('url_id', null)
      payload.append('options', this.options)

      BackendApi.post('/campaing', payload).then((response) => {
        if (response.data.success) {
          this.$store.dispatch('app/showToast', response.data.message)
        }
      })

    },
    onChangeOptions(options) {
      this.options = options
    }
  }
}
</script>
