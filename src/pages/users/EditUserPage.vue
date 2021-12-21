<template>
  <div class="flex-grow-1">
    <Back-Page 
      to="users-list"
    />
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">{{ mode === 'create' ? "Crear usuario" : "Editar usuario -"}}  {{ user.name }}</div>
        <v-breadcrumbs :items="breadcrumbs" class="pa-0 py-2"></v-breadcrumbs>
      </div>
    </div>
<!----
    <div
      v-if="user.role === 'ADMIN'"
      class="d-flex align-center font-weight-bold primary--text my-2"
    >
      <v-icon small color="primary">mdi-security</v-icon>
      <span class="ma-1">Administrator</span>
    </div>
--->
    <v-tabs v-model="tab" :show-arrows="false" background-color="transparent">
      <v-tab to="#tabs-account">Cuenta</v-tab>
      <v-tab to="#tabs-information" v-if="$store.state.users.userRegistrationMode !== 'create'">Configuración</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item value="tabs-account">
        <basic-information ref="tabs-account" :mode="mode" :user="user"></basic-information>
      </v-tab-item>

      <v-tab-item value="tabs-information">
        <services-appearance ref="tabs-information" :mode="mode" :user="user"></services-appearance>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import BasicInformation from './EditUser/BasicInformation'
import ServicesAppearance from './EditUser/ServicesAppearance'
import BackPage from '@/components/common/BackPage'

export default {
  components: {
    BackPage,
    BasicInformation,
    ServicesAppearance
  },
  mounted() {
  },
  data() {
    return {
      user: this.$store.state.users.userRegistration,
      mode: this.$store.state.users.userRegistrationMode,
      tab: null,
      breadcrumbs: [
        {
          text: 'Usuarios',
          to: '/usuarios/',
          exact: true
        },
        {
          text: 'Editar usuario'
        }
      ]
    }
  }
}
</script>
