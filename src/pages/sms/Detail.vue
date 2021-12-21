<template>
  <div class="d-flex flex-column flex-grow-1">
    <Back-Page 
      to="sms-report"
    />
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Detalle de campaña:</div>
      </div>
      <v-spacer></v-spacer>
    </div>

    <div class="mb-4">
      <div 
        v-for="detail in details"
        :key="detail.key"
        class="d-flex"
      >
        <span class="font-weight-bold">{{ detail.key }}</span>
        <span class="mx-1">
          {{ detail.value }}
        </span>
      </div>
    </div>

    <v-tabs v-model="tab" :show-arrows="false" background-color="transparent" centered>
      <v-tab to="#tab-analitics">Analítico</v-tab>
      <v-tab to="#tab-registers">Registros</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item value="tab-analitics">
        <v-row>

          <v-col>
            <entregabilidad-card
              label="Entregabilidad"
              class="h-full"
              style="min-height: 380px"
              color="#8c9eff"
              :loading="isLoadingEntregabilidad"
              :series="computedSeries"
            ></entregabilidad-card>
          </v-col>

          <v-col
            v-if="apertura"
          >
            <v-card>
              <v-card-title>
                Apertura
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-tab-item>

      <v-tab-item value="tab-registers">
        <v-col>
          <v-card>
            <v-card-text>
              <v-data-table
                :items="messages"
                :headers="headers"
              >
                <template v-slot:top>
                  <v-col>
                    <v-row>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="success"
                      >
                        <v-icon right>
                          mdi-download
                        </v-icon>
                        Descargar Excel
                      </v-btn>
                    </v-row>
                  </v-col>
                </template> 
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-tab-item>
    </v-tabs-items>

  </div>
</template>

<script>
import BackPage from '@/components/common/BackPage.vue'
import BackendApi from '@/services/backend.service'
import EntregabilidadCard from './components/EntregabilidadCard'

export default {
  components: {
    BackPage,
    EntregabilidadCard
  },
  computed: {
    computedSeries: function () {

      return [this.numDelivered,this.numRejected, this.numPending]
    }
  },
  mounted() {

    this.isLoadingEntregabilidad = true
    this.getDetailReportSms()
  },
  data() {
    return {
      numDelivered: 0,
      numRejected: 0,
      numPending: 0,
      isLoadingEntregabilidad: false,
      apertura: true,
      messages: [],
      headers: [
        { text: 'Celular', value: 'phone' },
        { text: 'Mensaje', value: 'content' },
        { text: 'Estado', value: 'status' },
        { text: 'Creditos', value: 'credit' },
        { text: 'Enviado el', value: 'send_at' }
      ],
      details: [
        { key: 'Nombre', value: 'Campaña de prueba' },
        { key: 'Fecha', value: '2021-06-12 12:01:12' },
        { key: 'Estado', value: 'Procesando' }
      ],
      tab: null
    }
  },
  methods: {
    getDetailReportSms() {

      const payload = {
        campaing_id: this.$route.params.id
      }
  
      BackendApi.get('/getDetailReportSms', { params: payload }).then((response) => {

        if (response.data.success) {
          const rows = response.data.data.campaing.messages
          let delivered = 0
          let rejected = 0
          let pending = 0

          this.messages = response.data.data.messages

          pending = rows - this.messages.length

          this.messages.forEach((message) => {
            const status = message.status.substr(0, message.status.indexOf('_'))

            if (status === 'DELIVERED') {
              delivered++
            } else if (status === 'REJECTED') {
              rejected++
            } else {
              pending++
            }
          })

          this.numDelivered = delivered
          this.numRejected = rejected
          this.numPending = pending

          this.isLoadingEntregabilidad = false
        
        } else {
          this.$store.dispatch('app/showToast',response.data.message)
        }
      })
    }
  }
}
</script>