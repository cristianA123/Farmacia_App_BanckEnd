<template>
  <v-dialog 
    v-model="dialog" 
    width="300"
  >
    <v-card>
  
      <v-card-title class="pa-2">
        {{ 'Crear contacto' }}
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <Chat
          :messages="messages"
        />
      </v-card-text>
  
      <!-- <v-card-actions>
        <v-btn outlined @click="close">Cancelar</v-btn>
        <v-spacer></v-spacer>
        <v-btn 
          color="primary" 
          type="submit"
          :loading="isLoadingNewContact"
        >Guardar</v-btn>
      </v-card-actions> -->
          
    </v-card>
  </v-dialog>
</template>
  
<script>

import Chat from '@/components/common/Chat.vue'
import BackendApi from '@/services/backend.service'
  
export default {
  components: {
    Chat
  },
  data () {
    return {
      dialog: false,
      phone: null,
      messages: []
    }
  },
  computed: {
    
  },
  methods: {
    open(phone) {
      this.phone = phone
      this.getMessages()
      this.dialog = true
    },
    close() {
      this.$refs.formNewContact.resetValidation()
      this.$refs.formNewContact.reset()
      this.dialog = false
      this.isLoadingNewContact = false
    },
    save() {
      if (this.$refs.formNewContact.validate()) {
        this.isLoadingNewContact = true
        if (this.isEdit) {
  
          const payload = {
            number: this.number,
            name1: this.name1,
            name2: this.name2,
            last_name1: this.last_name1,
            last_name2: this.last_name2,
            email: this.email,
            var1: this.var1,
            var2: this.var2,
            var3: this.var3,
            var4: this.var4,
            agenda_id: this.$route.params.agendaId,
            contact_id: this.contact.id
          }
  
          BackendApi.put('/contact/' + this.$route.params.agendaId, payload)
            .then((response) => {
              this.$store.dispatch('app/showToast', response.data.message)
              if (response.data.success) {
                this.$emit('onCreated')
                this.close()
              } 
            })
            .catch ((error) => {
              this.backendErrors = error.response.data.errors
              this.$store.dispatch('app/showToast', 'Revise los datos del contacto')
              this.isLoadingNewContact = false
            })
        } else {
  
          const payload = {
            number:this.number,
            name1 :this.name1,
            name2:this.name2,
            last_name1:this.last_name1,
            last_name2:this.last_name2,
            email:this.email,
            var1:this.var1,
            var2:this.var2,
            var3:this.var3,
            var4:this.var4,
            agenda_id:this.$route.params.agendaId
          }
  
          BackendApi.post('/contact', payload)
            .then((response) => {
              if (response.data.success) {
                this.$store.dispatch('app/showToast', 'Contacto creado exitosamente')
                this.$emit('onCreated')
                this.close()
              }
            }).catch((error) => {
              this.backendErrors = error.response.data.errors
              this.$store.dispatch('app/showToast', 'Revise los datos del contacto')
              this.isLoadingNewContact = false
            })
        }
      }
    },
    async getMessages() {
      const payload = {
        campaign_id : this.$route.params.campaign_id,
        service_id : 1,
        phone: this.phone
      }
  
      const { data } = await BackendApi.post('/messageOfCampaign', payload )

      if (data.success) {
        console.log(data)
        this.messages = data.data
      }
    }
  }
}
</script>
