<template>
  <div>
    <v-progress-circular
      v-if="isLoadingCredits"
      indeterminate
      color="primary"
    ></v-progress-circular>
    <div
      v-else
    >
      {{ creditsCampaing }} Créditos aprox.
    </div> 
  </div>
</template>

<script>
export default ({
  props: {
    isLoadingCredits: Boolean,
    creditsCampaing: Number
  }
})
</script>
