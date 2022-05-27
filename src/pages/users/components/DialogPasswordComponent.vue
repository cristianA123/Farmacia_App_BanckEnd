<template>
  <v-dialog
    v-model="dialog"
    width="600px"
    persistent
  >
    <v-card>
      <v-card-title>
        Contraseña generada
      </v-card-title>
      <v-card-text>
        <p>Usuario: {{ email }}</p>
        <p>Contraseña: {{ password }}</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          @click="onOk"
        >
          Ok
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      email: '',
      password: ''
    }
  },
  methods: {
    open(email, password) {
      this.dialog = true
      this.password = password
      this.email = email
    },
    onOk() {
      this.$emit('onOk')
    },
    doCopy(text) {
      this.$copyText(text).then((e) => {
        console.log(e)
      })
    }
  }
}
</script>