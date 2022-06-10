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

    <!--Empty items --->
    <EmptyItems
      v-if="itemsEmpty && !isLoading"
      icon="mdi-contacts"
      text="No tiene agendas creadas. Para crear agendas cortas clic en botón Crear Nueva Agenda" 
    />

    <v-card
      v-else
    >
      <v-col>
        <v-row>
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
        </v-row>
      </v-col>
      <v-data-table
        :loading="isLoading"
        :headers="headers"
        :items="items"
        :search="searchText"
        class="flex-grow-1"
      >
       
        <template v-slot:[`item.email`]="{ item }" >
          <div class="d-none d-lg-block">
            <userAvatar :user="item" />
          </div>

          <div class="d-lg-none">
            {{ item.email }}
          </div>

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

        <template v-slot:[`item.credit`]="{ item }">
          <div>{{ item.credit | formatCurrency(configFormat) }}</div>
        </template>

        <template v-slot:[`item.availableCredit`]="{ item }">
          <div>{{ item.availableCredit | formatCurrency(configFormat) }}</div>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-menu
            offset-y
          >
            <template v-slot:activator="{ attrs, on }">
              <v-btn
                v-bind="attrs"
                v-on="on"
              >
                Acciones
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                link
                @click="updateUser(item.id)"
              >
                Modificar
              </v-list-item>
            </v-list>
            <v-list
              v-if="item.status"
            >
              <v-list-item
                link
                @click="confirmDisabled(item)"
              >
                Deshabilitar
              </v-list-item>
            </v-list>
            <v-list
              v-else
            >
              <v-list-item
                link
                @click="confirmEnabled(item)"
              >
                Habilitar
              </v-list-item>
            </v-list>
            <v-list
              v-if="isAdmin"
            >
              <v-list-item
                link
                @click="confirmLoginUser(item)"
              >
                Iniciar sesión
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>

    <!--- Login User -->
    <v-dialog
      v-model="dialogConfirmLoginUser"
      width="600px"
    >
      <v-card>
        <v-card-title> <v-icon>mdi-login-variant</v-icon>Iniciar sesión</v-card-title>

        <v-card-text>
          <p style="font-size: 18px">Está seguro que desea iniciar sesión con este usuario?</p>
        </v-card-text>

        <v-card-actions>
          <v-btn text>Cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click="loginUser()">Iniciar sesión</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--- Disable User -->
    <v-dialog
      v-model="dialogConfirmDisabledUser"
      width="600px"
    >
      <v-card>
        <v-card-title> <v-icon>mdi-account-cancel</v-icon> Deshabilitar usuario</v-card-title>

        <v-card-text>
          <p style="font-size: 18px">Está seguro que desea deshabilitar a este usuario?</p>
        </v-card-text>

        <v-card-actions>
          <v-btn text>Cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click="disableUser()">Deshabilitar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--- Enabled User -->
    <v-dialog
      v-model="dialogConfirmEnabledUser"
      width="600px"
    >
      <v-card>
        <v-card-title> <v-icon>mdi-account-cancel</v-icon> Habilitar usuario</v-card-title>

        <v-card-text>
          <p style="font-size: 18px">Está seguro que desea habilitar a este usuario?</p>
        </v-card-text>

        <v-card-actions>
          <v-btn text>Cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click="enableUser()">Habilitar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import BackendApi from '@/services/backend.service'
import userAvatar from '@/components/reports/userAvatar'
import EmptyItems from '@/components/common/EmptyItems'

export default {
  components: {
    userAvatar,
    EmptyItems
  },
  data() {
    return {
      erros:{
        email:'',
        password:''
      },
      selectedUser: null,
      dialogConfirmLoginUser: false,
      dialogConfirmDisabledUser: false,
      dialogConfirmEnabledUser: false,
      isLoading: false,
      items: [],
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
  computed: {
    itemsEmpty: function () {

      return this.items.length === 0 ? true : false
    },
    configFormat: function () {
      return {
        decimalDigits: 0,
        decimalSeparator: '.',
        thousandsSeparator: ',',
        currencySymbol: '',
        currencySymbolNumberOfSpaces: 0,
        currencySymbolPosition: 'left'
      }
    },
    isValidEmail () {
      return this.erros.email === undefined ? '' : this.erros.email
    },
    isValidPassword () {
      return this.erros.password === undefined ? '' : this.erros.password
    },
    isAdmin () {
      return $cookies.get('user').isAdmin
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      this.isLoading = true

      BackendApi.get('/user').then((response) => {
        if (response.data.success) {
          this.items = response.data.data
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
    loginUser() {

      BackendApi.post('/login/' + this.selectedUser.id)
        .then((response) => {
          if (response.data.success) {
            $cookies.set('user', response.data.data.user)
            $cookies.set('token', response.data.data.access_token)
            $cookies.set('services', response.data.data.services)
            window.location.href = '/'
          } else {
            this.$store.dispatch('app/showToast', response.data.message)
          }
        })
        .catch( (error) => {
          this.erros = error.response.data.errors
        } )
    },
    disableUser() {
      const payload = {
        status: false
      }

      BackendApi.post('/disable/' + this.selectedUser.id, payload).then((response) => {
        if (response.data.success) {
          this.$store.dispatch('app/showToast', response.data.message)
          this.dialogConfirmDisabledUser = false
          this.getUsers()
        } else {
          this.$store.dispatch('app/showToast', response.data.message)
        }
      })
    },
    enableUser() {
      const payload = {
        status: true
      }

      BackendApi.post('/disable/' + this.selectedUser.id, payload).then((response) => {
        if (response.data.success) {
          this.$store.dispatch('app/showToast', response.data.message)
          this.dialogConfirmEnabledUser = false
          this.getUsers()
        } else {
          this.$store.dispatch('app/showToast', response.data.message)
        }
      })
    },
    confirmLoginUser(item) {
      this.dialogConfirmLoginUser = true
      this.selectedUser = item
    },
    confirmDisabled(item) {
      this.dialogConfirmDisabledUser = true
      this.selectedUser = item
    },
    confirmEnabled(item) {
      this.dialogConfirmEnabledUser = true
      this.selectedUser = item
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
