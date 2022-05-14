<template>
  <div>
    <v-icon>mdi-cloud-download-outline</v-icon>
    <v-btn  
      text
      @click="downloadFile(path)"
    >
      Formato Xlsx
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