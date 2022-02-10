<template>
  <div>
    <v-text-field
      v-model="destinatarios"
      label="Ingrese destinatarios (máximo 10 números)"
      maxlength="98"
      counter
      prepend-icon="mdi-tooltip-edit"
      @blur="onBlur()"
      :rules="[v => (v.length >= 9 && v.slice(0,1) === '9') || 'Uno o más números son incorrectos']"
      outlined
    />
    <v-alert
      :value="alert"
      color="warning"
      border="top"
      icon="mdi-alert"
      transition="scale-transition"
    >
      Uno o más teléfonos ingresados son incorrectos
    </v-alert>
  </div>
</template>

<script>

export default ({
  props: {
    'type': { type: Number }
  },
  data () {
    return {
      alert: false,
      destinatarios: '',
      arrayPhones: []
    }
  },
  watch: {
    destinatarios: function () {
      let last = 0
      
      this.destinatarios = this.destinatarios.replace(' ', '') 

      this.arrayPhones = []
      for (let i = 0; i < this.destinatarios.length; i++) {
        const lastPhone = this.destinatarios.slice(last, i + 1)

        if (this.destinatarios.charAt(i) === ',') {
          this.arrayPhones.push(lastPhone)
          last = i + 1
        } else {
          this.arrayPhones.pop()
          this.arrayPhones[this.arrayPhones.length] = lastPhone
        }
      }
    },
    arrayPhones : function () {
      this.arrayPhones.forEach((phone) => {
        if (phone.slice(0,1) !== '9' && phone.length !== 9 && isNaN(phone)) {
          this.alert = true
        } else {
          this.alert = false
        }
      })
      this.$emit('onInputNewIndividualPhone', this.arrayPhones)
    }
  },
  methods: {
    onBlur()  {      
      this.arrayPhones.forEach((phone) => {
        if (phone.slice(0,1) !== '9' && phone.length !== 9 && isNaN(phone)) {
          this.alert = true
        } else {
          this.alert = false
        }
      })

      if (this.destinatarios.charAt(this.destinatarios.length - 1) === ',') {
        this.arrayPhones.pop()
      }
    }
  }
})
</script>
