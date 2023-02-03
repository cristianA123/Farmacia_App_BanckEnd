<template>
  <div class="d-flex flex-column flex-grow-1 justify-center">
    <v-row class="align-center mx-1">
      <div class="text-h6 text-lg-h4 text-md-h4 text-sm-h6">Acortador URL</div>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        small
        @click="openDialogCreate(undefined)"
      >
        Crear URL corta
      </v-btn>
      <BtnToReload />
    </v-row>
    <!--Empty items --->
    <v-col>
      <EmptyItems
        v-if="itemsEmpty && !isLoading"
        icon="mdi-link-plus"
        text="No tiene URL creados. Para crear URLS cortas clic en botón Crear URL Corta" 
      />
    
      <v-data-table
        v-else
        :headers="headers"
        :items="items"
      >
        <template v-slot:[`item.times_open`]="{ item }">
          {{ item.times_open || 0 }}
        </template>
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
                link
                @click="openDialogCreate(item)"
              >
                Modificar
              </v-list-item>
              <v-list-item
                link
                @click="openDetail(item)"
              >
                Ver detalle
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-col>
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
import EmptyItems from '@/components/common/EmptyItems'
import BtnToReload from '@/components/common/BtnToReload.vue'

export default {
  components: {
    DialogCreateComponent,
    EmptyItems,
    BtnToReload
  },
  data() {
    return {
      dialogUploadShow: false,
      isLoading: false,
      isUpdate : false,
      headers: [
        { text: 'Nombre', value: 'name' },
        { text: 'Links', value: 'short_url' },
        { text: 'Clics', value: 'times_open' },
        { text: 'Última modificación', value: 'updated' },
        { text: 'Acciones', value: 'actions' }
      ],
      items: []
    }
  },
  computed: {
    itemsEmpty: function () {

      return this.items.length === 0 ? true : false
    }
  },
  watch: {
    options: {
      handler () {
        this.getFiles()
      }
    }
  },
  mounted() {
    this.getFiles()
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
      this.items = []
      this.isLoading = true
      BackendApi.get('/urlsReport').then((response) => {
        if (response.data.success) {
          this.items = response.data.data
          this.isLoading = false
        }
      }).catch((error) => {
      })
    },
    openDetail (item)  {
      console.log(item)
      this.$router.push({ name: 'detail-short-url', params:{ id: item.id, url: item } })
    }
  }
}
</script>
