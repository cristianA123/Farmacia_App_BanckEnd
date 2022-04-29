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

    <template>
      <v-row>
        <v-col
          v-for="item in items"
          :key="item.id"
        >
          <v-card
            max-width="344"
            class="mx-auto"
          >
            <v-list-item>
              <v-list-item-avatar color="grey"> <v-icon>mdi-file-image</v-icon> </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="headline">{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>Actualizado: {{ item.updated }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-img
              :src="item.long_url"
              height="194"
            ></v-img>

            <v-card-text>
              <table>
                <tr>
                  <td>Tamaño:</td>
                  <td>{{ item.size > 0 ? item.size*1000 + 'Bytes' : item.size + 'Kb' }} </td>
                </tr>
                <tr>
                  <td>Clics:</td>
                  <td>{{ item.number_of_links }}</td>
                </tr>
                <tr>
                  <td>Link:</td>
                  <td>{{ item.short_url }}</td>
                </tr>
              </table>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="deep-purple accent-4"
                @click="openDialogUpload(item)"
              >
                Modificar
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-eye</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-content-copy</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </template>
    
    <DialogUploadComponent
      ref="dialogUpload"
      @onDialogUploadFinish="diaglogUploadFinish"
    />

  </div>

</template>

<script>
import DialogUploadComponent from './components/dialogUploadComponent.vue'
import BackendApi from '@/services/backend.service'

export default {
  components: {
    DialogUploadComponent
  },
  data() {
    return {
      show: false,
      items: [
        {
          name: 'Nuevo archivo',
          created_at: 'Hace 3 horas',
          size: '2 Mb',
          short_url: 'https://cut.pe/dq32'
        },
        {
          name: 'Nuevo archivo',
          created_at: 'Hace 3 horas',
          size: '2 Mb',
          short_url: 'https://cut.pe/14dsad'
        }
      ]
    }
  },
  mounted() {
    this.getBuckets()
  },
  methods: {
    openDialogUpload(item) {
      this.$refs.dialogUpload.open(item)
    },
    getBuckets() {
      BackendApi.get('/buckets').then((response) => {
        if (response.data.success) {
          this.items = response.data.data
        }
      })
    },
    diaglogUploadFinish() {
      this.getBuckets()
    }
  }
}
</script>
