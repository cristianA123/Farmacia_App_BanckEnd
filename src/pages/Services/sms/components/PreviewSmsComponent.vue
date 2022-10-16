<template>
  <!--- Dialog Preview SMS --->
  <v-dialog
    v-model="show"
    width="800px"
  >
    <v-card
      id="preview-sms-dialog"
    >
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
                <div v-if="isExcel">
                  <span><strong>Pre-filtro</strong></span>
                  <v-divider></v-divider>
                  <table>
                    <tr>
                      <td style="width:350px;">Cantidad de registros:</td>
                      <td>
                        <span>{{ dataCampaing.rows | formatCurrency(configFormat) }}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="width:350px;">Números con formato inválido:</td>
                      <td>
                        
                        <span>{{ dataCampaing.rows - dataCampaing.valid_number | formatCurrency(configFormat) }}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="width:350px;">Mensajes con más de 160 caracteres:</td>
                      <td>
                        
                        <span>{{ dataCampaing.messages_160_letters | formatCurrency(configFormat) }}</span>
                      </td>
                    </tr>
                  </table>
                  <br>
                </div>
                <span><strong>Créditos</strong></span>
                <v-divider></v-divider>
                <table>
                  <tr>
                    <td style="width:350px;">Créditos a consumir:</td>
                    <td>
                      
                      <span>{{ dataCampaing.necessary_credit | formatCurrency(configFormat) }}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="width:350px;">Créditos disponibles:</td>
                    <td>
                        
                      <span>{{ dataCampaing.availableCredit | formatCurrency(configFormat) }}</span>
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
import BackendApi from '@/services/backend.service'

import jspdf from 'jspdf'
import html2canvas from 'html2canvas'
import moment from 'moment'
moment.locale('es')

export default {
  props: {
    dataCampaing: {
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
        // { key9:'[NOMBRE 1]' }
      ],
      loadingSendPdf: false
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
    async submit() {
      if (this.dataCampaing.availableCredit >= this.dataCampaing.necessary_credit) {
        this.isBtnLoading = true
  
        const options = {
          scale: 3
        }
  
        await html2canvas(document.getElementById('preview-sms-dialog'),options).then(
          (canvas) => {
            const imgData = canvas.toDataURL('image/png')
            const doc = new jspdf('p', 'pt', 'a4')
            const bufferX = 25
            const bufferY = 235
            const imgProps = doc.getImageProperties(imgData)
            const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
            const sizeHead = 16
  
            doc.setFontSize(sizeHead)
            const optionsHeader = {
              align: 'center',
              font: 'helvetica'
            }
  
            doc.text('Campaña creada', pdfWidth / 2, 40, optionsHeader)
            doc.setFontSize(11)
            doc.text('FECHA Y HORA:' + ' ' + moment().format('MMMM Do YYYY, h:mm:ss a') , 25, 70)
            doc.setFontSize(12)
            doc.text('DATOS DEL USUARIO:', 25, 90)
            doc.setFontSize(11)
            doc.text('NOMBRE: ' +  $cookies.get('user').name , 25, 110)
            doc.text('CORREO: ' +  $cookies.get('user').email , 25, 125)
            doc.text('EMPRESA: ' +  $cookies.get('user').company , 25, 140)
            doc.setFontSize(12)
            doc.text('DATOS DE LA CAMPAÑA:', 25, 160)
            doc.setFontSize(11)
            doc.text('NOMBRE: ' +  this.options.name , 25, 180)
            doc.text('FORMATO DE MENSAJE: ' + this.message, 25, 195)
            doc.text('COSTO PROBABLE DE CREDITOS: ' + this.necessaryCredit , 25, 210)
            doc.text('CREDITOS DISPONIBLES: ' + this.availableCredit, 25, 225)
            // doc.text('CREDITOS DISPONIBLES PROBABLES DESPUES DE CREAR CAMPAÑA : ' + this.availableCredit -  this.necessaryCredit  , 25, 80)
            // necessaryCredit 
            // availableCredit
            doc.addImage(imgData, 'JPEG',bufferX ,bufferY , pdfWidth, pdfHeight, undefined, 'FAST')
  
            const formData = new FormData()
  
            formData.append('file', doc.output('blob'))
            
            BackendApi.post('/send_email', formData)
              .then((response) => {
                if (response.data.success) {
                  //alert('Se ha enviado el correo')
                }
              })
              .catch( (error) => {
                // this.$store.dispatch('app/showToast', 'No se pudo enviar el informe al email del usuario con datos de la campaña creada, verifique su correo')
              } )
            // doc.save('Reporte de campaña.pdf')
          }
        )
        this.isBtnLoading = false
        this.$emit('onPreviewSmsSubmit')
        this.close()
      } else {
        const badRequest = {
          error :{
            message:  'No dispone de credito disponible para crear campaña'
          }
        }
          
        this.$store.dispatch('app/showError', badRequest)
      }
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