<template>
  <div
    class="ml-4 my-0 py-0"
  >
    <v-row>
      <v-col
        class="ml-0 pl-0"
      >
        <v-select
          v-if="isAdmin"
          v-model="user.channel_id"
          item-text="name"
          item-value="id"
          label="Canal Unidireccional"
          :items="channels"
          :error-messages="isValidChannel_id"
          outlined
          hide-details
        ></v-select>
      </v-col>
      <v-col
        class="ml-0 pl-0"
      >
        <v-select
          v-if="isAdmin"
          v-model="user.channel_id_bi"
          item-text="name"
          item-value="id"
          label="Canal Bidireccional"
          :items="channelsBi"
          :rules="[v => !!v || 'Es obligatorio el canal Bidireccioanal']"
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
      channels: [],
      channelsBi: []
    }
  },
  computed: {
    isEdit: function () {
      
      return this.$route.params.userId !== undefined
    },
    isValidChannel_id () {
      return this.backendErrors.channel_id === undefined ? '' : this.backendErrors.channel_id
    },
    isAdmin () {
      return $cookies.get('user').isAdmin
    }
  },
  mounted() {
    this.getChannels()
    this.getChannelsBi()
  },
  methods: {
    getChannels() {
      BackendApi.get('/channelUni').then((response) => {
        if (response.data.success) {
          this.channels = response.data.data
        }
      })
    },
    getChannelsBi() {
      BackendApi.get('/channelBi').then((response) => {
        if (response.data.success) {
          this.channelsBi = response.data.data
        }
      })
    }
  }
}
</script>