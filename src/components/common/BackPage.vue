<template>
  <div class="d-flex align-center">
    <v-btn
      class="mx-0 px-0 text"
      text
      :loading="isLoading"
      @click="backTo()"
    >
        <v-icon>bx bx-arrow-back</v-icon> Regresar
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    to: String
  },
  mounted() {
    this.isLoading = false
  },
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    backTo() {
      this.$router.push({ name: this.to })
      this.isLoading = true
    }
  }
}
</script>
