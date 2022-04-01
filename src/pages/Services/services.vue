<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3 pb-0">
      <div>
        <div class="display-1">Selecciona el servicio a utilizar</div>
      </div>
      <v-spacer></v-spacer>
    </div>

    <v-col
      class="pt-0"
    >
      <v-row>
        <v-col
          v-for="service in services"
          :key="service.id"
          class="pl-0"
          cols="12"
          sm="12"
          lg="3"
        >
          <v-card
            :color="selectedService == service.id ? 'success' : null"
            elevation="24"
            @click="selectServie(service)"
          >
            <v-card-title
              :class="{ 'white-text': selectedService == service.id ? true : false }"
            >
              {{ service.name }}
            </v-card-title>
            <v-card-text>
              <v-icon style="font-size: 90px;" :class="{ 'white-text': selectedService == service.id ? true : false }">{{ service.icon }}</v-icon>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>

  </div>
</template>

<script>
import BackendApi from '@/services/backend.service'

export default {
  data() {
    return {
      breadcrumbs: [{
        text: 'Servicios',
        disabled: false,
        to: '/services'
      }],
      services: [],
      selectedService: null,
      options: null
    }
  },
  mounted() {
    this.getServices()
  },
  methods: {
    getServices() {
      BackendApi.get('/userServices').then((response) => {
        if (response.data.success) {
          this.services =   response.data.data
        }
      })
    },    
    selectServie(service) {

      this.selectedService = service.id

      setTimeout(() => {
        this.$router.push({ name: service.path })
      }, 300)
    }
  }
}
</script>

<style>

.white-text {
  color: #FFF !important;
}

</style>
