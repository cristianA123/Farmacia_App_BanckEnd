<template>
  <div>
    <v-switch
      v-model="is_bidireccional"
      class="ma-0 pa-0"
      label="Bidireccional"
    />

    <v-switch
      v-model="is_push"
      class="ma-0 pa-0"
      label="Push"
    />
    <v-row>
      <v-col
        class="pt-0 mt-0"
      >
        <v-switch
          v-model="is_scheduled"
          class="ma-0 pa-0"
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
      is_bidireccional: false,
      is_scheduled: false,
      scheduled: null,
      is_push: false
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
      if (this === false) {
        this.scheduled = null
      }
    }
  },
  methods: {
    onChange() {
      this.$emit('onChange', {
        is_bidireccional: this.is_bidireccional,
        scheduled:this.scheduled,
        is_push: this.is_push
      })
    }
  }
}
</script>
