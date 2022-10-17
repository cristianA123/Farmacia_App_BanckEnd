<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Agendas</div>
      </div>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        @click="openNewAgenda()"
      >
        Crear agenda
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
      <new-agenda ref="newAgenda" @onCreatedAgenda="refresh" />
    </v-col>
  </div>

</template>

<script>
import newAgenda from './components/newAgenda'
import BackendApi from '@/services/backend.service'
import EmptyItems from '@/components/common/EmptyItems'
import router from '../../router'

export default {
  components: {
    EmptyItems,
    newAgenda
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
    }
  },
  mounted() {
    this.getAgendas()
  },
  methods: {
    getAgendas() {
      this.isLoading = true
      BackendApi.get('/agenda').then((response) => {
        this.isLoading = false
        if (response.data.success) {
          this.items = response.data.data
        }

        if (this.items.length > 0) {
          router.push({ path: '/tools/agendas/' + this.items[0].id })
        }
      })
    },
    openNewAgenda(agenda) {
      this.$refs.newAgenda.open(agenda)
    },
    refresh() {
      this.getAgendas()
    }
  }
}
</script>
