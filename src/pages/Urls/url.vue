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

    <!--Empty items --->
    <EmptyItems
      v-if="itemsEmpty && !isLoading"
      icon="mdi-file-link-outline"
      text="No tiene url creados. Para crear urls cortas clic en botón Crear Url Corta" 
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
import EmptyItems from '@/components/common/EmptyItems'

export default {
  components: {
    DialogCreateComponent,
    EmptyItems
  },
  data() {
    return {
      dialogUploadShow: false,
      isLoading: false,
      isUpdate : false,
      headers: [
        { text: 'Nombre', value: 'name' },
        { text: 'Links', value: 'short_url' },
        { text: 'Clicks', value: 'times_open' },
        { text: 'Última modificacion', value: 'updated' },
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
      BackendApi.get('/urls').then((response) => {
        if (response.data.success) {
          console.log(response.data.data)
          this.items = response.data.data
          this.isLoading = false
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
