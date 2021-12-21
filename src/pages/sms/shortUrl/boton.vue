<template>
  <div>
    <v-menu offset-y left transition="slide-y-transition">
      <template v-slot:activator="{ on }">
        <v-btn  
          color="success" 
          v-on="on"
        >
          URL Corta
        </v-btn>
      </template>

      <v-list dense nav>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :to="item.link"
          :exact="item.exact"
          :disabled="item.disabled"
          link
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-dialog
          v-model="showCustomUrl"
          width="500"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-list-item    
              v-bind="attrs"
              v-on="on"
            >
              <v-list-item-content>
                <v-list-item-title>URL corta personalizada</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-form
            ref="formCustomUrl"
            @submit.prevent="submitCustomUrl()"
            lazy-validation
          >
            <v-card>
              <v-card-title>
                URL corta personalizada
              </v-card-title>

              <v-card-text>
                
              <v-text-field
                v-model="customUrlOriginalUrl"
                label="URL original"
                :rules="[v => !!v || 'Ingrese la URL a acortar en el mensaje']"
              />

              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  text
                  type="submit"
                >
                  Agregar al mensaje
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>

        <v-list-item >
          <v-list-item-content>
            <v-list-item-title>Desde acortador URL</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item >
          <v-list-item-content>
            <v-list-item-title>Desde archivos cloud</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default ({
  data() {
    return {
      showCustomUrl: false,
      customUrlOriginalUrl: 'http://localhost:8080/sms/campaing',
      items: []
    }
  },
  methods: {
    customUrl () {
      this.showCustomUrl = true
    }, 
    submitCustomUrl () {
      if (this.$refs.formCustomUrl.validate()) {
        this.showCustomUrl = false
        this.$emit('onCustomUrl', this.customUrlOriginalUrl)
      }
    }
  }
})
</script>
