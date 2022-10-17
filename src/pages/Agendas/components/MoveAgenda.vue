<template>
  <v-dialog
    v-model="dialog"
    width="600px"
  >
    <v-card>
      <v-card-title>
        Seleccione agenda
      </v-card-title>
      <v-card-text>
        <v-radio-group v-model="selectedNewAgenda">
          <v-radio
            v-for="agenda in agendas"
            :key="agenda.id"
            :label="`${agenda.name}: ${agenda.all_contacts}`"
            :value="agenda.id"
          ></v-radio>
        </v-radio-group>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
        >
          Cerrar
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          text
          @click="moveAgenda"
        >
          Mover
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import BackendApi from '@/services/backend.service'

export default {
  data() {
    return {
      dialog: false,
      selectedNewAgenda: null,
      agendas: []
    }
  },
  methods: {
    open() {
      this.getAgendas()
      this.dialog = true
    },
    close() {
      this.dialog = false
      this.selectedNewAgenda = null
    },
    getAgendas() {
      BackendApi.get('/agenda').then((response) => {
        if (response.data.success) {

          this.agendas = response.data.data
        } else {
          this.$store.dispatch('app/showToast', response.data.message)
        }
      }).catch((error) => {
      })
    },
    moveAgenda() {
      this.$emit('onMoveAgenda', this.selectedNewAgenda)
      this.close()
    }
  }
}
</script>
