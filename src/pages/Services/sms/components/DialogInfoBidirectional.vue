<template>
  <v-dialog v-model="dialog" width="600" persistent>
    <v-card>
      <v-form
        ref="formNewUrl"
        lazy-validation
        @submit.prevent="save()"
      >
  
        <v-card-title class="pa-2">
          Bidireccional
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
  
        <v-card-text>
          <p>Activar la función bidireccional te permite recibir respuestas de tus mensajes, estos serán contabilizados en tu cuenta.</p>
        </v-card-text>
  
        <v-card-actions class="pa-2">
          <v-spacer></v-spacer>
          <v-btn color="primary" type="submit">Aceptar</v-btn>
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
