<template>
  <v-row>
    <v-col>
      <v-icon>mdi-cloud-download-outline</v-icon>
      <v-btn  
        text
        @click="downloadFile(path)"
      >
        Descargar formato Excel
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      default: ''
    }
  },
  methods: {
    downloadFile (path) {
      window.open(path, '_blank').focus()
    }
  }
}
</script>