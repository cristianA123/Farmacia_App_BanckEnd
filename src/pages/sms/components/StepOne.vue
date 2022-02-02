<template>
  <v-container class="mx-0 px-0">
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
        :rules="[v => !!v || 'Por favor ingrese un nombre de campaña']"
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
        :rules="[v => !!v || 'Por favor ingrese una agenda']"
        label="Seleccione la agenda de contactos"
        prepend-icon="mdi-contacts"
        outlined
        @change="onChangeAgenda()"
      />

      <v-file-input
        v-if="type === 2"
        id="file"
        label="Cargue su archivo excel"
        :rules="[v => !!v || 'Por favor ingrese una Excel']"
        :loading="isFileLoading"
        outlined
        :error-messages="errorMessageFile"
        @change="onChangeExcel"
      >
        <template v-slot:selection="{ text }">
          <v-chip small label color="primary">
            {{ text }}
          </v-chip>
        </template>
      </v-file-input>

      <v-btn type="submit" class="primary" :disabled="isFileLoading">
        Siguiente
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import InputIndividualPhones from '@/components/common/InputIndividualPhones.vue'
import BackendApi from '@/services/backend.service'

export default {
  components: {
    InputIndividualPhones
  },
  data() {
    return {
      type: 0,
      name: 'campaña de prueba',
      agendas: [],
      validFormStepOne: true,
      isFileLoading: false,
      errorMessageFile: null
    }
  },
  mounted() {
    this.getAgendas()
  },
  methods: {
    onStepTwo() {
      this.$emit('onStepTwo')
    },
    onInputNewIndividualPhone (destinatarios) {
      this.destinatarios = destinatarios
      this.rows = destinatarios.length
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
