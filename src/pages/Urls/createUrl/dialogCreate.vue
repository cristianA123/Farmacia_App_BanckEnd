<template>
  <v-row justify="center">
    <v-dialog
      v-model="show"
      persistent
      max-width="600px"
    >
      <v-form
        ref="formUploadFile"
        lazzy-validation
        @submit.prevent="submit"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ isUpdate ? "Editar url corta" : "Crear url corta" }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="name"
                    label="Nombre de archivo"
                    :rules="[v => !!v || 'Nombre es obligatorio']"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="url"
                    type="url"
                    label="Url"
                    :rules="[
                      v => !!v || 'Url es obligatorio',
                      v => /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi.test(v)|| 'Url no es válido' 
                    ]"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="close()"
            >
              Cerrar
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              type="submit"
              :loading="isLoading"
              :disabled="isBtnEnable"
            >
              {{ isUpdate ? "Editar" : "Crear" }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios'
import headers from '@/configs/headers.js'

export default {
  props: {
    show: {
      type: Boolean
    },
    isUpdate:{
      type: Boolean
    },
    name: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    urlId: {
      type: Number,
      default: null
    },
    isBtnEnable:{
      type: Boolean
    }
  },
  data: () => ({
    isLoading: false
    // isupdate2: this.isUpdate,
    // isBtnEnable:false,
    // url: this.url2
  }),
  computed: {
    estoaaa: () => {
      // this.url = this.url2
    }
  },
  watch: {
    handler : () => {
      // this.updateUrl()
    }
  },
  mounted() {
    // this.updateUrl()

  },
  methods: {
    close () {
      this.$refs.formUploadFile.reset()
      this.isUpdate = false
      this.$emit('onClose')

    }, 
    submit () {
      if (this.$refs.formUploadFile.validate()) {
        this.isLoading = false

        if ( !this.isUpdate ) {
          this.isBtnEnable = true
          const payload = {
            name: this.name,
            long_url: this.url
          }
  
          axios.post('/url', payload).then((response) => {
            // console.log(response)
            if (response.data.success) {
              this.close()
              this.$store.dispatch('app/showToast', 'Url corta creada exitosamente')
            }
            this.isLoading = false
            this.isUpdate = false
            this.$refs.formUploadFile.reset()

          })
          this.isBtnEnable = true
          this.isLoading = false
        } else {
          this.isBtnEnable = true

          const payload = {
            name: this.name,
            long_url: this.url
          }
  
          axios.put('/url/' + this.urlId, payload).then((response) => {
            // console.log(response)
            if (response.data.success) {
              this.close()
              this.$store.dispatch('app/showToast', 'Url corta se editó exitosamente')
            }
            this.isLoading = false
            this.isUpdate = false
            this.$refs.formUploadFile.reset()

          })
          this.isBtnEnable = true
          this.isLoading = false
        }
      }
    },
    updateUrl () {
      // this.url = this.url2
    }
  }
}
</script>
