<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Selecciona tipo de campaña</div>
      </div>
      <v-spacer></v-spacer>
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
                  <v-icon style="font-size: 90px; color: #e85a03;">{{ type.icon }}</v-icon>
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
export default {
  data() {
    return {
      types: [
        {
          name: 'Individual',
          icon: 'mdi-cellphone-text',
          description: 'Ingresa manualmente los destinatarios',
          path: 'ivr-individual'
        },
        {
          name: 'Agendas',
          icon: 'mdi-contacts-outline',
          description: 'Utiliza una de tus agendas de contactos',
          path: 'ivr-agendas'
        },
        {
          name: 'Excel',
          icon: 'mdi-file-excel-box-outline',
          description: 'Suba un archivo Excel',
          path: 'ivr-excel'
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
