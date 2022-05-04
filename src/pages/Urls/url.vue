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
        @click="openDialogCreate(undefined)"
      >
        Crear url corta
      </v-btn>
    </div>

    <v-row
      v-if="itemsEmpty && !isLoading"
      justify="center"
    >
      <v-col
        cols="9"
        lg="3"
      >
        <v-icon 
          size="200"
          color="#a8a8a8"
        >mdi-file-sync-outline</v-icon>
        <p style="color: #a8a8a8">No tiene archivos cargados. Para cargar archivos clic en "Subir archivo"</p>
      </v-col>
    </v-row>

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
              @click="openDialogCreate(item)"
              link
            >
              Modificar
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>

    <DialogCreateComponent
      ref="dialogCreate"
      @onDialogCreateFinish="onDialogCreateFinish"
    />
    
  </div>

</template>

<script>
import _ from 'lodash'
import DialogCreateComponent from './createUrl/dialogCreateComponent.vue'
import BackendApi from '@/services/backend.service'

export default {
  components: {
    
    DialogCreateComponent
  },
  data() {
    return {
      dialogUploadShow: false,
      loadingGetFiles: false,
      isUpdate : false,
      headers: [
        { text: 'Nombre', value: 'name' },
        { text: 'Links', value: 'number_of_links' },
        { text: 'Clicks', value: 'number_of_clicks' },
        { text: 'campaña', value: 'campaign_id' },
        { text: 'Última modificacion', value: 'updated' },
        { text: 'Acciones', value: 'actions' }
      ],
      urls: []
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

    openDialogCreate(item) {
      this.$refs.dialogCreate.open(item)
      // console.log(item)
    },
    onDialogCreateFinish ()  {
      this.getFiles()
    },
    getFiles () {
      this.urls = []
      this.loadingGetFiles = true
      BackendApi.get('/groupurl').then((response) => {
        if (response.data.success) {
          this.urls = response.data.data
          this.loadingGetFiles = false
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
