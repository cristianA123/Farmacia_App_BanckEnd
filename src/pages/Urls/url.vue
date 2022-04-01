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
    ></v-data-table>

    <Dialog-Create
      :show="dialogUploadShow"
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
      headers: [
        { text: 'Usuario', value: 'email' },
        { text: 'Nombre', value: 'name' }
      ],
      urls: [],
      lengthPagination: 1,
      page: 1,
      searchText: '',
      snackbar: false,
      textSnackbar: '',
      filesPerPage: 12
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
      this.loadingGetFiles = true

      BackendApi.get('/urls').then((response) => {
        if (response.data.success) {
          this.urls = response.data.data
        }

        this.loadingGetFiles = false
      }).catch((error) => {
        console.log(error)
      })
    },
    onClose () {
      this.dialogUploadShow = false
      this.getFiles()
    }
  }
}
</script>
