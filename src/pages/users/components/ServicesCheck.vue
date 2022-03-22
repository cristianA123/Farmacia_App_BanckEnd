<template>
  <div
    class="ml-4 my-0 py-0"
  >
    <v-row
      v-for="(service) in services"
      :key="service.id"
    >
      <v-checkbox
        v-model="service.status"
        :label="service.name"
        @change="onChange"
        hide-details
      ></v-checkbox>
    </v-row> 
  </div> 
</template>

<script>
import BackendApi from '@/services/backend.service'

export default {
  data() {
    return {
      services: []
    }
  },
  computed: {
    isEdit: function () {
      
      return this.$route.params.userId !== undefined
    }
  },
  mounted() {
    this.getServices()
  },
  methods: {
    getServices() {
      if (this.isEdit) {
        BackendApi.get('/user/' + this.$route.params.userId).then((response) => {
          if (response.data.success) {
            this.services = response.data.data.father_services
          }
        })
      } else {
        BackendApi.get('/userServices').then((response) => {
          if (response.data.success) {
            this.services = response.data.data
          }
        })
      }
    },
    onChange() {

      const returnServices = []

      this.services.forEach((element) => {
        if (element.status !== undefined) {
          returnServices.push({
            service_id: element.service_id,
            status: element.status
          })
        }
      })

      this.$emit('onChange', returnServices)
    }
  }
}
</script>