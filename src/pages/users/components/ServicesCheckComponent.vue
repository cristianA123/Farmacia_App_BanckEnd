<template>
  <div
    class="ml-4 my-0 py-0"
  >
    <v-row>
      <v-col
        class="ml-0 pl-0"
      >
        <v-select
          v-model="user.channel_id"
          item-text="name"
          item-value="id"
          label="Canal"
          :items="channels"
          :error-messages="isValidChannel_id"
          outlined
          hide-details
        ></v-select>
      </v-col>
    </v-row>

    <v-row
      v-for="(service) in services"
      :key="service.id"
    >
      <v-checkbox
        v-model="service.status"
        :label="service.name"
        hide-details
      ></v-checkbox>
    </v-row> 
  </div> 
</template>

<script>
import BackendApi from '@/services/backend.service'

export default {
  props: {
    services: {
      type: Array,
      default: () => []
    },
    user: {
      type: Object,
      default: () => {}
    },
    backendErrors: {
      type: Object,
      default: () => ({ provider_id : '' })
    }
  },
  data() {
    return {
      channels: []
    }
  },
  computed: {
    isEdit: function () {
      
      return this.$route.params.userId !== undefined
    },
    isValidChannel_id () {
      return this.backendErrors.channel_id === undefined ? '' : this.backendErrors.channel_id
    }
  },
  mounted() {
    this.getChannels()
  },
  methods: {
    getChannels() {
      BackendApi.get('/channel').then((response) => {
        if (response.data.success) {
          this.channels = response.data.data
        }
      })
    }
  }
}
</script>