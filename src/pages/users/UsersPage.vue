<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Usuarios</div>
      </div>
      <v-spacer></v-spacer>
      <v-btn 
        color="primary"
        @click="createUser()"
      >
        Creación de usuario
      </v-btn>
    </div>

    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="searchText"
          append-icon="mdi-magnify"
          class="flex-grow-1 mr-md-2"
          dense
          clearable
          placeholder="Ej.: Filtrar por name, email, empresa, etc"
          outlined
          @keyup.enter="searchUser(searchText)"
        />
      </v-card-title>
      <v-data-table
        :loading="isLoading"
        :headers="headers"
        :items="users"
        :search="searchText"
        class="flex-grow-1"
      >

        <template v-slot:[`item.email`]="{ item }">
          <userAvatar :user="item" />
        </template>

        <template v-slot:[`item.status`]="{ item }">
          <v-icon v-if="item.status === 1" small color="success">
            mdi-check-circle
          </v-icon>
          <v-icon v-else small>
            mdi-circle-outline
          </v-icon>
        </template>

        <template v-slot:[`item.created`]="{ item }">
          <div>{{ item.created | formatDate('ll') }}</div>
        </template>

        <template v-slot:[`item.start_credit`]="{ item }">
          <div>{{ new Intl.NumberFormat().format(item.start_credit) }}</div>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <div class="actions">
            <v-icon @click="updateUser(item.id)">mdi-open-in-new</v-icon>
            <v-icon @click="loginUser(item)">mdi-login</v-icon>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import BackendApi from '@/services/backend.service'
import userAvatar from '@/components/reports/userAvatar'

export default {
  components: {
    userAvatar
  },
  data() {
    return {
      isLoading: false,
      users: [],
      myUser: null,
      searchText: '',
      headers: [
        { text: 'Usuario', value: 'email' },
        { text: 'Creditos inicial', value: 'credit' },
        { text: 'Creditos disponible', value: 'availableCredit' },
        { text: 'Ultima Modif.', value: 'updated_at' },
        { text: 'Estado', value: 'status' },
        { text: 'Acciones', value: 'actions' }
      ]
    }
  },
  mounted() {
    this.getUsuarios()
  },
  methods: {
    getUsuarios() {
      this.isLoading = true

      BackendApi.get('/user').then((response) => {
        if (response.data.success) {
          this.users = response.data.data
          this.isLoading = false
        } else {
          this.$store.dispatch('app/showToast', response.data.message)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    updateUser(userId) {
      this.$router.push({ path: '/config/users/register/' + userId })
    },
    createUser() {
      this.$router.push({ path: '/config/users/register' })
    },
    loginUser(item) {

      BackendApi.post('/login/' + item.id).then((response) => {
        if (response.data.success) {
          $cookies.set('user', response.data.data.user)
          $cookies.set('token', response.data.data.access_token)
          $cookies.set('services', response.data.data.services)
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
