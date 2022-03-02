<template>
  <div>
    <br>
    <span>Opciones</span>
    <v-divider></v-divider>
    <br>

    <v-row>
      <v-col>
        <v-switch
          v-model="is_repeat_dtmf"
          class="ma-0 pa-0"
          prepend-icon="mdi-repeat"
          label="Marcar para repetir"
        />
      </v-col>
      <v-col
        style="margin-top: -20px !important;"
      >
        <v-text-field
          v-if="is_repeat_dtmf"
          v-model="repeat_dtmf"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        class="pt-0 mt-0"
      >
        <v-switch
          v-model="is_scheduled"
          class="ma-0 pa-0"
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

  </div>
</template>

<script>
import DateTimePicker from '@/components/common/DateTimePicker'

export default {
  components: {
    DateTimePicker
  },
  data() {
    return {
      is_repeat_dtmf: false,
      repeat_dtmf: 0,
      is_scheduled: false,
      scheduled: null
    }
  },
  watch: {
    is_repeat_dtmf: function () {
      this.onChange()
    },
    repeat_dtmf: function () {
      this.onChange()
    },
    scheduled: function () {
      this.onChange()
    },
    is_scheduled: function () {
      if (this.is_scheduled === false) {
        this.scheduled = null
      }
    }
  },
  methods: {
    onChange() {
      this.$emit('onChange', {
        repeat_dtmf: this.repeat_dtmf,
        scheduled:this.scheduled
      })
    }
  }
}
</script>
