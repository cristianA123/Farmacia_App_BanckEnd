<template>
  <v-dialog v-model="dialog" width="600">
    <v-card>
      <v-form
        @submit.prevent="save()"
        ref="formNewContact"
        lazy-validation
      >

        <v-card-title class="pa-2">
          {{ isEdit ? 'Modificar contacto' : 'Crear contacto' }}
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <div>
          <v-text-field
            v-model="number"
            class="px-2"
            solo
            flat
            placeholder="Número telefónico"
            :rules='[v=>!!v || "El número telefónico es obligatorio"]'
            required
          ></v-text-field>

          <v-divider></v-divider>
        </div>

        <div>
          <v-text-field
            v-model="name1"
            class="px-2 py-1"
            solo
            flat
            placeholder="Nombre 1"
            hide-details
          ></v-text-field>

          <v-divider></v-divider>
        </div>

        <div>
          <v-text-field
            v-model="name2"
            class="px-2 py-1"
            solo
            flat
            placeholder="Nombre 2"
            hide-details
          ></v-text-field>

          <v-divider></v-divider>
        </div>

        <div>
          <v-text-field
            v-model="lastname1"
            class="px-2 py-1"
            solo
            flat
            placeholder="Nombre 2"
            hide-details
          ></v-text-field>

          <v-divider></v-divider>
        </div>

        <div>
          <v-text-field
            v-model="lastname2"
            class="px-2 py-1"
            solo
            flat
            placeholder="Nombre 2"
            hide-details
          ></v-text-field>

          <v-divider></v-divider>
        </div>

        <div>
          <v-text-field
            v-model="var1"
            class="px-2 py-1"
            solo
            flat
            placeholder="VAR 1"
            hide-details
          ></v-text-field>

          <v-divider></v-divider>
        </div>

        <div>
          <v-text-field
            v-model="var2"
            class="px-2 py-1"
            solo
            flat
            placeholder="VAR 2"
            hide-details
          ></v-text-field>

          <v-divider></v-divider>
        </div>

        <div>
          <v-text-field
            v-model="var3"
            class="px-2 py-1"
            solo
            flat
            placeholder="VAR 3"
            hide-details
          ></v-text-field>

          <v-divider></v-divider>
        </div>

        <div>
          <v-text-field
            v-model="var4"
            class="px-2 py-1"
            solo
            flat
            placeholder="VAR 4"
            hide-details
          ></v-text-field>

          <v-divider></v-divider>
        </div>

        <v-divider></v-divider>

        <v-card-actions class="pa-2">
          <v-btn outlined @click="close">Cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" type="submit">Guardar</v-btn>
        </v-card-actions>
        
      </v-form>
    </v-card>¡
  </v-dialog>
</template>

<script>
import axios from 'axios'

export default {
  props: ['agendaId'],
  data () {
    return {
      contact: null,
      contactId: null,
      number: '',
      name1: '',
      name2: '',
      lastname1: '',
      lastname2: '',
      var1: '',
      var2: '',
      var3: '',
      var4: '',
      dialog: false,
      name: '',
      agenda: null
    }
  },
  computed: {
    isEdit: function () {

      return this.contact === undefined ? false : true
    }
  },
  methods: {
    open(contact) {
      this.contact = contact

      if (this.isEdit) {
        this.contactId = contact.id
        this.number =  contact.number
        this.name = contact.name
        this.name1 = contact.name1
        this.name2 = contact.name2
        this.lastname1 = contact.lastname1
        this.latname2 = contact.latname2
        this.var1 = contact.var1
        this.var2 = contact.var2
        this.var3 = contact.var3
        this.var4 =  contact.var4
      } else {
        this.number =  ''
        this.name = ''
        this.name1 = ''
        this.name2 = ''
        this.lastname1 = ''
        this.latname2 = ''
        this.var1 = ''
        this.var2 = ''
        this.var3 = ''
        this.var4 = ''
      }

      this.dialog = true
    },
    close() {
      this.dialog = false
    },
    save() {
      if (this.$refs.formNewContact.validate()) {
        if (this.isEdit) {
          const payload = {
            contact_id: this.contactId,
            contact: {
              'number': this.number,
              'name1': this.name1,
              'name2': this.name2,
              'lastname1': this.lastname1,
              'lastname2': this.lastname2,
              'var1': this.var1,
              'var2': this.var2,
              'var3': this.var3,
              'var4': this.var4
            }
          }

          axios.post('/updateContact', payload, { headers: { 'Authorization': 'Bearer ' + window.localStorage.token } }).then((response) => {
            if (response.data.success) {
              this.$store.dispatch('app/showToast', 'Contacto actualizado exitosamente')
              this.$emit('onCreated')
            } else {
              this.$store.dispatch('app/showToast', response.data.message)
            }
          })
        } else {
          const payload = {
            agenda_id: this.agendaId,
            contact: {
              'number': this.number,
              'name1': this.name1,
              'name2': this.name2,
              'lastname1': this.lastname1,
              'lastname2': this.lastname2,
              'var1': this.var1,
              'var2': this.var2,
              'var3': this.var3,
              'var4': this.var4
            }
          }

          axios.post('/createContact', payload, { headers: { 'Authorization': 'Bearer ' + window.localStorage.token } }).then((response) => {
            if (response.data.success) {
              this.$store.dispatch('app/showToast', 'Contacto creado exitosamente')
              this.$emit('onCreated')
            } else {
              this.$store.dispatch('app/showToast', response.data.message)
            }
          })
        }

        this.close()
      }
    }
  }
}
</script>
