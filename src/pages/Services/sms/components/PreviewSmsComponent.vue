<template>
  <!--- Dialog Preview SMS --->
  <v-dialog
    v-model="show"
    width="600px"
  >
    <v-card>
      <v-card-title>
        Verifique los datos de su campaña:
        <v-spacer></v-spacer>
        <v-btn text dense @click="show=false">Cerrar</v-btn>
      </v-card-title>

      <v-card-text>

        <div class="d-flex flex-column flex-grow-1">
          <div class="d-flex align-center pb-3">
            <div style="background-image: url(http://localhost:8080/images/services/sms_preview.png); width: 250px; height: 450px; background-size: 100%;">
              <div style="padding: 5px 25px; 25px  25px;"><div><span id="span_sms_text" style="background-color: rgb(230, 230, 235);text-align: left;padding: 5px 7px;margin: 100px 25px 25px 20px;border-radius: 10px;float: left;white-space: pre-wrap;font-size: 12px;color: black;">{{ messageComputed }} $#$$</span></div></div>
            </div>
            <div>
              <v-card
                outlined 
                class="pa-2"
                max-width="300px"
              >
                <v-card-title>Resumen:</v-card-title>
                <v-card-text>
                  <table>
                    <tr>
                      <td style="width:150px;">Push:</td>
                      <td>
                        <v-icon v-if="options.is_push">mdi-check</v-icon>
                        <span v-else>NO</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Bidireccional:</td>
                      <td>
                        <v-icon v-if="options.is_bidireccional">mdi-check</v-icon>
                        <span v-else>NO</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Agendado:</td>
                      <td>
                        <span v-if="options.scheduled !== null">{{ options.scheduled }}</span>
                        <span v-else>NO</span>
                      </td>
                    </tr>
                  </table>
                  <v-divider></v-divider>
                  <table>
                    <tr>
                      <td style="width:150px;"><strong>Créditos a usar (aprox):</strong></td>
                      <td>
                        
                        <span><strong>{{ creditToUse }}</strong></span>
                      </td>
                    </tr>
                    <tr>
                      <td style="width:150px;"><strong>Créditos disponibles:</strong></td>
                      <td>
                        
                        <span><strong>{{ availableCredit }}</strong></span>
                      </td>
                    </tr>
                  </table>
                </v-card-text>
              </v-card>
            </div>
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          :loading="isBtnLoading"
          @click="submit"
        >
          <v-icon
            right
            dark
          >
            mdi-send-outline
          </v-icon>
          Lanzar campaña
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default: () => {}
    },
    message: {
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
        { key:'[VAR1]', value:'var1' },
        { key:'[VAR2]', value:'var2' },
        { key:'[VAR3]', value:'var3' },
        { key:'[VAR4]', value:'var4' }
        // { key9:'[NOMBRE 1]' }
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
      ]
    }
  },
  computed: {
    messageComputed: function () {
      let auxiliar = this.message

      if ( this.exampleContact.length !== 0) {

        if ( this.isExcel ) {
  
          this.data_key_excel.forEach( (element) => {
            auxiliar = auxiliar.replace(element.key, this.exampleContact[0][element.value])
          })

        } else {

          this.data_key_agenda.forEach( (element) => {
            auxiliar = auxiliar.replace(element.key, this.exampleContact[0][element.value])
          })
          
        }
      }

      return auxiliar

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