<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Acortador URL</div>
      </div>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        @click="dialogUploadShow = true"
      >
        Crear URL corta
      </v-btn>
    </div>

    <v-row class="pa-2 align-center">
      <v-col>
        <v-row>
          <v-spacer></v-spacer>
          <v-col  class="col-12 col-lg-6 col-xl-6 d-flex text-right align-center">
            <v-text-field
              v-model="searchText"
              append-icon="mdi-magnify"
              class="flex-grow-1 mr-md-2"
              solo
              hide-details
              dense
              clearable
              placeholder="Ej.: Nombre de URL"
              v-debounce:800="getFiles"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            class="col-12 col-lg-4 col-xl-3"
            v-for="url in urls"
            :key="url.id"
          >  
            <v-card
              elevation="24"
            >
              <v-card-title class="text-h5 justify-center">
                {{ url.name }}
              </v-card-title>

              <v-card-text>

                <v-col>
                  <v-row>
                    <v-icon>mdi-account</v-icon> {{ url.user_email }}
                  </v-row>
                  <v-row>
                    <v-icon>mdi-history</v-icon> {{ url.created_at }}
                  </v-row>
                  <v-row>
                    <v-icon>mdi-link-variant</v-icon> 
                    <Copy-Label 
                      :text="url.url"
                    />
                  </v-row>
                </v-col>
                <v-card-actions>
                  <v-row
                    align="center"
                    justify="end"
                    class="mr-1"
                  >
                    <v-icon class="mr-1">
                      mdi-eye-check-outline
                    </v-icon>
                    Visualizaciones: 
                    {{ new Intl.NumberFormat().format(url.clics) }}
                  </v-row>
                </v-card-actions>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="lengthPagination"
            circle
            @input="getFiles()"
          ></v-pagination>
        </div>

      </v-col>
    </v-row>

    <Dialog-Create
      :show="dialogUploadShow"
      @onClose="onClose"
    />

    <!----- Snackbar  -->
    <template>
      <div class="text-center ma-2">
        <v-snackbar
          v-model="snackbar"
        >
          {{ textSnackbar }}

          <template v-slot:action="{ attrs }">
            <v-btn
              color="pink"
              text
              v-bind="attrs"
              @click="snackbar = false"
            >
              Cerrar
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </template>
    
  </div>

</template>

<script>
import _ from 'lodash'
import CopyLabel from '@/components/common/CopyLabel'
import DialogCreate from './createUrl/dialogCreate'
import BackendApi from '@/services/backend.service'

export default {
  components: {
    CopyLabel,
    DialogCreate
  },
  data() {
    return {
      dialogUploadShow: false,
      loadingGetFiles: false,
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
      const payload = { 
        page: this.page, 
        searchText: this.searchText, 
        filesPerPage: this.filesPerPage 
      }

      BackendApi.get('/getUrls').then((response) => {
        if (response.data.success) {
          this.urls = []
          this.urls = response.data.data.urls
          this.lengthPagination = response.data.data.numberOfPages
        } else {
          this.snackbar = true
          this.textSnackbar = response.data.message
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
