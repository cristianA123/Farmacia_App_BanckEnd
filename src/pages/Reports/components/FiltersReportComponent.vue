<template>
  <v-form
    @submit.prevent="submit()"
    ref="form"
    v-model="validForm"
    lazy-validation
  >
    <!-- search bar -->
    <v-row class="pb-1">
      <v-col
        class="col-12 col-lg-3 py-0 pr-0 d-flex justify-space-between"
      >

        <ComboboxComponent 
          ref="comboUsers"
          :loading="isLoadingUsers"
          icon="mdi-account"
          label="Usuarios"
          @onChange="ChangeSelectedUsers"
        />

      </v-col>

      <v-col
        v-if="false"
        class="col-12 col-lg-3 py-0 pr-0 d-flex justify-space-between"
      >

        <ComboboxComponent 
          ref="comboServices"
          :loading="isLoadingServices"
          icon="mdi-bullhorn"
          label="Servicios"
          @onChange="ChangeSelectedServices"
        />

      </v-col>

      <!-- date start -->
      <v-col class="col-6 col-lg-3 py-0 pr-0 pd-flex justify-space-between">
        <v-dialog
          ref="dialogStart"
          v-model="modalDateRangeStart"
          :return-value.sync="dateStart"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateStart"
              append-icon="mdi-calendar-start"
              class="flex-grow-1 mr-md-2"
              label="Fecha inicio"
              outlined
              readonly
              dense
              clearable
              placeholder="Fecha inicio"
              v-bind="attrs"
              v-on="on"
              :rules="[ v => !!v || 'Fecha de inicio es obligatorio' ]"
            ></v-text-field>
          </template>
          <v-date-picker 
            v-model="dateStart" 
            scrollable
            :max="maxDateStart"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modalDateRangeStart = false">Cancelar</v-btn>
            <v-btn text color="primary" @click="saveDateStart()" >OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-col>

      <!-- date end -->
      <v-col class="col-6 col-lg-3 py-0 pr-0 d-flex justify-space-between">
        <v-dialog
          ref="dialogEnd"
          v-model="modalDateRangeEnd"
          :return-value.sync="dateEnd"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateEnd"
              append-icon="mdi-calendar-end"
              class="flex-grow-1 mr-md-2"
              label="Fecha fin"
              readonly
              outlined
              dense
              clearable
              placeholder="Fecha fin"
              v-bind="attrs"
              v-on="on"
              :rules="[ v => !!v || 'Fecha fin es obligatorio' ]"
            ></v-text-field>
          </template>
          <v-date-picker 
            v-model="dateEnd" 
            scrollable
            :min="minDateEnd"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modalDateRangeEnd = false">Cancelar</v-btn>
            <v-btn text color="primary" @click="saveDateEnd()" >OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-col>

      <!-- btn search -->
      <v-col class="col-12 col-lg-2 py-0 d-flex justify-space-between">
        <v-btn
          class="flex-grow-1"
          color="success"
          type="submit"
        >
        <v-icon left>
          mdi-reload
        </v-icon>
          Buscar
        </v-btn>
      </v-col >
    </v-row>
  </v-form>
</template>

<script>
import moment from 'moment'
import BackendApi from '@/services/backend.service'
import ComboboxComponent from '@/pages/Reports/components/ComboboxComponent'

export default {
  components: {
    ComboboxComponent
  },
  data() {
    return {
      validForm: true,
      services: [
        { id: 0, name: 'Todos' },
        { id: 1, name: 'SMS' },
        { id: 2, name: 'IVR' },
        { id: 3, name: 'WHATSAPP' },
        { id: 4, name: 'MAILLING' }
      ],
      selectedServices: [],
      isLoadingServices: false,

      selectedUsers: [],
      isLoadingUsers: false,
      
      maxDateStart: null,
      dateStart: null,
      minDateEnd: null,
      dateEnd: null,

      modalDateRangeStart: null,
      modalDateRangeEnd: null,

      isLoading: false
    }
  },
  computed: {
    computedDateFormat: function () {

      return moment(Date.now()).format('YYYY-MM-DD')
    }
  },
  mounted() {
    this.getUsers()
    // this.getServices()
    this.dateStart = this.computedDateFormat
    this.dateEnd = this.computedDateFormat
  },
  methods: {
    getUsers () {
      this.isLoadingUsers = true
      
      BackendApi.get('/userforreport').then((response) => {
        const data = [{ id:0, name: 'Todos' }]
        const usersid = []

        response.data.data.forEach((user) => {
          data.push({
            id: user.id,
            name: user.name
          })
          usersid.push(user.id)
        })

        this.isLoadingUsers = false
        this.$refs.comboUsers.list(data)
        this.$emit('onreadyusers', usersid)

      })
    },
    getServices () {
      this.isLoadingServices = true
      
      const data = [
        { id:0, name: 'Todos' },
        { id:1, name: 'Sms' },
        { id:2, name: 'Ivr' }
      ]

      this.isLoadingServices = false
      this.$refs.comboServices.list(data)

    },
    saveDateStart () {
      this.$refs.dialogStart.save(this.dateStart)
      this.minDateEnd = new Date(this.dateStart).toISOString()
    },
    saveDateEnd () {
      this.$refs.dialogEnd.save(this.dateEnd)
      this.maxDateStart = new Date(this.dateEnd).toISOString()
    },
    submit () {
      if (this.$refs.form.validate()) {
        
        const filters = {
          users: this.selectedUsers,
          services: [0,1,2],
          start_date: this.dateStart,
          final_date: this.dateEnd
        }

        this.$emit('onfilter', filters)
      }
    },
    ChangeSelectedUsers(users) {
      this.selectedUsers = users
    },
    ChangeSelectedServices(services) {
      this.selectedServices = services
      console.log('rrrrrr')
      console.log(services)
      console.log('rrrrrr')
    }
  }
}
</script>