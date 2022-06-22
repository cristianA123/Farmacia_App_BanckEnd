<template>
  <!--- Dialog Preview SMS --->
  <v-dialog
    v-model="show"
    width="800px"
  >
    <v-card>
      <v-card-title>
        Resumen de campaña:
        <v-spacer></v-spacer>
        <v-btn text @click="show=false">X</v-btn>
      </v-card-title>
      <v-card-text>
        <v-row
          align="center"
          justify="center"
        > 
          <v-col
            class="mt-0 pt-0"
            sm="4"
          >
            <div 
              style="background-image: url(https://cdn.discordapp.com/attachments/783095481227935744/984913157703225354/sms_preview.png); 
              width: 250px; 
              height: 430px; 
              background-size: 100%;"
            >
              <div style="padding: 5px 25px; 25px  25px;"><div><span id="span_sms_text" style="background-color: rgb(230, 230, 235);text-align: left;padding: 5px 7px;margin: 100px 25px 25px 20px;border-radius: 10px;float: left;white-space: pre-wrap;font-size: 12px;color: black;">{{ messageExample }} </span></div></div>
            </div>
          </v-col>

          <v-col
            class="mt-0 pt-0"
            sm="8"
          >
            <v-card
              outlined
              color="#385F73"
              dark
              width="500px"
            >
              <v-card-text>
                <span><strong>Opciones activadas</strong></span>
                <v-divider></v-divider>
                <table>
                  <tr>
                    <td>Bidireccional:</td>
                    <td>
                      <v-icon v-if="options.is_bidireccional">mdi-check</v-icon>
                      <span v-else>NO</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="width:150px;">Push:</td>
                    <td>
                      <v-icon v-if="options.is_push">mdi-check</v-icon>
                      <span v-else>NO</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Agendado:</td>
                    <td>
                      <span v-if="options.scheduled !== null">{{ scheduled }}</span>
                      <span v-else>NO</span>
                    </td>
                  </tr>
                </table>
                <br>
                <span><strong>Pre-filtro excel</strong></span>
                <v-divider></v-divider>
                <table>
                  <tr>
                    <td style="width:350px;">Cantidad de registros:</td>
                    <td>
                      
                      <span>{{ fileData.rows | formatCurrency(configFormat) }}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="width:350px;">Números con formato inválido:</td>
                    <td>
                      
                      <span>2</span>
                    </td>
                  </tr>
                </table>
                <table>
                  <tr>
                    <td style="width:350px;">Mensajes con más de 160 caracteres:</td>
                    <td>
                      
                      <span>106</span>
                    </td>
                  </tr>
                </table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

      </v-card-text>
      <v-card-actions>
        <v-col
          class="mt-0 pt-0"
        >
          <v-row
            justify="center"
          >
            <v-btn
              color="green"
              dark
              :loading="isBtnLoading"
              @click="submit"
            >
              <v-icon
                right
                class="mr-1"
              >
                mdi-send-outline
              </v-icon>
              Lanzar campaña
            </v-btn>
          </v-row>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'
import 'moment/locale/es'

export default {
  props: {
    fileData: {
      type: Object,
      default: () => {}
    },  
    options: {
      type: Object,
      default: () => {}
    },
    messageExample: {
      type: String,
      default: ''
    },
    creditToUse: {
      type: Number,
      default: 0
    },
    availableCredit : {
      type : Number,
      default: 0
    },
    isBtnLoading : {
      type : Boolean,
      default: true
    },
    exampleContact : {
      type : Array,
      default: () => []
    },
    isExcel : {
      type : Boolean,
      default: false
    }

  },
  data() {
    return {
      show: false,
      data_key_agenda: [
        { key:'[NOMBRE 1]', value:'name1' },
        { key:'[NOMBRE 2]', value:'name2' },
        { key:'[APELLIDO 1]', value:'last_name1' },
        { key:'[APELLIDO 2]', value:'last_name2' },
        { key:'[EMAIL]', value:'email' },
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
      ]
    }
  },
  computed: {
    configFormat: function () {
      return {
        decimalDigits: 0,
        decimalSeparator: '.',
        thousandsSeparator: ',',
        currencySymbol: '',
        currencySymbolNumberOfSpaces: 0,
        currencySymbolPosition: 'left'
      }
    },
    scheduled: function () {
      const a = moment(this.options.scheduled).format('lll')

      return a
    }
  },
  methods: {
    open() {
      this.show = true
      // this.isloading = true
    },
    close() {
      this.show = false
    },
    submit() {
      this.close()
      this.$emit('onPreviewSmsSubmit')
    }
  }
}
</script>

<style>

.phone_preview {
  background-image: url("/images/services/sms_preview.png"); 
  width: 250px; 
  height: 430px; 
  background-size: 100%;
}
</style>