<template>
  <v-dialog v-model="dialog" width="600">
    <v-card>
      <v-form
        ref="formNewUrl"
        lazy-validation
        @submit.prevent="save()"
      >

        <v-card-title class="pa-2">
          Seleccione una URL
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <!-- ELIJA UNA URL -->
          <v-col
            v-if="url == 0"
            class="m-0 p-0"
            cols="12"
            sm="12"
          >
            <v-select
              v-model="urlSelected"
              full-width
              :items="urls"
              item-text="name"
              item-value="id"
              label="Seleccione Url"
              outlined
            ></v-select>
          </v-col>

          <!-- URL PERSONALIZADA -->
          <div
            v-if="url == 1"
          >
            <v-text-field
              v-model="long_url"
              class="px-2 py-1"
              :rules="[
                v => !!v || 'La URL es obligatorio',
                v => isURL(v) || 'URL no es válido'
              ]"
              placeholder="Ingrese URL"
              autofocus
              outlined
              required
            ></v-text-field>
          </div>

        </v-card-text>

        <v-card-actions class="pa-2">
          <v-btn outlined @click="close">Cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" type="submit">Seleccionar</v-btn>
        </v-card-actions>

      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import BackendApi from '@/services/backend.service'

export default {
  data () {
    return {
      urls: [],
      urlSelected : '',
      dialog: false,
      long_url: '',
      url:'',
      url_id: '',
      items: []
    }
  },
  computed: {
    isChooseUrl: function () {
      return this.url === undefined ? false : true
    }
  },
  mounted() {
    this.getUrl()
  },
  methods: {

    getUrl() {
      BackendApi.get('/urls').then((response) => {
        if (response.data.success) {
          this.urls = response.data.data
        }
      }).catch((error) => {
        this.$store.dispatch('app/showToast', error.response.data.message)
      })
    },

    open(url) {
      this.url = url
      // if (this.isEdit) {
      //   this.name = agenda.name
      // } else {
      //   this.name = ''
      // }
      
      this.dialog = true
    },

    close() {
      this.dialog = false
    },
    save() {
      if (this.$refs.formNewUrl.validate()) {
        // URL SELECCIONADA
        if (this.url === 0) {
          this.urls.map( ( url ) => {
            if ( url.id === this.urlSelected) {
              this.url_id = url.url_id
              this.url = url.short_url
            }
  
          } )
          this.$emit('onChooseUrl', this.url,this.url_id)
        } else { //URL PERSONALIZADA
          this.$emit('onMakeUrl', this.url, this.url_id, this.long_url)
        }

        this.close()
      }
    },
    isURL(str) {
      let url

      try {
        url = new URL(str)
      } catch (_) {
        return false
      }

      return url.protocol === 'http:' || url.protocol === 'https:'
    }
  }
}
</script>
