<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Archivos cloud</div>
      </div>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        @click="dialogUploadShow = true"
      >
        Subir archivo
      </v-btn>
    </div>

    <v-row class=" align-center">
      <v-col>
        <v-row>
          <v-spacer></v-spacer>
          <v-col class="py-0 col-12 col-lg-6 col-xl-6 d-flex text-right align-center">
            <v-text-field
              v-model="searchText"
              append-icon="mdi-magnify"
              class="flex-grow-1 mr-md-2"
              solo
              dense
              clearable
              placeholder="Filtrar por nombre de archivo"
              v-debounce:250="getFiles"
              :loading="loadingGetFiles"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            class="col-12 col-lg-4 col-xl-3"
            v-for="file in files"
            :key="file.id"
          >  
            <v-card
              elevation="24"
            >
              <v-card-title class="text-h5 justify-center">
                {{ file.name }}
              </v-card-title>

              <v-card-text>
                <v-row class="justify-center">
                  <v-col>
                    <img :src="file.original_url" width="100px">
                  </v-col>
                  <v-col>
                    <v-row>
                      <v-icon>mdi-account</v-icon> {{ file.user_email }}
                    </v-row>
                    <v-row>
                      <v-icon>mdi-history</v-icon> {{ file.created_at }}
                    </v-row>
                    <v-row>
                      <v-icon>mdi-link-variant</v-icon> 
                      <Copy-Label 
                        :text="file.url"
                      />
                    </v-row>
                  </v-col>
                </v-row>

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
                    {{ new Intl.NumberFormat().format(file.clics) }}
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

    <Dialog-Upload 
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
import DialogUpload from './uploadFile/dialogUpload'
import axios from 'axios'

export default {
  components: {
    CopyLabel,
    DialogUpload
  },
  data() {
    return {
      dialogUploadShow: false,
      loadingGetFiles: false,
      files: [],
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
      
      axios.get('/getFiles', { params: payload, headers: { Authorization: 'Bearer ' + window.localStorage.token } }).then((response) => {
        if (response.data.success) {
          this.files = []
          this.files = response.data.data.files
          this.lengthPagination = response.data.data.numberOfPages
        } else {
          this.snackbar = true
          this.textSnackbar = response.data.message
        }
        this.loadingGetFiles = false
      })
        .catch((error) => {
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
