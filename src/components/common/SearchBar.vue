<template>
  <v-form
    @submit.prevent="submit()"
    ref="form"
    v-model="validForm"
    lazy-validation
  >
    <!-- search bar -->
    <v-row class="pb-1">
      <v-col class="col-12 col-lg-4 py-0 d-flex justify-space-between">
        <!-- users list -->
        <v-combobox
          v-model="selectUser"
          :items="subUsers"
          item-text="name"
          item-value="id"
          append-icon="mdi-account"
          class="flex-grow-1 mr-md-2"
          solo
          dense
          clearable
          multiple
          placeholder="Seleccione usuario"
          :rules="[ computedSelectUser => computedSelectUser.length !== 0 || 'Usuario es obligatorio' ]"
          @change="ifSelectAllData()"
        >
          <template v-slot:selection="{ item, index }">
            <div v-if="index === 0">
              {{ item.name }}
            </div>
            <span
              v-if="index === 1"
              class="grey--text text-caption"
            >
              (+{{ selectUser.length - 1 }} más)
            </span>
          </template>
        </v-combobox>
      </v-col>

      <!-- date start -->
      <v-col class="col-6 col-lg-3 py-0 pd-flex justify-space-between">
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
              solo
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
      <v-col class="col-6 col-lg-3 py-0 d-flex justify-space-between">
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
              solo
              readonly
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
import axios from 'axios'

export default {
  data() {
    return {
      subUsers: [{ id: 0, name: 'Todos' }],
      validForm: true,
      selectUser: [],
      maxDateStart: null,
      dateStart: null,
      modalDateRangeStart: null,
      minDateEnd: null,
      dateEnd: null,
      modalDateRangeEnd: null
    }
  },
  mounted() {
    this.getUsers()
    this.getMyUser()
    this.dateStart = this.computedDateFormat
    this.dateEnd = this.computedDateFormat
  },
  computed: {
    computedSelectUser: function () {
      const result = []

      this.selectUser.forEach((element) => {
        result.push(element.id)
      })

      return result
    },
    computedDateFormat: function () {

      return moment(Date.now()).format('YYYY-MM-DD')
    }
  },
  methods: {
    getUsers () {
      axios.get('/getUsers', { headers: { Authorization: 'Bearer ' + window.localStorage.token } }).then((response) => {
        response.data.data.forEach((user) => {
          const data = {
            id: user.id,
            name: user.name
          }

          this.subUsers.push(data)
        })
        
        this.filter()
      })
        .catch((error) => {
          console.log(error)
        })
    },
    getMyUser() {
      axios.get('/me', { headers: { Authorization: 'Bearer ' + window.localStorage.token } }).then((response) => {
        if (response.data.success) {
          this.selectUser.push({ id: response.data.data.id, name: response.data.data.name })
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    ifSelectAllData () {
      if (this.selectUser.find((user) => user.id === 0)) {
        this.selectUser = this.subUsers
      }
    },
    filter() {
      const filters = {
        usersSelected: this.computedSelectUser,
        dateStart: this.dateStart,
        dateEnd: this.dateEnd
      }
      
      this.$emit('onfilter', filters)
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
        this.filter()
      }
    }
  }
}
</script>