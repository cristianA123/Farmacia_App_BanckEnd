<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Selecciona el servicio a utilizar</div>
      </div>
      <v-spacer></v-spacer>
    </div>

    <v-row>
      <v-col
        v-for="type in types"
        :key="type.id"
        class="col-lg-3"
      >
        <v-card
          @click="$router.push({ name: type.path })"
        >
          <v-card-title>
            {{ type.name }}
          </v-card-title>
          <v-card-text>
            <v-icon style="font-size: 90px; color: #e85a03;">{{ type.icon }}</v-icon>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      types: [
        {
          name: 'SMS',
          icon: 'mdi-cellphone-text',
          description: 'Ingresa manualmente los destinatarios',
          path: 'create-campaing-sms'
        },
        {
          name: 'IVR',
          icon: 'mdi-phone-in-talk',
          description: 'Utiliza una de tus agendas de contactos',
          path: 'create-campaing-ivr'
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
