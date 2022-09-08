<template>
  <v-dialog v-model="dialog" width="600">
    <v-card>
      <v-form
        ref="formNewCompany"
        lazy-validation
        @submit.prevent="submit()"
      >

        <v-card-title class="pa-2">
          Crear empresa
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="nameCompany"
            placeholder="Empresa"
            :rules="[v => !!v || 'Nombre de la empresa es obligatorio']"
            outlined
          ></v-text-field>
          <!-- :error-messages="isValidName" -->
          <v-text-field
            v-model="ruc"
            placeholder="RUC"
            :rules="[v => !!v || 'Ruc de la empresa es obligatorio']"
            outlined
          ></v-text-field>
        </v-card-text>

        <v-card-actions class="pa-2">
          <v-btn outlined @click="close">Cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" type="submit">Crear</v-btn>
        </v-card-actions>
        
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>

import BackendApi from '@/services/backend.service'

export default {
  data() {
    return {
      nameCompany: '',
      ruc: '',
      dialog: false
    }
  },
  methods: {
    open () {
      this.dialog = true
    },
    close() {
      this.$refs.formNewCompany.reset()
      this.dialog = false
    },
    submit() {
      if (this.$refs.formNewCompany.validate()) {
        const payload = new FormData()

        payload.append('company', this.nameCompany.toUpperCase())
        payload.append('ruc', this.ruc)

        BackendApi.post('/user/company', payload)
          .then((response) => {
              
            if (response.data.success) {
              this.$store.dispatch('app/showToast', response.data.message)
              this.$emit('onCreatedCompany',response.data.data)
              this.close()  
            }
          })
          .catch ( (error) => {
            // this.backendErrors = error.response.data.errors
            this.$store.dispatch('app/showToast', error.response.data.message)
          })

      }
    }
  }
}
</script>

<style>

</style>
