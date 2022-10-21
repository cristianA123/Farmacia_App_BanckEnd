<template>
  <div class="d-flex text-center flex-column flex-md-row flex-grow-1">
    <v-sheet class="layout-side mx-auto mx-md-1 d-none d-md-flex flex-md-column justify-space-between px-2">
      <div class="mt-3 mt-md-10 pa-2">
        <div class="display-2 font-weight-bold primary--text">
          <img src="/logo.png" width="150px" alt="">
        </div>
        <div class="title my-2">Comunícate con tus clientes de forma efectiva</div>
        <v-btn class="my-4" @click="toEnviamas">Más info aquí</v-btn>
      </div>
      <video src="/imagen movi.mp4"></video>
    </v-sheet>

    <div class="pa-2 pa-md-4 flex-grow-1 align-center justify-center d-flex flex-column">
      <div class="layout-content ma-auto w-full">
        <slot></slot>
      </div>
      <div class="overline mt-4">ENVIAMAS V2.0</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('app', ['product'])
  },
  methods: {
    toEnviamas() {
      window.location.href = 'https://enviamas.pe'
    }
  }
}
</script>

<style scoped>
.layout-side {
  width: 420px;
}

.layout-content {
  max-width: 480px;
}
</style>
