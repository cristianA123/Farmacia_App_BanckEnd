<template>
  <v-dialog v-model="dialog" width="600">
    <v-card>
      <v-form
        ref="formNewContact"
        lazy-validation
        @submit.prevent="submit()"
      >

        <v-card-title class="pa-2">
          Importar contactos
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <DownloadBottonComponent 
            path="/files/contactos_agenda.xlsx"
          />
          <v-file-input
            v-model="file"
            label="Adjunte Excel de contactos"
            outlined
          />
        </v-card-text>

        <v-card-actions class="pa-2">
          <v-btn outlined @click="close">Cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" type="submit">Importar</v-btn>
        </v-card-actions>
        
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import BackendApi from '@/services/backend.service'
import DownloadBottonComponent from '@/components/common/DownloadBottonComponent.vue'

export default {
  components: {
    DownloadBottonComponent
  },
  data () {
    return {
      file: null,
      dialog: false
    }
  },
  methods: {
    open () {
      this.dialog = true
    },
    close() {
      this.dialog = false
    },
    submit() {
      if (this.$refs.formNewContact.validate()) {
        const payload = new FormData()

        payload.append('file', this.file)

        BackendApi.post('/agenda/' + this.$route.params.agendaId + '/contactUpload', payload).then((response) => {

          if (response.data.success) {
            this.$store.dispatch('app/showToast', response.data.message)
          }
        })

        this.close()  
      }
    }
  }
}
</script>
