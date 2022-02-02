<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Usuarios</div>
      </div>
      <v-spacer></v-spacer>
      <v-btn 
        color="primary"
        @click="registrarUsuario(null, 'create')"
      >
        Creación de usuario
      </v-btn>
    </div>

    <v-card>
      <v-card-title>
        Lista de usuarios:
        <v-spacer></v-spacer>
        <v-text-field
          v-model="searchQuery"
          append-icon="mdi-magnify"
          class="flex-grow-1 mr-md-2"
          dense
          clearable
          placeholder="Ej.: Filtrar por name, email, empresa, etc"
          @keyup.enter="searchUser(searchQuery)"
        />
      </v-card-title>
      <v-data-table
        v-model="selectedUsers"
        :loading="isLoading"
        :headers="headers"
        :items="usuarios"
        :search="searchQuery"
        class="flex-grow-1"
      >

        <template v-slot:item.email="{ item }">
          <userAvatar :user="item" />
        </template>

        <template v-slot:item.status="{ item }">
          <v-icon v-if="item.status === 1" small color="success">
            mdi-check-circle
          </v-icon>
          <v-icon v-else small>
            mdi-circle-outline
          </v-icon>
        </template>

        <template v-slot:item.created="{ item }">
          <div>{{ item.created | formatDate('ll') }}</div>
        </template>

        <template v-slot:item.start_credit="{ item }">
          <div>{{ new Intl.NumberFormat().format(item.start_credit) }}</div>
        </template>

        <template v-slot:item.actions="{ item }">
          <div class="actions">
            <v-icon @click="registrarUsuario(item, 'edit')">mdi-open-in-new</v-icon>
            <v-icon @click="loginUser(item)">mdi-login</v-icon>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import users from './content/users'
import axios from 'axios'
import userAvatar from '@/components/reports/userAvatar'

export default {
  components: {
    userAvatar
  },
  data() {
    return {
      usuarios: [],
      myUser: null,
      isLoading: false,
      breadcrumbs: [{
        text: 'Users',
        disabled: false,
        href: '#'
      }, {
        text: 'List'
      }],
      searchQuery: '',
      selectedUsers: [],
      headers: [
        { text: 'Email', value: 'email' },
        { text: 'Creditos disponible', value: 'start_credit' },
        { text: 'Creación', value: 'created_at' },
        { text: 'Estado', value: 'status' },
        { text: 'Acciones', value: 'actions' }
      ],
      users
    }
  },
  mounted() {
    this.getUsuarios()
  },
  methods: {
    searchUser() {},
    open() {},
    getUsuarios() { 
      this.usuarios = [
        {
          email: 'mterrones.ra@gmail.com',
          name: 'Marco Terrones',
          start_credit: 1000,
          created_at: 'Hace 3 horas',
          status: 1
        }
      ]
      /*
      this.isLoading = true

      axios.get('/creditsUsedByEachUser', { headers: { Authorization: 'Bearer ' + window.localStorage.token } }).then((response) => {
        if (response.data.success) {
          this.usuarios = Object.values(response.data.data.subUsers)
          this.myUser = response.data.data.myUser
          this.isLoading = false
        } else {
          this.$store.dispatch('app/showToast', response.data.message)
        }
      }).catch((error) => {
        console.log(error)
      })*/
    },
    computedColor(status) {
      if (status !== 1) {
        return 'pink'
      } else {
        return 'primary'
      }
    },
    registrarUsuario(item, mode) {
      let data = null

      if (mode === 'create') {
        data = {
          'parent_id': this.myUser.id,
          'name': '',
          'email': '',
          'company': this.myUser.company,
          'status': 1,
          'start_credit': 0,
          'balance': 0,
          'sms_out': 0,
          'sms_in': 0,
          'ivr': 0,
          'whatsapp': 0,
          'asignado': 0,
          'service_sms':this.myUser.service_sms,
          'route_name': this.myUser.route_name,
          'service_ivr': this.myUser.service_ivr,
          'service_whatsapp': this.myUser.service_whatsapp
        }
      } else {
        data = item
      }

      this.$store.dispatch('userRegistration', { user: data, myUser: this.myUser, mode: mode })
    },
    loginUser(item) {

      const payload = {
        user_id: item.id
      }

      axios.post('/tokenById', payload, { headers: { 'Authorization': 'Bearer ' + window.localStorage.token } }).then((response) => {
        if (response.data.success) {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          localStorage.setItem('token', response.data.data.token)
          location.reload()
        } else {
          this.$store.dispatch('app/showToast', response.data.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
