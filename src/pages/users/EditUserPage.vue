<template>
  <div class="flex-grow-1">
    <div class="d-flex align-center pb-3">
      <div>
        <div class="display-1">{{ isEdit ? "Editar usuario" : "Crear usuario" }}</div>
      </div>
      <v-spacer></v-spacer>
      <Back-Page 
        to="users"
      />
    </div>

    <basic-information ref="tabs-account" :edit="isEdit" :user="user"></basic-information>
  
  </div>
</template>

<script>
import ApiBackend from '@/services/backend.service'
import BackPage from '@/components/common/BackPage'
import BasicInformation from './EditUser/BasicInformation'

export default {
  components: {
    BackPage,
    BasicInformation
  },
  data() {
    return {
      user: {},
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
  },
  computed: {
    isEdit: function () {
      
      return this.$route.params.userId ? true : false
    }
  },
  mounted() {
    if (this.isEdit) {
      this.getUserInfo()
    } else {
      this.user = {
        name: '',
        email: '',
        company: '',
        sms:false,
        ivr:false,
        whatsapp:false,
        mailling:false,
        credit: 0,
        provider_id: 1
      }
    }
  },
  methods: {
    getUserInfo () {
      ApiBackend.get('/user/' + this.$route.params.userId).then((response) => {
        if (response.data.success) {
          this.user = response.data.data
          this.$store.dispatch('app/showToast', response.data.message)
        }
      })
    }
  }
  
}
</script>
