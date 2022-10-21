<template>
  <div>
    <v-card 
      color="light-blue darken-4"
      dark
    >
      <v-card-title>URL:</v-card-title>
      <v-card-text>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>USUARIO:</v-list-item-title>
            <v-list-item-subtitle>{{ getUserName }} {{ getCompanyName }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>NOMBRE DE LA URL:</v-list-item-title>
            <v-list-item-subtitle>{{ getUrlName }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>URL CORTA:</v-list-item-title>
            <v-list-item-subtitle>{{ getUrlShort }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>URL ORIGINAL:</v-list-item-title>
            <v-list-item-subtitle>{{ getUrlLong }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>FECHA Y HORA:</v-list-item-title>
            <v-list-item-subtitle>{{ getcreated }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import BackendApi from '@/services/backend.service'
import moment from 'moment'

moment.locale('es')
export default {
  data () {
    return {
      company:  null,
      user:  null,
      url:  null
    }
  },
  computed:{
    getCompanyName () {
      return this.company?.company ? '(' + this.company?.company + ')' : ''
    },
    getUserName () {
      return this.user?.name || ''
    },
    getUrlName () {
      return this.url?.name || ''
    },
    getUrlShort () {
      return this.url?.short_url || ''
    },
    getUrlLong () {
      return this.url?.long_url || ''
    },
    getcreated () {
      return moment(this.url?.created_at).format('Y-M-D H:M:S') || ''
    }
  },
  created() {
    this.getDetailUrl()
  },
  mounted() {
  },
  methods: {
    getDetailUrl() {
      BackendApi.get('/url/' + this.$route.params.id).then(({ data }) => {
        if (data.success) {
          this.company = data.data.company
          this.user = data.data.user
          this.url = data.data.url
        }
      }).catch((error) => {
      })
    }
  }
}
</script>

<style>

</style>