<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Archivos</div>
      </div>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        @click="openDialogUpload()"
      >
        Subir archivo
      </v-btn>
    </div>

    <v-col>
      <!--Skeleton Loader --->
      <v-row  
        v-if="isLoading"
      >
        <v-col>
          <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            type="card"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      
      <!--Empty items --->
      <EmptyItems
        v-if="itemsEmpty && !isLoading"
        icon="mdi-file-sync-outline"
        text="No tiene archivos cargados. Para cargar archivos clic en Subir archivo" 
      />

      <!--Show Items --->
      <v-row
        v-else
      >
        <v-col
          v-for="item in items"
          :key="item.id"
        >
          <v-card
            width="300px"
          >
            <v-list-item>
              <v-list-item-avatar color="grey"> <v-icon>mdi-file-image</v-icon> </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline">{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>Actualizado: {{ item.updated }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-img
              :src="item.thumbnail"
              height="194"
            ></v-img>

            <v-card-text>
              <table>
                <tr>
                  <!-- Math.round(num / 100) * 100 -->
                  <td>Tamaño:</td>
                  <!-- <td>{{ item.size }} </td> -->
                  <!-- <td>{{ item.size > 0 ? Math.round(item.size*1000/100)*100 + 'Bytes' : Math.round(item.size*100)/100 + 'Kb' }} </td> -->
                  <td>{{ Math.round(item.size) + ' Kb' }} </td>
                </tr>
                <tr>
                  <td>Clis:</td>
                  <td>{{ n_clics(item) }}</td>
                </tr>
                <tr>
                  <td>Link:</td>
                  <td>{{ item.short_url.length > 25 ? item.short_url.substring(0,25) + '...' : item.short_url }} </td>
                  <!-- <td>{{ item.short_url }} </td> -->
                </tr>
              </table>
            </v-card-text>
            <v-card-actions>
              <v-btn
                icon
                color="deep-purple accent-4"
                @click="openDialogUpload(item)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    v-on="on"
                    @click="ShowFile(item)"
                  >
                    <v-icon>mdi-eye</v-icon>
                    <a  
                      :id="item.id" 
                      :href="item.long_url" 
                      target="_blank"
                    ></a>
                  </v-btn>
                </template>
                <span>Ver archivo</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    v-on="on"
                    @click="copyLink(item)"
                  >
                    <v-icon>mdi-content-copy</v-icon>
                  </v-btn>
                </template>
                <span>Copiar Link</span>
              </v-tooltip>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    
    <DialogUploadComponent
      ref="dialogUpload"
      @onDialogUploadFinish="diaglogUploadFinish"
    />

  </div>

</template>

<script>
import DialogUploadComponent from './components/dialogUploadComponent.vue'
import BackendApi from '@/services/backend.service'
import EmptyItems from '@/components/common/EmptyItems'

export default {
  components: {
    DialogUploadComponent,
    EmptyItems
  },
  data() {
    return {
      show: false,
      items: [],
      isLoading: false
    }
  },
  computed: {
    itemsEmpty: function () {

      return this.items.length === 0 ? true : false
    },
    image (item) {
      if ( item.extension !== 'jpeg' || item.extension !== 'jpg' || item.extension !== 'png' || item.extension !== 'bmp' || item.extension !== 'gif' || item.extension !== 'eps' || item.extension !== 'svg') {
        
        return item.long_url
      } else {
        return item.long_url
      }

    }
  },
  mounted() {
    this.getBuckets()
  },
  methods: {
    openView (url) {
      window.open(url)
    },
    openDialogUpload(item) {
      this.$refs.dialogUpload.open(item)
    },
    getBuckets() {
      this.isLoading = true
      BackendApi.get('/buckets').then((response) => {
        this.isLoading = false
        if (response.data.success) {
          
          this.items = response.data.data
          console.log( this.items)
        }
      })
    },
    diaglogUploadFinish() {
      this.getBuckets()
    },
    ShowFile (item) {
      document.getElementById(item.id).click()
    },
    copyLink (item) {
      navigator.clipboard.writeText(item.short_url)
    },
    n_clics(item) {
      return item.number_of_clicks || 0
    }
  }
}
</script>
