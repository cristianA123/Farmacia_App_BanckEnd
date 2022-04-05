<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Acortador url</div>
      </div>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        @click="dialogUploadShow = true"
      >
        Crear url corta
      </v-btn>
    </div>

    <v-data-table
      :headers="headers"
      :items="urls"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-menu
          offset-y
        >
          <template v-slot:activator="{ attrs, on }">
            <v-btn
              v-bind="attrs"
              v-on="on"
            >
              Acciones
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              @click="updateUrl(item.id)"
              link
            >
              Modificar
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>

    <Dialog-Create
      :show="dialogUploadShow"
      :isUpdate="isUpdate"
      :url="url"
      :name="name"
      :urlId="urlId"
      :isBtnEnable="isBtnEnable"
      @onClose="onClose"
    />
    
  </div>

</template>

<script>
import _ from 'lodash'
import DialogCreate from './createUrl/dialogCreate'
import BackendApi from '@/services/backend.service'

export default {
  components: {
    
    DialogCreate
  },
  data() {
    return {
      dialogUploadShow: false,
      loadingGetFiles: false,
      isUpdate : false,
      headers: [
        { text: 'Número de links', value: 'number_of_links' },
        { text: 'Número de clicks', value: 'number_of_clicks' },
        { text: 'campaña', value: 'campaign_id' },
        { text: 'Última modificacion', value: 'updated' },
        { text: 'Acciones', value: 'actions' }
      ],
      urls: [],
      lengthPagination: 1,
      page: 1,
      searchText: '',
      snackbar: false,
      textSnackbar: '',
      filesPerPage: 12,
      url:'',
      name:'',
      url_id: null,
      isBtnEnable:false

    }
  },
  mounted() {
    this.getFiles()
  },
  watch: {
    options: {
      handler () {
        this.getFiles()
      }
    }
  },
  methods: {
    getFiles () {
      this.name = ''
      this.url = ''
      this.loadingGetFiles = true

      BackendApi.get('/groupurl').then((response) => {
        if (response.data.success) {
          this.urls = response.data.data
        }

        this.loadingGetFiles = false
      }).catch((error) => {
        console.log(error)
      })
    },
    onClose () {
      this.isUpdate = false
      this.dialogUploadShow = false
      this.getFiles()
    },

    async updateUrl(urlId) { 
      this.isUpdate = true
      this.dialogUploadShow = true
      this.urlId  = urlId
      await BackendApi.get('/url/' + urlId).then((response) => {
        if (response.data.success) {
          this.url = response.data.data.long_url
          this.name = response.data.data.name
        } else {
          this.$store.dispatch('app/showToast', response.data.message)
        }
      }).catch((error) => {
        console.log(error)
      })             
      console.log(urlId)
      console.log(this.url)
    } 
  }
}
</script>
