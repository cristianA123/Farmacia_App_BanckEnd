<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="d-flex align-center py-3">
      <div>
        <div class="display-1">Enviar SMS Individual</div>
      </div>
      <v-spacer></v-spacer>
    </div>

    <v-card>
      <v-card-text>
        <Input-Individual-Phones 
          @onInputNewIndividualPhone="onInputNewIndividualPhone"
        />
        
        <Message-Input-Component
          buttons="true"
          @onChangeMessage="(msg) => message = msg"
        />

        <Options-Component 
          @onChange="onChangeOptions"
        />

      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          @click="submit"
        >
          Enviar mensaje
        </v-btn>
      </v-card-actions>

    </v-card>

  </div>
</template>

<script>
import OptionsComponent from './components/OptionsComponent.vue'
import InputIndividualPhones from '@/components/common/InputIndividualPhones.vue'
import BackendApi from '@/services/backend.service'
import MessageInputComponent from './components/MessageInputComponent.vue'

export default {
  components: {
    OptionsComponent,
    InputIndividualPhones,
    MessageInputComponent
  },
  data() {
    return {
      isLoading: true,
      campaing_type_id: 1,
      phones: [],
      message: '',
      url_id: null,
      options: null
    }
  },
  methods: {
    submit() {
      const payload = {
        campaing_type_id: 1,
        name: 'Individual',
        destinations: this.phones,
        message: this.message,
        url_id: null,
        options: this.options
      }

      BackendApi.post('/campaing', payload).then((response) => {
        if (response.data.success) {
          this.$store.dispatch('app/showToast', response.data.message)
        }
      })
    },
    onChangeOptions(options) {
      this.options = options
    },
    onChangeMessage(message) {
      this.message = message
    },
    onInputNewIndividualPhone(phones) {
      this.phones = phones
    }
  }
}
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>