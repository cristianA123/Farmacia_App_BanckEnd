<template>
  <div>

    <!--Botones-->
    <div class="row ml-3">

      <v-btn
        v-for="button in vars"
        :key="button.id"
        class="primary mx-1"
        @click="addVarOnMessage(button.text)"
      >
        {{ button.text }}
      </v-btn>
      <br>
      <br>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-link-variant</v-icon>
            URL's
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

    <!---Mensaje-->
    <v-textarea
      id="message"
      v-model="message"
      label="Mensaje a enviar"
      placeholder="Ej.: Celebra esta navidad con nuestras ofertas"
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
    isAgenda: {
      type: Boolean,
      default: false
    },
    vars: {
      type: Array,
      default: () => ([])
    },
    errors: {
      type: Object,
      default: () => ({ message:'' })
    },
    exampleItem: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      items: [
        { title: 'Elegir URL' },
        { title: 'URL personalizado' }
      ],
      data_key_agenda: [
        { key:'[NOMBRE 1]', value:'name1' },
        { key:'[NOMBRE 2]', value:'name2' },
        { key:'[APELLIDO 1]', value:'last_name1' },
        { key:'[APELLIDO 2]', value:'last_name2' },
        { key:'[EMAIL]', value:'Email' },
        { key:'[VAR1]', value:'var1' },
        { key:'[VAR2]', value:'var2' },
        { key:'[VAR3]', value:'var3' },
        { key:'[VAR4]', value:'var4' }
      ],
      data_key_excel: [
        { key:'[VAR1]', value:'VAR1' },
        { key:'[VAR2]', value:'VAR2' },
        { key:'[VAR3]', value:'VAR3' },
        { key:'[VAR4]', value:'VAR4' },
        { key:'[VAR5]', value:'VAR5' },
        { key:'[VAR6]', value:'VAR6' },
        { key:'[VAR7]', value:'VAR7' },
        { key:'[VAR8]', value:'VAR8' }
      ],
      message: '',
      messageExample: '',
      url_id: '',
      long_url: ''
    }
  },
  computed: {
    computedCounterMessage () {
      const countCharacters = SmsCounter.count(this.messageExample).remaining
      const countCredits = SmsCounter.count(this.messageExample).messages

      return  '[' + countCharacters + ' Restantes / ' + countCredits + ' Crédito]'
    },
    isValidMessage: function () {
      return this.errors.message === undefined ? '' : this.errors.message[0] 
    }
  },
  watch: {
    message: function () {
      
      if (!this.message.includes('[CUSTOM_URL]')) {
        this.long_url = ''
      }
      
      this.tranforMessageForSms()
    }
  },
  methods: {
    tranforMessageForSms () {

      this.messageExample = this.message

      this.vars.forEach( (element) => {
        this.messageExample = this.messageExample.replace('[' + element.text + ']', this.exampleItem[0][element.value])
      })

      this.messageExample = this.messageExample.replace('[CUSTOM_URL]', process.env.VUE_APP_EXAMPLE_URL_CUT_PE)

      let estandarText = ''
      const filtro = '%_@$ !#\'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÓÚ¿abcdefghijklmnopqrstuvwxyz{}[]áéíóú\'ñ'
      
      for (let i = 0; i < this.message.length; i++) {
        if (filtro.indexOf(this.message.charAt(i)) !== -1) {
          estandarText += this.message.charAt(i)
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
      this.$emit('onChangeMessage', this.message, this.messageExample, this.url_id, this.long_url)
    },
    addVarOnMessage (text) {
      this.message = this.message + '[' + text + ']'
      document.getElementById('message').focus()
    },
    chooseUrl(url) {
      this.$refs.DialogUrl.open(url)
    },
    onChooseUrl(url, url_id) {
      this.url_id = url_id
      this.message = this.message + ' ' + url + ' '
      document.getElementById('message').focus()
    },
    onMakeUrl(url, url_id, long_url) {
      this.long_url = long_url
      this.message = this.message + ' [' + 'CUSTOM_URL' + '] '
      document.getElementById('message').focus()
    }
  }
}
</script>
