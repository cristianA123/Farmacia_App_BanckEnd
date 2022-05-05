<template>
  <div>

    <div class="row ml-3">
      <div
        v-if="agenda"
      >
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
      </div>
      <div
        v-if="excel"
        class="ml-3"
      >
        <v-btn
          v-for="button in vars_excel"
          :key="button.id"
          class="primary mx-1"
          @click="addVarOnMessage(button)"
        >
          {{ button }}
        </v-btn>
        <br>
        <br>
      </div>
      <v-menu v-if="excel != agenda" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            URL
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="chooseUrl(index)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <v-textarea
      v-model="message"
      label="Escriba el mensaje a enviar"
      :error-messages="isValidMessage"
      :rules="[v=>!!v || 'Escriba el mensaje a enviar, puede utilizar los botones para el uso de Variables']"
      :messages="computedCounterMessage"
      prepend-icon="mdi-message-text-outline"
      outlined
    />

    <Dialog-Url
      ref="DialogUrl"
      @onChooseUrl="onChooseUrl"
      @onMakeUrl="onMakeUrl"
    />
   
  </div>
</template>  

<script>
import SmsCounter from 'sms-counter'
import DialogUrl from './DialogUrl.vue'

export default {
  components: {
    DialogUrl
  },
  props: {
    agenda: {
      type: Boolean,
      default: false
    },
    excel: {
      type: Boolean,
      default: false
    },
    backendErrors: {
      type: Object,
      default: () => ({ message:'' })
    }
  },
  data() {
    return {
      items: [
        { title: 'Elegir url' },
        { title: 'Url personalizado' }
      ],
      vars: ['NOMBRE 1', 'NOMBRE 2','EMAIL', 'APELLIDO 1', 'APELLIDO 2', 'VAR1', 'VAR2', 'VAR3', 'VAR4'],
      vars_excel: ['VAR1', 'VAR2', 'VAR3', 'VAR4','VAR5', 'VAR6', 'VAR7', 'VAR8'],
      message: '',
      url_id: '',
      long_url: ''
    }
  },
  computed: {
    computedCounterMessage () {
      const countCharacters = SmsCounter.count(this.message).remaining
      const countCredits = SmsCounter.count(this.message).messages

      return  '[' + countCharacters + ' Restantes / ' + countCredits + ' Crédito]'
    },
    isValidMessage: function () {
      return this.backendErrors.message === undefined ? '' : this.backendErrors.message[0] 
    }
  },
  watch: {
    message: function () {
      
      this.tranforMessageForSms()
    }
  },
  mounted() {
    console.log(this.buttons)
  },
  methods: {
    changetest() {
      console.log('change')
    },
    tranforMessageForSms () {
      const string = this.message
      let estandarText = ''
      const filtro = '_@$ !#\'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZ¿abcdefghijklmnopqrstuvwxyz{}[]áéíóú\'ñ'
      
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
      this.$emit('onChangeMessage', this.message, this.url_id, this.long_url)
    },
    addVarOnMessage (text) {
      this.message = this.message + ' [' + text + '] '
    },
    chooseUrl(url) {
      this.$refs.DialogUrl.open(url)
    },
    onChooseUrl(url, url_id) {
      this.url_id = url_id
      this.message = this.message + ' ' + url + ' '
    },
    onMakeUrl(url, url_id,long_url) {
      this.long_url = long_url
      this.message = this.message + ' [' + 'CUSTOM_URL' + '] '
    }
  }
}
</script>
