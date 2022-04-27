<template>
  <div>
    <!-- componente de prueba -->
    <v-card>
      <v-card-title>
        Resultados:
        <v-spacer></v-spacer>
        <v-text-field
          v-model="searchText"
          v-debounce:250="getSms"
          append-icon="mdi-magnify"
          class="flex-grow-1 mr-md-2"
          dense
          clearable
          placeholder="Ej.: Filtrar por name, email, empresa, etc"
        />
      </v-card-title>
      <v-data-table
        :headers="headers" 
        :items="users"
        hide-default-footer 
        class="elevation-1"
      ></v-data-table>
        
      <v-pagination
        v-model="pagination.current"
        :length="pagination.total"
        @input="onPageChange"
      ></v-pagination>
    </v-card>
  </div>

</template>

<script>
import BackendApi from '@/services/backend.service'
import _ from 'lodash'

export default {
  data() {
    return { 
      headers: [
        { text: 'Content', value: 'content' },
        { text: 'Phone', value: 'phone' },
        { text: 'Credit', value: 'credit' },
        { text: 'Comment', value: 'comment' }
      ],
      searchQuery: '',
      searchText: '',
      users: [],
      pagination: {
        current: 1,
        total: 0
      }
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    getUsers() {

      const payload = {
        campaign_id : 3,
        service_id : 1,
        searchtext : ''
      }

      BackendApi.post('/smsCampaignDetail?page=' + this.pagination.current,payload)
        .then((response) => {
          this.users = response.data.data.data
          console.log(this.users)
          this.pagination.current = response.data.data.current_page
          this.pagination.total = response.data.data.last_page
        })
    },

    onPageChange() {
      this.getUsers()
    },

    getSms() {
      console.log(this.searchText)
      const payload = {
        campaign_id : 3,
        service_id : 1,
        searchtext : this.searchText
      }

      BackendApi.post('/smsCampaignDetail?page=' + this.pagination.current,payload)
        .then((response) => {
          this.users = response.data.data.data
          console.log(this.users)
          this.pagination.current = response.data.data.current_page
          this.pagination.total = response.data.data.last_page
        })
    }
  }
}
</script>

<style>

</style>