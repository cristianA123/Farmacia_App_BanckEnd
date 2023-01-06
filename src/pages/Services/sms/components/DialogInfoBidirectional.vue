<template>
  <v-dialog v-model="dialog" width="600" persistent>
    <v-card
    >
      <v-form
        ref="formNewUrl"
        lazy-validation
        @submit.prevent="save()"
      >
        <v-card-title>
          ¡Importante!
        </v-card-title>
        <v-card-text>
          <h4>La función "Bidireccional" permite recibir respuestas SMS a los mensajes enviados en su campaña. Cada mensaje recibido se contabilizará como 01 crédito.</h4>
        </v-card-text>
  
        <v-card-actions class="pa-2">
          <v-spacer></v-spacer>
          <v-btn text color="primary" type="submit">Aceptar</v-btn>
        </v-card-actions>
  
      </v-form>
    </v-card>
  </v-dialog>
</template>
  
<script>
  
export default {
  data () {
    return {
      dialog: false
    }
  },

  mounted() {
  },
  methods: {
    open() {
      this.dialog = true
    },
    close() {
      this.dialog = false
    },
    save() {
      this.close()
    }
  }
}
</script>
