<template>

  <div class="d-flex flex-row flex-grow-1 mt-2">
    <!--Empty items --->
    <v-navigation-drawer
      v-model="drawer"
      :app="$vuetify.breakpoint.mdAndDown"
      :permanent="$vuetify.breakpoint.lgAndUp"
      floating
      :right="$vuetify.rtl"
      class="elevation-1 rounded flex-shrink-0"
      :class="[$vuetify.rtl ? 'ml-3' : 'mr-3']"
      width="240"
    >
      <v-list dense nav class="mt-2 pa-0">
        <div class="mx-2 mb-2">
          <v-btn outlined block @click="openNewAgenda()">
            <v-icon small left>mdi-plus</v-icon>
            Crear agenda
          </v-btn>
        </div>

        <v-list-item
          v-for="(agenda, index) in agendas"
          :key="index"
          v-model="agendaSelected"
          :to="`/tools/agendas/${agenda.id}`"
          active-class="primary--text"
          link
        >
          <v-list-item-icon>
            <v-icon small>mdi-book-open-blank-variant</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ agenda.name }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action v-if="agenda.all_contacts > 0">
            <v-badge
              inline
              color="primary"
              class="font-weight-bold"
              :content="agenda.all_contacts"
            >
            </v-badge>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <div 
      class="d-flex flex-grow-1 flex-column"
    >

      <v-toolbar class="hidden-lg-and-up flex-grow-0 mb-2">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <div class="title font-weight-bold">Agendas</div>
      </v-toolbar>
        
      <ContactsComponent 
        :key="$route.params.agendaId" 
        :agenda-id="$route.params.agendaId" 
        @onCreatedContact="refreshData"
      />
      
    </div>

    <new-agenda 
      ref="newAgenda"
      @onCreatedAgenda="onCreatedAgenda"
    />
  </div>
</template>

<script>
import newAgenda from './components/newAgenda'
import BackendApi from '@/services/backend.service'
import ContactsComponent from './components/ContactsComponent'

export default {
  components: {
    newAgenda,
    ContactsComponent
  },
  data() {
    return {
      agendas: [],
      agendaSelected: 1,
      drawer: null,
      dialogConfirm: false,
      isLoading: false
    }
  },
  computed: {
    itemsEmpty: function () {

      return this.agendas.length === 0 ? true : false
    }
  },
  mounted() {
    this.getAgendas()
  },
  methods: {
    async getAgendas() {
      this.isLoading = false
      
      const response = await BackendApi.get('/agenda')

      if (response.data.success) {
        this.agendas = response.data.data
      } else {
        this.$store.dispatch('app/showToast', response.data.message)
      }
    },
    openNewAgenda(agenda) {
      this.$refs.newAgenda.open(agenda)
    },
    confirmDelete(agenda) {
      this.deleteItem(agenda)
    },
    deleteItem(agenda) {
      BackendApi.delete('/agenda/' + agenda.id).then((response) => {
        if (response.data.success) {
          this.$store.dispatch(
            'app/showToast',
            'Agenda eliminada exitosamente'
          )
          this.dialogConfirm = false
          this.getAgendas()
        } else {
          this.$store.dispatch('app/showToast', response.data.message)
        }
      })
    },
    manage(agenda) {
      this.$router.push({
        path: '/tools/agendas/' + agenda.id + '/contacts',
        params: { agenda: agenda }
      })
    },
    refreshData() {
      this.getAgendas()
    },
    onCreatedAgenda() {
      this.getAgendas()
    }
  }
}
</script>