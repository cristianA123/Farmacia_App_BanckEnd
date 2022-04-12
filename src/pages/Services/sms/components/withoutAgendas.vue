<template>
  <v-dialog
    v-model="dialog"
    max-width="600px"
    persistent
  >
    <v-card
      color="warning"
    >
      <v-card-title>Necesita crear una agenda</v-card-title>
      <v-card-text>
        <v-row
          align="center"
          justify="center"
        >
          <v-icon
            x-large
          >
            mdi-alert-outline
          </v-icon>
        </v-row>

        <p>
          Aún no cuentas con agendas, te dirigiremos al módulo de <strong> <v-icon>mdi-contacts</v-icon> Agendas</strong>  y luego regresas a este punto.
        </p>
        
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="$router.push({ name: 'create-campaing-sms' })">Regresar</v-btn>
        <v-spacer></v-spacer>
        <v-btn text @click="goToAgendas()">Ir a Agendas</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    open () {
      this.dialog = true
    },
    goToAgendas() {
      this.$router.push({ name: 'agendas' })
    }
  }
}
</script>