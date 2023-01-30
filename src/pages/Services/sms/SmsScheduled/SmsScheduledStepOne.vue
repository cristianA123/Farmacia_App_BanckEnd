<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center pb-3">
      <div>
        <div class="display-1">SMS Calendarizado</div>
      </div>
      <v-spacer></v-spacer>

      <v-spacer></v-spacer>
      <BackPage 
        to="services"
      />
    </div>

    <v-form
      ref="form"
      lazy-validation
      @submit.prevent="submit"
    >
      <v-card
        outlined
      >
        <v-card-title>
          <DownloadBottonComponent
            path="/files/sms_calendarizado.xlsx"
          />
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="name"
            class="mt-1"
            label="Nombre de campaña"
            placeholder="Ej. Campaña navideña"
            prepend-icon="mdi-tag-text-outline"
            :error-messages="isValidName"
            :rules="[v=>!!v || 'El nombre es obligatorio']"
            outlined
            required
          />
          
          <v-file-input
            v-model="file"
            label="Subir excel"
            :loading="isFileLoading"
            outlined
            :rules="[v=>!!v || 'Excel']"
            :error-messages="isValidFile"
            required
            @change="onChangeExcel"
          />

        </v-card-text>

        <v-card-actions>
          <v-row
            justify="center"
          >
            <v-btn
              class="my-2"
              color="primary"
              dark
              :loading="isFileLoading || isBtnLoading"
              @click="submit"
            >
              Siguiente
              <v-icon>
                mdi-chevron-right
              </v-icon>
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-form>

  </div>
</template>

<script>
import BackendApi from '@/services/backend.service'
import BackPage from '@/components/common/BackPage.vue'
import DownloadBottonComponent from '@/components/common/DownloadBottonComponent.vue'

export default {
  components: {
    BackPage,
    DownloadBottonComponent
  },
  data() {
    return {
      errors : {
        name:'',
        file:''
      },
      name: '',
      file: null,
      isFileLoading: false,
      errorMessageFile: null,
      fileId: null,
      isBtnLoading: false
    }
  },
  computed: {
    isValidName: function () {

      return this.errors.name === undefined ? '' : this.errors.name[0]
    },
    isValidFile: function () {

      return this.errors.file === undefined ? '' : this.errors.file[0]
    }
  },
  methods: {
    errorFile (text) {
      this.isFileLoading = false
      this.errors.file = [text]
    },
    fileIsValid() {
      if (file && (file.name.split('.').pop() === 'xlsx' || file.name.split('.').pop() === 'xls')) {

        return true
      }

      return false
    },
    onChangeExcel(file) {
      this.isFileLoading = true

      if (this.fileIsValid) {
        const formData = new FormData()

        formData.append('file', file)

        BackendApi.post('/sms/upload/excelcampaing', formData)
          .then((response) => {
            this.isFileLoading = false

            if (response.data.success) {
              this.$store.dispatch('fileData', response.data.data)
              this.errorFile(null)
            } else {
              this.errorFile(response.data.message)
            }
          })
          .catch ( (error) => {
            console.log(error)
            this.fileId = null
            this.errors = error.response.data.errors
            this.isFileLoading = false
          })
      } else {

        this.errorFile('No es un archivo Excel')
      }
      
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('name', this.name)
        this.$router.push({ name: 'sms-excel-step-two' })
      }
    }
  }
}
</script>
