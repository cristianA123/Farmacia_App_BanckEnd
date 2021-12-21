<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Mi usuario</div>
      </div>
      <v-spacer></v-spacer>
    </div>

    <div class="mb-4">
      <v-row>
        <v-col>
          <div>
            <span class="font-weight-bold">Nombre:</span>
            <span class="mx-1">
              {{ data.name }}
            </span>
          </div>
          <div>
            <span class="font-weight-bold">Email:</span>
            <span class="mx-1">
              {{ data.email }}
            </span>
          </div>
        </v-col>
        <v-col>
          <div>
            <span class="font-weight-bold">Creación:</span>
            <span class="mx-1">
              {{ data.created_at }}
            </span>
          </div>
          <div>
            <span class="font-weight-bold">Creador:</span>
            <span class="mx-1">
              {{ data.parent_email }}
            </span>
          </div>
        </v-col>
      </v-row>
    </div>
    
    <v-row>

      <v-col>
        <v-card>
          <v-card-title>
            Cambiar contraseña
          </v-card-title>
          <v-card-text>
            <div class="mb-2">
              <div class="subtitle mb-2">Puede restablecer una nueva contraseña que el sistema generará de manera segura, tenga en cuenta que si reestablece una nueva contraseña la contraseña actual dejará de funcionar.</div>
              <v-btn
                class="mb-2"
              >
                <v-icon left small>mdi-email</v-icon>Restablecer y enviar email
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col>
        <v-card>
          <v-card-title>
            Servicios activos
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                class="pb-0 mb-0"
              >
                <v-checkbox
                  v-model="data.sms"
                  label="SMS"
                  :disabled="true"
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                class="py-0 my-0"
              >
                <v-checkbox
                  v-model="data.ivr"
                  label="IVR"
                  :disabled="true"
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                class="pt-0 mt-0"
              >
                <v-checkbox
                  v-model="data.whatsapp"
                  label="WHATSAPP"
                  :disabled="true"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BackendApi from '@/services/backend.service'

export default {
  mounted() {
    this.myUser()
  },
  data() {
    return {
      data : {
        name: '',
        email: '',
        created_at: '',
        parent_email: '',
        sms: false,
        ivr: false,
        whatsapp: false
      }
    }
  },
  methods: {
    myUser() {
      BackendApi.get('/myUser').then((response) => {
        console.log(response)
        response.data.success ? this.data = response.data.data : this.$store.dispatch('app/showToast', response.data.message)
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
