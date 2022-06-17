<template>
  <div>
    <v-icon color="red" class="mr-1 pb-0 mb-0">mdi-cloud-download-outline</v-icon>
    <v-btn  
      outlined
      color="red"
      @click="downloadFile(path)"
    >
      Descargar Formato
    </v-btn>
  </div>
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