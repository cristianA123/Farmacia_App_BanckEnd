<template>
  <div class="d-flex align-center py-1">
    <v-avatar
      color="primary"
      size="40"
    >
      <span class="white--text text-h6">{{ computedAvatarName }}</span>
    </v-avatar>
    <v-col v-if="detail" class="py-0 my-0">
      <v-row>
        <div class="ml-1 caption font-weight-bold">
          {{ user.name }}
        </div>
      </v-row>
      <v-row>
        <div class="ml-1 caption">
          {{ user.email }}
        </div>
      </v-row>
      <v-row>
        <div class="ml-1 caption">
          {{ user.company }}
        </div>
      </v-row>
    </v-col>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {}
    },
    detail: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    computedAvatarName : function () {
      const array = this.user.name.split(' ')
      let first = ''
      let second = ''
      let text = ''

      if (array.length > 1) {
        first = array[0].slice(0, 1)
        second = array[1].slice(0, 1)

        text = first + second
      } else {
        first = array[0].slice(0, 1)

        text = first
      }

      return text.toUpperCase()
    }
  }
}
</script>
