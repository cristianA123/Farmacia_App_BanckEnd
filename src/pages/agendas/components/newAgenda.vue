<template>
  <v-dialog v-model="dialog" width="600">
    <v-card>
      <v-form
        @submit.prevent="save()"
        ref="formNewAgenda"
        lazy-validation
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
            autofocus
            :rules='[v=>!!v || "El nombre es obligatorio"]'
            required
          ></v-text-field>

          <v-divider></v-divider>
        </div>

        <v-divider></v-divider>

        <v-card-actions class="pa-2">
          <v-btn outlined @click="close">Cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" type="submit">Guardar</v-btn>
        </v-card-actions>

      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      dialog: false,
      name: '',
      agenda: null
    }
  },
  computed: {
    isEdit: function () {

      return this.agenda === undefined ? false : true
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
    },
    save() {
      if (this.$refs.formNewAgenda.validate()) {
        if (this.isEdit) {
          const payload = {
            name: this.name,
            agenda_id: this.agenda.id
          }

          axios.post('/updateAgenda', payload, { headers: { 'Authorization': 'Bearer ' + window.localStorage.token } }).then((response) => {
            if (response.data.success) {
              this.$store.dispatch('app/showToast', 'Agenda actualizada exitosamente')
              this.$emit('onCreated')
            } else {
              this.$store.dispatch('app/showToast', response.data.message)
            }
          })
        } else {
          const payload = {
            name: this.name
          }

          axios.post('/createAgenda', payload, { headers: { 'Authorization': 'Bearer ' + window.localStorage.token } }).then((response) => {
            if (response.data.success) {
              this.$store.dispatch('app/showToast', 'Agenda creada exitosamente')
              this.$emit('onCreated')
            } else {
              this.$store.dispatch('app/showToast', response.data.message)
            }
          })
        }

        this.close()
      }
    }
  }
}
</script>
