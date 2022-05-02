<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Reporte de servicios</div>
      </div>
      <v-spacer></v-spacer>
    </div>

    <!-- dash campaing detail -->
    <DashDetailComponent/>

    <!-- componente url campaing detail -->
    <UrlDashDetailComponent/>

    <!-- pagination -->
    <!-- <v-card>
      <v-card-title>
        Resultados:
        <v-spacer></v-spacer>
        <v-text-field
          v-model="searchText"
          v-debounce:250="getSms"
          append-icon="mdi-magnify"
          class="flex-grow-1 mr-md-2"
          dense
          clearable
          placeholder="Ej.: Filtrar por name, email, empresa, etc"
        />
      </v-card-title>
      <v-data-table
        :headers="headers" 
        :items="campaigns"
        hide-default-footer 
        class="elevation-1"
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
        <p>{{campaigns}}</p>
      </v-data-table>
      <v-pagination
        v-model="pagination.current"
        :length="pagination.total"
        @input="onPageChange"
      ></v-pagination>
    </v-card> -->
    <DetailCampaignComponent/>

  </div>

</template>

<script>
import BackendApi from '@/services/backend.service'
import DashDetailComponent from './components/DashDetailComponent.vue'
import UrlDashDetailComponent from './components/UrlDashDetailComponent.vue'
import DetailCampaignComponent from './components/DetailCampaignComponent.vue'

export default {
  name:'DetailSmsReport',
  components:{
    DashDetailComponent,
    UrlDashDetailComponent,
    DetailCampaignComponent
  },
  data () {
    return {
      
    }
  }

}
</script>

<style>

</style>