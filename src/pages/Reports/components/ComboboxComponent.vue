<template>
  <v-select
    v-model="selectedItems"
    :items="items"
    item-text="name"
    item-value="id"
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
    <template v-slot:prepend-item>
      <v-list-item
        @click="toggle"
      >
        <v-list-item-action>
          <v-icon :color="selectedItems.length > 0 ? 'primary darken-4' : ''">
            {{ icon }}
          </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            Todos
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="mt-2"></v-divider>
    </template>

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

  </v-select>
</template>

<script>
export default {
  props: {
    // icon: {
    //   type: String,
    //   default: ''
    // },
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
      // selectedItems: [{ id: 0, name: 'Todos' }],
      selectedItems: [],
      allSelect: true
    }
  },
  computed: {
    computedSelectedItems: function () {
      const result = []

      this.selectedItems.forEach((element) => {
        result.push(element.id)
      })

      return result
    },
    likesAllItem () {
      return this.selectedItems.length === this.items.length
    },
    likesSomeItem () {
      return this.selectedItems.length > 0 && !this.likesAllItem
    },
    icon () {
      if (this.likesAllItem) return 'mdi-close-box'
      if (this.likesSomeItem) return 'mdi-minus-box'

      return 'mdi-checkbox-blank-outline'
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

      this.$emit('onChange', this.selectedItems)
    },
    toggle () {
      this.$nextTick(() => {
        if (this.likesAllItem) {
          this.selectedItems = []
        } else {
          this.selectedItems = this.items.slice()
        }
      })
    }
  }
}
</script>