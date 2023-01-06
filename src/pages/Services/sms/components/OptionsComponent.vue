<template>
  <v-card
    outlined
  >
    <v-card-title>Opciones</v-card-title>
    
    <v-card-text>
      <v-switch
        v-model="is_bidireccional"
        class="ma-0 pa-0"
        prepend-icon="mdi-swap-vertical"
        label="Bidireccional"
        @change="showDetail"
      />

      <v-switch
        v-model="is_push"
        class="ma-0 pa-0"
        prepend-icon="mdi-message-flash-outline"
        label="Push"
      />
      <v-row>
        <v-col
          class="pt-0 mt-0"
        >
          <v-switch
            v-model="is_scheduled"
            class="ma-0 pa-0"
            :error-messages="isValidsScheduled"
            prepend-icon="mdi-clock-outline"
            label="Agendado"
          />
        </v-col>
        <v-col
          style="margin-top: -20px !important; padding-bottom: 0; padding-top: 0; "
        >
          <Date-Time-Picker 
            v-if="is_scheduled"
            v-model="scheduled"
            class="ma-0 pa-0 pl-3"
            label="Seleccione fecha y hora de lanzamiento" 
          />
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-row
        justify="center"
      >
        <v-btn
          color="primary"
          @click="onSubmit"
        >
          Siguiente
          <v-icon>
            mdi-chevron-right
          </v-icon>
        </v-btn>
      </v-row>
    </v-card-actions>
    <DialogInfoBidirectional ref="dialogInfoBidirectional"/>
  </v-card>
</template>

<script>
import DateTimePicker from '@/components/common/DateTimePicker'
import DialogInfoBidirectional from './DialogInfoBidirectional.vue'

export default {
  components: {
    DateTimePicker,
    DialogInfoBidirectional
  },
  props: {
    errors: {
      type: Object,
      default: () => ({ message:'' })
    }
  },
  data() {
    return {
      is_bidireccional: false,
      is_scheduled: false,
      scheduled: null,
      is_push: false
    }
  },
  computed: {
    isValidsScheduled: function () {
      
      return this.errors.scheduled === undefined ? '' : this.errors.scheduled[0] 
    }
  },
  watch: {
    is_push: function () {
      this.onChange()
    },
    scheduled: function () {
      this.onChange()
    },
    is_bidireccional: function () {
      this.onChange()
    },
    is_scheduled: function () {
      if (this.is_scheduled === false) {
        this.scheduled = null
      }
    }
  },
  created () {
    this.onChange()
  },
  methods: {
    onChange() {
      this.$emit('onChange', {
        is_bidireccional: this.is_bidireccional,
        scheduled:this.scheduled,
        is_push: this.is_push
      })
    },
    onSubmit() {
      this.$emit('onSubmit')
    },
    showDetail() {
      
      if (this.is_bidireccional) {
        this.$refs.dialogInfoBidirectional.open()
      }
    }
  }
}
</script>
