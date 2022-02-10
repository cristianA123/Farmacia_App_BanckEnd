<template>
  <div>

    <v-btn
    
      v-for="button in vars"
      :key="button.id"
      class="primary mx-1"
      @click="addVarOnMessage(button)"
    >
      {{ button }}
    </v-btn>
    <br>
    <br>
    <v-textarea
      v-model="message"
      label="Escriba el mensaje a enviar"
      :messages="computedCounterMessage"
      :rules="[v=>!!v || 'Escriba el mensaje a enviar, puede utilizar los botones para el uso de Variables']"
      outlined
      @keyup="tranforMessageForSms"
    />
  </div>
</template>  

<script>
import SmsCounter from 'sms-counter'

export default {
  props: {
    buttons: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      vars: ['NOMBRE 1', 'NOMBRE 2', 'APELLIDO 1', 'APELLIDO 2', 'VAR1', 'VAR2', 'VAR3', 'VAR4'],
      message: ''
    }
  },
  computed: {
    computedCounterMessage () {
      const countCharacters = SmsCounter.count(this.message).remaining
      const countCredits = SmsCounter.count(this.message).messages

      return  '[' + countCharacters + ' Restantes / ' + countCredits + ' Crédito]'
    }
  },
  methods: {
    tranforMessageForSms () {
      const string = this.message
      let estandarText = ''
      const filtro = '@$ !#\'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZ¿abcdefghijklmnopqrstuvwxyz{}[]áéíóú\'ñ'
      
      for (let i = 0; i < string.length; i++) {
        if (filtro.indexOf(string.charAt(i)) !== -1) {
          estandarText += string.charAt(i)
        }
      }

      const filtroCorreción = 'áéíóú\'ñ'

      for (let i = 0; i < estandarText.length; i++) {
        filtroCorreción.indexOf(estandarText.charAt(i)) !== -1
      }

      estandarText = estandarText.replace('á', 'a')
      estandarText = estandarText.replace('é', 'e')
      estandarText = estandarText.replace('í', 'i')
      estandarText = estandarText.replace('ó', 'o')
      estandarText = estandarText.replace('ú', 'u')
      estandarText = estandarText.replace('Á', 'A')
      estandarText = estandarText.replace('É', 'E')
      estandarText = estandarText.replace('Í', 'I')
      estandarText = estandarText.replace('Ó', 'O')
      estandarText = estandarText.replace('Ú', 'U')
      estandarText = estandarText.replace('Ñ', 'N')

      this.message = estandarText
      this.$emit('onChangeMessage', this.message)
    }
  }
}
</script>
