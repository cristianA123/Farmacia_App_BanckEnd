<template>
  <v-dialog v-model="dialog" width="600">
    <v-card>
      <v-form
        ref="formNewContact"
        lazy-validation
        @submit.prevent="save()"
      >

        <v-card-title class="pa-2">
          Importar contactos
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-file-input
            v-model="file"
            label="Adjunte Excel de contactos"
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

export default {
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
    save() {
      if (this.$refs.formNewContact.validate()) {
        const FormData = new FormData()

        FormData.append('file', this.file)

        BackendApi.post('/contactUpload/' + this.$route.params.agendaId, FormData)

        this.close()  
      }
    }
  }
}
</script>
