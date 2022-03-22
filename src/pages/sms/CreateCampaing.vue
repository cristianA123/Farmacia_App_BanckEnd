<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center pb-3 pb-0">
      <div>
        <div class="display-1">Selecciona tipo de campaña</div>
      </div>
      <v-spacer></v-spacer>
      <BackPage 
        to="services"
      />
    </div>

    <v-row>
      <v-col 
        v-for="type in types"
        :key="type.id"
      >
        <v-card
          @click="$router.push({ name: type.path })"
        >
          <v-card-text>
            <v-col
              class="justify-content-center"
            >
              <v-row>
                <h1>{{ type.name }}</h1>
              </v-row>
              <br>
              <v-row>
                <v-col>
                  <v-icon style="font-size: 90px;">{{ type.icon }}</v-icon>
                </v-col>
                <v-col>
                  {{ type.description }}
                </v-col>
              </v-row>
            </v-col>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BackPage from '@/components/common/BackPage.vue'

export default {
  components: {
    BackPage
  },
  data() {
    return {
      breadcrumbs: [{
        text: 'Servicios',
        disabled: false,
        to: '/services'
      },
      {
        text: 'SMS',
        disabled: true,
        to: '/services/create_campaing'
      }],
      types: [
        {
          name: 'Individual',
          icon: 'mdi-cellphone-text',
          description: 'Ingresa manualmente los destinatarios',
          path: 'sms-individual'
        },
        {
          name: 'Agendas',
          icon: 'mdi-contacts-outline',
          description: 'Utiliza una de tus agendas de contactos',
          path: 'sms-agendas'
        },
        {
          name: 'Excel',
          icon: 'mdi-file-excel-box-outline',
          description: 'Suba un archivo Excel',
          path: 'sms-excel'
        }
      ]
    }
  },
  methods: {
    test() {
      console.log('holis')
    }
  }
}
</script>
