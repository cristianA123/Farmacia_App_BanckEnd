<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Campaña SMS</div>
      </div>
      <v-spacer></v-spacer>
    </div>

    <v-stepper v-model="step" vertical>
      <v-stepper-step step="1" complete>
        Nombre de campaña y destinatarios
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-container
          class="mx-0 px-0"
        >
          <v-form
            ref="formStepOne"
            v-model="validFormStepOne"
            lazy-validation
            @submit.prevent="toStepTwo()"
          >

            <v-text-field
              v-model="name"
              autofocus
              :counter="10"
              :rules="[ v => !!v || 'Por favor ingrese un nombre de campaña' ]"
              label="Nombre de campaña"
              required
              outlined
            ></v-text-field>

            <v-select
              v-model="type"
              :items="$store.state.campaings.typesCampaing"
              item-text="name"
              item-value="id"
              label="Tipo de campaña"
              required
              outlined
              @change="onChangeType()"
            ></v-select>

            <Input-Individual-Phones 
              v-if="type === 0"
              @onInputNewIndividualPhone="onInputNewIndividualPhone"
            />

            <v-select
              v-if="type === 1"
              v-model="destinatarios"
              :items="agendas"
              item-text="name"
              item-value="id"
              :rules="[ v => !!v || 'Por favor ingrese una agenda' ]"
              label="Seleccione la agenda de contactos"
              prepend-icon="mdi-contacts"
              @change="onChangeAgenda()"
              outlined
            />

            <v-file-input
              v-if="type === 2"
              id="file"
              label="Cargue su archivo excel"
              :rules="[ v => !!v || 'Por favor ingrese una Excel' ]"
              :loading="isFileLoading"
              outlined
              :error-messages="errorMessageFile"
              @change="onChangeExcel"
            >
              <template v-slot:selection="{ text }">
                <v-chip
                  small
                  label
                  color="primary"
                >
                  {{ text }}
                </v-chip>
              </template>
            </v-file-input>

            <v-btn
              type="submit"
              class="primary"
              :disabled="isFileLoading"
            >
              Siguiente
            </v-btn>
          
          </v-form>
        </v-container>
      </v-stepper-content>

      <v-stepper-step step="2" complete>Mensaje</v-stepper-step>

      <v-stepper-content step="2">
        <v-container
          class="ma-0 pa-0"
        >
          <!-- Tabla -->
          <v-row v-if="type === 1 || type === 2">
            <v-col 
              class="my-0 py-0"
            >
              <v-data-table
                :headers="headers"
                :items="itemsExample"
                hide-default-footer
                class="elevation-1"
              ></v-data-table>
            </v-col>
          </v-row>

          <!-- Botones -->
          <v-row 
            class="mx-0 px-0 my-4"
          > 
            <div
              v-if="type === 1 || type === 2"
            >
              <v-btn
              
                v-for="button in buttons"
                :key="button.id"
                class="primary mx-1"
                @click="addVarOnMessage(button)"
              >
                {{ button }}
              </v-btn>
            </div>

            <v-spacer></v-spacer>

            <Button-Url
              @onCustomUrl="onCustomUrl"  
            />
          </v-row>
          <v-form
            ref="formStepTwo"
            v-model="validFormStepTwo"
            lazy-validation
            @submit.prevent="toStepThree()"
          >
            <!--- Mensaje --->
            <v-row>
              <v-col class="my-0">
                <v-textarea
                  v-model="message"
                  label="Escriba el mensaje a enviar"
                  :messages="computedCounterMessage"
                  :rules="[v=>!!v || 'Escriba el mensaje a enviar, puede utilizar los botones para el uso de Variables']"
                  outlined
                />
              </v-col>
            </v-row>

            <!-- Configuración -->
            <v-row>
              <v-container
                fluid
                class="py-0 my-0"
              >
                <div
                  class="d-flex"
                >
                  <v-switch
                    v-model="agendado"
                    class="mr-4 my-0 py-0"
                    label="Agendamiento"
                  />
                  <Date-Time-Picker 
                    v-if="agendado"
                    v-model="sendAt"
                    class="my-0 py-0"
                    label="Seleccione fecha y hora de lanzamiento" 
                  />
                </div>

                <v-switch
                  v-model="bidireccional"
                  class="my-0 py-0"
                  label="Bidireccional"
                />

                <v-switch
                  v-model="push"
                  class="my-0 py-0"
                  label="Push"
                />
                
              </v-container>
            </v-row>

            <v-btn 
              text
              @click="step = 1"
            >
              Anterior
            </v-btn>

            <v-btn 
              color="primary" 
              type="submit"
            >
              Siguiente
            </v-btn>
          </v-form>
        </v-container>
      </v-stepper-content>

      <v-stepper-step step="3" complete>Validar y enviar</v-stepper-step>

      <v-stepper-content step="3">
        <v-col class="ma-0 pa-0">  
          <v-row>

            <!-- Resumen--->
            <v-col>
              <v-alert
                v-model="alertCustomUrl"
                dismissible
                close-icon="mdi-delete"
                color="cyan"
                border="left"
                elevation="2"
                colored-border
                icon="mdi-alert-circle-outline"
              >
                Esta campaña esta usando <strong>URL personalizadas</strong>, por favor realice una prueba antes de lanzar la campaña.
              </v-alert>
              <div class="text-h5 mb-6">Resumen</div>
              <div class="d-flex">
                <div>Tipo de Campaña:</div>
                <v-spacer></v-spacer>
                <div>{{ computedType }}</div>
              </div>
              <v-divider class="my-2"></v-divider>
              <div class="d-flex">
                <div>Bidireccional:</div>
                <v-spacer></v-spacer>
                <div>{{ computedBidireccional }}</div>
              </div>
              <v-divider class="my-2"></v-divider>
              <div class="d-flex">
                <div>Destinatarios:</div>
                <v-spacer></v-spacer>
                <div>{{ destinatarios }}</div>
              </div>
              <v-divider class="my-2"></v-divider>
              <div class="d-flex">
                <div>Mensaje:</div>
                <v-spacer></v-spacer>
                <div>{{ message }}</div>
              </div>
              <div v-if="agendado">
                <v-divider class="my-2"></v-divider>
                <div class="d-flex">
                  <div>Agendado:</div>
                  <v-spacer></v-spacer>
                  <div>{{ computedSendAt }}</div>
                </div>
              </div>
              <v-divider class="my-2"></v-divider>
              <div class="d-flex">
                <div>Push:</div>
                <v-spacer></v-spacer>
                <div>{{ computedPush }}</div>
              </div>
              <v-divider class="my-2"></v-divider>
              <div class="d-flex text-h6">
                <div class="text-uppercase">Total Créditos:</div>
                <v-spacer></v-spacer>
                <Credits 
                  :isLoadingCredits="isLoadingCredits"
                  :creditsCampaing="computedCreditsCampaing"
                />
              </div>
              <v-row justify="center">
                <v-col
                  class="col-lg-12 py-1"
                >
                  <v-dialog
                    width="600px"
                    v-model="dialogTestOnMyPhone"
                    persistent
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        large
                        dark
                        block
                        class="mt-8"
                        v-bind="attrs"
                        v-on="on"
                      >
                        Probar con mi número
                      </v-btn>
                    </template>
                    <v-card>
                      <v-form
                        ref="formTestOnMyPhone"
                        :v-model="true"
                        lazy-validation
                        @submit.prevent="testOnMyPhone()"
                      >
                        <v-card-title>
                          <span class="text-h5">Hacer una prueba con mi número</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container>
                            <v-text-field
                              v-model="testPhone"
                              label="Destinatario"
                              :rules="rulesPhone"
                              required
                            />
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="dialogTestOnMyPhone = false"
                          >
                            Cerrar
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            type="submit"
                          >
                            Enviar prueba
                          </v-btn>
                        </v-card-actions>
                      </v-form>
                    </v-card>
                  </v-dialog>
                </v-col>
            
                <v-col
                  class="col-lg-6 py-1"
                >
                  <v-btn 
                    width="100%"
                    @click="step = 2"
                  >
                    Anterior
                  </v-btn>
                </v-col>

                <v-col
                  class="col-lg-6 py-1"
                >
                  <template>
                    <div class="text-center">
                      <v-dialog
                        v-model="dialog"
                        persistent
                        max-width="400"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            width="100%"
                            :loading="isLoadingSendCampaing"
                            color="primary"
                            v-on="on"
                            v-bind="attrs"
                          >
                            Enviar campaña
                          </v-btn>
                        </template>

                        <v-card>
                          <v-card-title class="text-h5">
                            Confirmación
                          </v-card-title>
                          <v-card-text>Si ha validado los datos del <strong>Resumen</strong> y todo es conforme, proceda a confirmar.</v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="secondary"
                              text
                              @click="dialog = false"
                            >
                              Cancelar
                            </v-btn>
                            <v-btn
                              color="success"
                              text
                              @click="submit()"
                            >
                              Confirmo
                            </v-btn>
                          </v-card-actions>
                        </v-card>

                      </v-dialog>
                    </div>
                  </template>
                </v-col>
              </v-row>
            </v-col>

            <!-- Phone Preview--->
            <v-col>
              <div class="row d-flex justify-center">
                <div style="background-image: url(https://appenviamas.com/assets/img/iphone_4.png); width: 220px; height: 450px; background-size: 100%;">
                  <div><p style="margin-top: 42%;margin-left: 43%;font-size: 10px;font-weight: bold;">31313</p></div>
                  <div style="padding: 5px 25px; 25px  25px;"><div><span id="span_sms_text" style="background-color: #e6e6eb; text-align: left; padding: 5px 7px; margin: 5px 7px;  margin-right: 25px; border-radius: 10px; float: left; white-space: pre-wrap; font-size: 12px; color: black;">{{ messageCleanedShow }}</span></div></div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-stepper-content>
    </v-stepper>

  </div>
</template>
<script>
import SmsCounter from 'sms-counter'
import DateTimePicker from '@/components/common/DateTimePicker'
import ButtonUrl from './shortUrl/boton.vue'
import Credits from './components/credits.vue'
import moment from 'moment'
import InputIndividualPhones from '@/components/common/InputIndividualPhones.vue'
import BackendApi from '@/services/backend.service'

export default {
  components: {
    DateTimePicker,
    ButtonUrl,
    Credits,
    InputIndividualPhones
  },
  mounted() {
    this.getAgendas()
  },
  data () {
    return {
      agendas: [],
      lastCommaIndex: 0,
      dialog: false,
      alertCustomUrl: false,
      isLoadingSendCampaing: false,
      dialogTestOnMyPhone: false,
      type: 0,
      name: 'campaña de prueba',
      destinatarios: null,
      message: 'Hola Marco, tiene una cita agendada a las: [VAR1]. Confirme dando clic aqui:',
      messageCleaned: '',
      creditsMessageClean: 0,
      agendado: false,
      sendAt: null,
      bidireccional: false,
      push: false,
      file: null,
      rows: 0,
      isLoadingCredits: false,
      validFormStepOne: true,
      validFormStepTwo: true,
      originalUrl: '',
      step: 1,
      errorMessageFile: null,
      buttons : ['VAR1', 'VAR2', 'VAR3', 'VAR4', 'VAR5', 'VAR6', 'VAR7', 'VAR8'],
      isFileLoading: false,
      headers: [
        { text: 'Destinatario', value: 'CELULAR' },
        { text: 'VAR1', value: 'VAR1' },
        { text: 'VAR2', value: 'VAR2' },
        { text: 'VAR3', value: 'VAR3' },
        { text: 'VAR4', value: 'VAR4' },
        { text: 'VAR5', value: 'VAR5' },
        { text: 'VAR6', value: 'VAR6' },
        { text: 'VAR7', value: 'VAR7' },
        { text: 'VAR8', value: 'VAR8' }
      ],
      itemsExample: [
        { VAR1: '', VAR2: '', VAR3: '', VAR4: '', VAR5: '', VAR6: '', VAR7: '', VAR8: '' }
      ],
      rulesPhone: [(v) => !!v || 'El teléfonos de prueba es obligatorio'],
      testPhone:''
    }
  },
  computed: {
    computedCounterMessage () {
      this.computedEstandarizarTexto()
      const content = this.messageCleaned

      const countCharacters = SmsCounter.count(content).remaining
      const countCredits = SmsCounter.count(content).messages

      return  '[' + countCharacters + ' Restantes / ' + countCredits + ' Crédito]'
    },
    computedType: function () {
      
      return this.$store.state.campaings.typesCampaing[this.type].name
    },
    computedPush: function () {
      let result = ''

      if (this.push) {
        result = 'Sí (Movistar, Entel y Claro)'
      } else {
        result = 'No'
      }

      return result
    },
    computedBidireccional: function () {
      let result = ''

      if (this.bidireccional) {
        result = 'Sí (Los mensajes entrantes se cobran)'
      } else {
        result = 'No'
      }

      return result
    },
    messageCleanedShow: function () {

      let result = ''
      
      if (this.type === 1) {
        result = this.message.replace('[NOMBRE 1]', this.itemsExample[0].name1)
        result = result.replace('[NOMBRE 2]', this.itemsExample[0].name2)
        result = result.replace('[APELLIDO 1]', this.itemsExample[0].lastname1)
        result = result.replace('[APELLIDO 2]', this.itemsExample[0].lastname2)
        result = result.replace('[VAR1]', this.itemsExample[0].var1)
        result = result.replace('[VAR2]', this.itemsExample[0].var2)
        result = result.replace('[VAR3]', this.itemsExample[0].var3)
        result = result.replace('[VAR4]', this.itemsExample[0].var4)
        result = result.replace('[CUSTOMURL]', 'http://cut.pe/l23Fti')
      } else {
        result = this.message.replace('[VAR1]', this.itemsExample[0].VAR1)
        result = result.replace('[VAR2]', this.itemsExample[0].VAR2)
        result = result.replace('[VAR3]', this.itemsExample[0].VAR3)
        result = result.replace('[VAR4]', this.itemsExample[0].VAR4)
        result = result.replace('[VAR5]', this.itemsExample[0].VAR5)
        result = result.replace('[VAR6]', this.itemsExample[0].VAR6)
        result = result.replace('[VAR7]', this.itemsExample[0].VAR7)
        result = result.replace('[VAR8]', this.itemsExample[0].VAR8)
        result = result.replace('[CUSTOMURL]', 'http://cut.pe/l23Fti')
      }
  
      return result
    },
    validateCustomUrlMessage: function () {
      let result = false

      if (this.message.includes('[CUSTOMURL]') && this.originalUrl !== '' ) {
        result = true
      } else {
        result = false
      }

      return result
    },
    computedCreditsCampaing: function () {

      return this.rows * this.creditsMessageClean
    },
    computedSendAt: function () {

      return this.sendAt ? moment(this.sendAt).format('YYYY-MM-DD HH:mm:ss') : ''
    }
  },
  methods: {
    onChangeAgenda() {
      const agenda = this.agendas.find((agenda) => {
        return agenda.id === this.destinatarios
      })

      this.rows = agenda.rows
    },
    computedEstandarizarTexto () {
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
              
      this.messageCleaned = estandarText
    },
    toStepTwo () {
      if (this.$refs.formStepOne.validate() && this.errorMessageFile === null) {
        if (this.type === 1) { //Agendas
          this.headers = [
            { text: 'Destinatario', value: 'number' },
            { text: 'NOMBRE 1', value: 'name1' },
            { text: 'NOMBRE 2', value: 'name2' },
            { text: 'APELLIDO 1', value: 'lastname1' },
            { text: 'APELLIDO 2', value: 'lastname2' },
            { text: 'VAR1', value: 'var1' },
            { text: 'VAR2', value: 'var2' },
            { text: 'VAR3', value: 'var3' },
            { text: 'VAR4', value: 'var4' }
          ]
          
          this.buttons = ['NOMBRE 1', 'NOMBRE 2', 'APELLIDO 1', 'APELLIDO 2', 'VAR1', 'VAR2', 'VAR3', 'VAR4']
 
          BackendApi.get('/getExampleContacts', { params: { agenda_id: this.destinatarios }, headers: { Authorization: 'Bearer ' + window.localStorage.token } }).then((response) => {
            if (response.data.success) {
              this.itemsExample = response.data.data
            } else {
              this.$store.dispatch('app/showToast', response.data.message)
            }
          }).catch((error) => {
            console.log(error)
          })

        } else {
          this.headers = [
            { text: 'Destinatario', value: 'CELULAR' },
            { text: 'VAR1', value: 'VAR1' },
            { text: 'VAR2', value: 'VAR2' },
            { text: 'VAR3', value: 'VAR3' },
            { text: 'VAR4', value: 'VAR4' },
            { text: 'VAR5', value: 'VAR5' },
            { text: 'VAR6', value: 'VAR6' },
            { text: 'VAR7', value: 'VAR7' },
            { text: 'VAR8', value: 'VAR8' }
          ]
          
          this.buttons = ['VAR1', 'VAR2', 'VAR3', 'VAR4', 'VAR5', 'VAR6', 'VAR7', 'VAR8']
 
        }
        this.step = 2
      }
    },
    toStepThree () {
      if (this.$refs.formStepTwo.validate()) {
        this.isLoadingCredits = true

        const payload = {
          message: this.messageCleaned
        }

        BackendApi.get('/messageCredit', { params: payload }).then((response) => {
          if (response.data.success) {
            this.creditsMessageClean = response.data.data.credits
            this.isLoadingCredits = false
          } else {
            this.$store.dispatch('app/showToast', 'No se pudo calcular los créditos aproximados de esta campaña')
          }
        })
        
        this.alertCustomUrl = this.validateCustomUrlMessage
        
        this.step = 3
      }
    },
    addVarOnMessage (text) {
      this.message = this.message + '[' + text + ']'
    },
    onInputNewIndividualPhone (destinatarios) {
      this.destinatarios = destinatarios
      this.rows = destinatarios.length
    },
    onCustomUrl(originalUrl) {
      if (this.validateCustomUrlMessage) {
        this.$store.dispatch('app/showToast', 'Sólo puede agregar una URL personalizada por cada campaña')
      } else {
        this.originalUrl = originalUrl
        this.message = this.message  + '[CUSTOMURL]'
      }
    },
    errorFile (text) {
      this.isFileLoading = false
      this.errorMessageFile = text
    },
    onChangeExcel(file) {
      if (file) {
        this.isFileLoading = true
    
        if (file.name.split('.').pop() === 'xlsx' || file.name.split('.').pop() === 'xls') {
          const formData = new FormData()

          formData.append('file', file)
          
          BackendApi.post('/saveSmsFiles', formData).then((response) => {
            if (response.data.success) {
              this.fileUploaded = response.data.data.fileUploaded
              this.itemsExample = response.data.data.example
              this.rows = response.data.data.rows
              this.destinatarios = this.fileUploaded
              this.errorFile(null)
            } else {
              this.errorFile(response.data.message)
            }
            this.isFileLoading = false
          })
        } else {
          this.errorFile('No es un archivo Excel')
        }
      }
    },
    onChangeType () {
      this.destinatarios = []
    },
    testOnMyPhone () {
      if (this.$refs.formTestOnMyPhone.validate()) {

        const payload = {
          phone: this.testPhone,
          bidireccional: this.bidireccional,
          push: this.push,
          message: this.messageCleaned,
          customUrl: {
            status: this.validateCustomUrlMessage,
            originakUrl: this.originalUrl
          }
        }

        BackendApi.post('/sendTestSms', payload).then((response) => {
          if (response.data.success) {
            this.dialogTestOnMyPhone = false
            this.$store.dispatch('app/showToast','Se envió el mensaje de prueba')
          } else {
            this.$store.dispatch('app/showToast', response.data.message)
          }
        })

      }
    },
    submit () {
      let payload

      this.isLoadingSendCampaing = true

      if (this.type === 0) { //Individual
        const arrayDestinatarios = []

        this.destinatarios.forEach((d) => {
          const data = {
            message: this.messageCleaned,
            phone: d
          }

          arrayDestinatarios.push(data)
        })

        payload = {
          name: this.name,
          destinatarios: arrayDestinatarios,
          message: this.messageCleaned,
          agendado: this.agendado,
          sendAt: this.sendAt,
          bidireccional: this.bidireccional,
          push: this.push,
          customUrl: {
            status: this.validateCustomUrlMessage,
            originalUrl: this.originalUrl
          }
        }

        console.log(payload)
        
        BackendApi.post('/sendSmsCampaingIndividual', payload).then((response) => {
          console.log(response)
          if (response.data.success) {
            this.$store.dispatch('app/showToast', response.data.message)
          }
          this.isLoadingSendCampaing = false
        })

      } else if (this.type === 1) { //Agenda

        payload = {
          name: this.name,
          destinatarios: this.destinatarios,
          agendado: this.agendado,
          sendAt: this.sendAt,
          bidireccional: this.bidireccional,
          push: this.push,
          message: this.message,
          customUrl: {
            status: this.validateCustomUrlMessage,
            originalUrl: this.originalUrl
          }
        }

        this.isLoadingSendCampaing = false

      } else if (this.type === 2) { //Excel

        payload = {
          name: this.name,
          destinatarios: this.destinatarios,
          agendado: this.agendado,
          sendAt: this.computedSendAt,
          bidireccional: this.bidireccional,
          push: this.push,
          message: this.message,
          rows: this.rows,
          customUrl: {
            status: this.validateCustomUrlMessage,
            originalUrl: this.originalUrl
          }
        }

        BackendApi.post('/sendSmsCampaingFromExcel', payload).then((response) => {
          console.log(response.data)
          if (response.data.success) {
            this.$router.push({ name: 'sms-report' })
          } else {
            this.$store.dispatch('app/showToast','Hubo un problema al crear la campaña, vuelva a intentarlo')
            this.isLoadingSendCampaing = false
          }
        })
      } else {
        console.log('Error')
      }
    },
    getAgendas () {
      BackendApi.get('/getAgendas').then((response) => {
        if (response.data.success) {
          response.data.data.forEach((agenda) => {
            const data = {
              id: agenda.id,
              name: agenda.name + ' (contactos: ' + agenda.contacts + ')',
              rows: agenda.contacts
            }

            this.agendas.push(data)
          })
        } else {
          this.$store.dispatch('app/showToast', response.data.message)
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
