<template>
  <v-dialog v-model="dialog" width="600">
    <v-card>
      <v-form
        ref="formNewAgenda"
        lazy-validation
        @submit.prevent="save()"
      >

        <v-card-title class="pa-2">
          {{ isEdit ? 'Modificar agenda' : 'Crear agenda' }}
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <!-- task form -->
        <div>
          <v-text-field
            v-model="name"
            class="px-2 py-1"
            solo
            flat
            placeholder="Nombre"
            :error-messages="isValidName"
            autofocus
            required
          ></v-text-field>

          <v-divider></v-divider>
        </div>

        <v-divider></v-divider>

        <v-card-actions class="pa-2">
          <v-btn outlined @click="close">Cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn 
            color="primary" 
            type="submit"
            :loading="isLoadingAgenda"
          >Guardar</v-btn>
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
      backendErrors:{
        name:''
      },
      dialog: false,
      name: '',
      agenda: null,
      isLoadingAgenda: false
    }
  },
  computed: {
    isEdit: function () {

      return this.agenda === undefined ? false : true
    },
    isValidName: function () {
      return this.backendErrors.name === undefined ? '' : this.backendErrors.name
    }
  },
  methods: {
    open(agenda) {
      this.agenda = agenda
      if (this.isEdit) {
        this.name = agenda.name
      } else {
        this.name = ''
      }
      
      this.dialog = true
    },
    close() {
      this.dialog = false
      this.isLoadingAgenda = false
    },
    save() {
      if (this.$refs.formNewAgenda.validate()) {
        this.isLoadingAgenda = true
        if (this.isEdit) {
          const payload = {
            name: this.name
          }

          BackendApi.put('/agenda/' + this.agenda.id, payload).then((response) => {
            if (response.data.success) {
              this.$store.dispatch('app/showToast', 'Agenda actualizada exitosamente')
              this.$emit('onCreatedAgenda')
              this.close()
            }
          }).catch((error) => {
            this.backendErrors = error.response.data.errors
            this.isLoadingAgenda = false
          })
        } else {
          const payload = {
            name: this.name
          }

          BackendApi.post('/agenda', payload, { headers: { 'Authorization': 'Bearer ' + window.localStorage.token } })
            .then((response) => {
              if (response.data.success) {
                this.$store.dispatch('app/showToast', 'Agenda creada exitosamente')
                this.$emit('onCreatedAgenda')
                this.close()
              }
            })
            .catch ( (error) => {
              this.isLoadingAgenda = false
              this.backendErrors = error.response.data.errors
            })
        }
      }
    }
  }
}
</script>
