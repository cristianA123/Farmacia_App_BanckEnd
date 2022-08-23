<template>
  <v-dialog 
    v-model="dialog" 
    width="600"
  >
    <v-card>
      <v-form
        ref="formNewContact"
        lazy-validation
        @submit.prevent="save()"
      >

        <v-card-title class="pa-2">
          {{ isEdit ? 'Modificar contacto' : 'Crear contacto' }}
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-col>
            <v-row>
              <v-col
                md="12"
                class="py-0"
              >
                <v-text-field
                  v-model="number"
                  placeholder="Número telefónico"
                  :error-messages="isNumberValid"
                  :rules="[ 
                    v => !!v || 'El número telefónico es obligatorio',
                    v => (v.length === 9 && v.slice(0,1) === '9') || 'Uno o más números son incorrectos'
                  ]"
                  required
                  outlined
                ></v-text-field>
              </v-col>

              <v-col
                md="6"
                class="py-0"
              >
                <v-text-field
                  v-model="name1"
                  placeholder="Nombre 1"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col
                md="6"
                class="py-0"
              >
                <v-text-field
                  v-model="name2"
                  placeholder="Nombre 2"
                  hide-details
                  outlined
                ></v-text-field>
              </v-col>

              <v-col
                md="6"
                class="py-0"
              >
                <v-text-field
                  v-model="last_name1"
                  placeholder="Apellido 1"
                  hide-details
                  outlined
                ></v-text-field>
              </v-col>

              <v-col
                md="6"
                class="py-0"
              >
                <v-text-field
                  v-model="last_name2"
                  placeholder="Apellido 2"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col
                md="6"
                class="py-0"
              >
                <v-text-field
                  v-model="email"
                  solo
                  flat
                  placeholder="Email"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col
                md="6"
                class="py-0"
              >
                <v-text-field
                  v-model="var1"
                  solo
                  flat
                  placeholder="VAR 1"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col
                md="6"
                class="py-0"
              >
                <v-text-field
                  v-model="var2"
                  placeholder="VAR 2"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col
                md="6"
                class="py-0"
              >
                <v-text-field
                  v-model="var2"
                  placeholder="VAR 2"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col
                md="6"
                class="py-0"
              >
                <v-text-field
                  v-model="var3"
                  placeholder="VAR 3"
                  outlined
                ></v-text-field>
              </v-col>

              <v-col
                md="6"
                class="py-0"
              >
                <v-text-field
                  v-model="var4"
                  placeholder="VAR 4"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-card-text>

        <v-card-actions>
          <v-btn outlined @click="close">Cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" type="submit">Guardar</v-btn>
        </v-card-actions>
        
      </v-form>
    </v-card>¡
  </v-dialog>
</template>

<script>
import BackendApi from '@/services/backend.service'

export default {
  data () {
    return {
      backendErrors: {
        number: 0
      },
      contact: null,
      contactId: null,
      number: '',
      name1: '',
      name2: '',
      last_name1: '',
      last_name2: '',
      email:'',
      var1: '',
      var2: '',
      var3: '',
      var4: '',
      dialog: false,
      agenda: null
    }
  },
  computed: {
    isEdit: function () {
      return this.contact === undefined ? false : true
    },
    isNumberValid: function () {
      
      return this.backendErrors.number === undefined ? '' : this.backendErrors.number[0]
    }
  },
  methods: {
    open(contact) {
      this.contact = contact
      if (this.isEdit) {
        this.number =  contact.number
        this.name1 = contact.name1
        this.name2 = contact.name2
        this.last_name1 = contact.last_name1
        this.latname2 = contact.latname2
        this.email = contact.email
        this.var1 = contact.var1
        this.var2 = contact.var2
        this.var3 = contact.var3
        this.var4 =  contact.var4
      } else {
        this.number =  ''
        this.name1 = ''
        this.name2 = ''
        this.last_name1 = ''
        this.latname2 = ''
        this.email = '',
        this.var1 = ''
        this.var2 = ''
        this.var3 = ''
        this.var4 = ''
      }

      this.dialog = true
    },
    close() {
      this.$refs.formNewContact.reset()
      this.dialog = false
    },
    save() {
      if (this.$refs.formNewContact.validate()) {
        if (this.isEdit) {

          const payload = {
            number: this.number,
            name1: this.name1,
            name2: this.name2,
            last_name1: this.last_name1,
            last_name2: this.last_name2,
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
              //const errors = error.response.data.errors
            })
        }
      }
    }
  }
}
</script>
