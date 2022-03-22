<template>
  <v-combobox
    v-model="selectedItems"
    :items="items"
    item-text="name"
    item-value="id"
    :append-icon="icon"
    class="flex-grow-1 mr-md-2"
    :label="label"
    outlined
    dense
    clearable
    multiple
    :loading="loading"
    placeholder="Seleccione"
    :rules="[ selectedItems => selectedItems.length !== 0 || 'Es obligatorio' ]"
    @change="ifSelectAllItems()"
  >
    <template v-slot:selection="{ item, index }">
      <div v-if="index === 0">
        {{ item.name }}
      </div>
      <span
        v-if="index === 1"
        class="grey--text text-caption"
      >
        (+{{ selectedItems.length - 1 }} más)
      </span>
    </template>
  </v-combobox>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      items: [],
      selectedItems: [{ id: 0, name: 'Todos' }]
    }
  },
  computed: {
    computedSelectedItems: function () {
      const result = []

      this.selectedItems.forEach((element) => {
        result.push(element.id)
      })

      return result
    }
  },
  mounted() {
    this.ifSelectAllItems()
  },
  methods: {
    list(items) {
      this.items = items
      this.selectedItems = this.items
      this.ifSelectAllItems ()
    },
    ifSelectAllItems () {
      if (this.selectedItems.find((element) => element.id === 0)) {
        this.selectedItems = this.items
      }

      this.$emit('onChange', this.computedSelectedItems)
    }
  }
}
</script>