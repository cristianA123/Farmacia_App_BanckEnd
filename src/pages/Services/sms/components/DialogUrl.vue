<template>
  <v-dialog v-model="dialog" width="600">
    <v-card>
      <v-form
        ref="formNewAgenda"
        lazy-validation
        @submit.prevent="save()"
      >

        <v-card-title class="pa-2">
          Selecciones una URL
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-col
            v-if="url == 0"
            class="d-flex"
            cols="12"
            sm="6"
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

          <!-- task form -->
          <div
            v-if="url == 1"
          >
            <v-text-field
              v-model="long_url"
              class="px-2 py-1"
              solo
              flat
              placeholder="Ingrese URL"
              autofocus
              outlined
              required
            ></v-text-field>

            <v-divider></v-divider>
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
      items: ['Foo', 'Bar', 'Fizz', 'Buzz']
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

      if (this.url === 0) {
        this.urls.map( ( url ) => {
          if ( url.id === this.urlSelected) {
            this.url_id = url.url_id
            this.url = url.short_url
          }
  
        } )
  
        // if (this.$refs.formNewAgenda.validate()) {
        console.log(this.url_id)
        console.log(this.url)
        console.log(this.urlSelected)
        this.$emit('onChooseUrl', this.url,this.url_id)
      } else {
        this.$emit('onMakeUrl', this.url,this.url_id,this.long_url)

        console.log( this.long_url)
      }

      this.close()

      // }
    }
  }
}
</script>
