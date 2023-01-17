<template>
  <div class="flex-grow-1">
    <div class="d-flex align-center pb-3">
      <div>
        <div class="display-1">{{ "Crear EndPoint" }}</div>
      </div>
      <v-spacer></v-spacer>
      <Back-Page 
        to="users"
      />
    </div>
    <v-card >

      <v-card-title>
        EndPoint
      </v-card-title>

      <v-card-text>
        <div class="d-flex flex-column flex-sm-row">
    
          <div class="flex-grow-1 pt-2 pa-sm-2">  
            <v-form
              ref="formDlr"
              @submit.prevent="saveDlr()"
            >
              <v-card
                outlined
                class="pl-2"
              >
                <v-card-title>
                  <v-card-title>
                    DLR
                  </v-card-title>
                </v-card-title>
                <v-col
                  class="ml-0 pl-0"
                >
                  <v-text-field
                    v-model="url1"
                    label="EndPoint" 
                    prepend-icon="mdi-link-variant"
                    :rules="[
                      v => !!v || 'Ingrese EndPoint',
                    ]"
                    outlined
                  />
                  <v-text-field
                    v-model="email1"
                    label="Usuario" 
                    prepend-icon="mdi-account"
                    :rules="[
                      v => !!v || 'Ingrese usuario',
                    ]"
                    outlined
                  />
                  <v-text-field
                    v-model="password1"
                    prepend-icon="mdi-lock-outline"
                    :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[
                      v => !!v || 'Ingrese Contraseña',
                    ]"
                    :type="showPassword1 ? 'text' : 'password'"
                    label="Contraseña"
                    name="password"
                    outlined
                    @click:append="showPassword1 = !showPassword1"
                  ></v-text-field>
                  <div class="d-flex">
                    <div class="d-flex">
                      <v-spacer></v-spacer>
                      <v-spacer></v-spacer>
                      <v-btn 
                        color="primary"
                        type="submit"
                      >
                        {{ "Guardar" }} 
                      </v-btn>
                    </div>
                  </div>
                </v-col>
         
              </v-card>
            </v-form>
          </div>

          <div class="flex-grow-1 pt-2 pa-sm-2">  
            <v-form
              ref="formReceivedDlr"
              @submit.prevent="saveReceivedDlr()"
            >
              <v-card
                outlined
                class="pl-2"
              >
                <v-card-title>
                  <v-card-title>
                    RECEIVED DLR
                  </v-card-title>
                </v-card-title>
                <v-col
                  class="ml-0 pl-0"
                >
                  <v-text-field 
                    v-model="url2" 
                    label="EndPoint"
                    prepend-icon="mdi-link-variant"
                    :rules="[
                      v => !!v || 'Ingrese EndPoint',
                    ]"
                    outlined
                  />
                  <v-text-field 
                    v-model="email2" 
                    label="Usuario" 
                    prepend-icon="mdi-account"
                    :rules="[
                      v => !!v || 'Ingrese usuario',
                    ]"
                    outlined
                  />
                  <v-text-field
                    v-model="password2"
                    prepend-icon="mdi-lock-outline"
                    :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[
                      v => !!v || 'Ingrese Contraseña',
                    ]"
                    :type="showPassword2 ? 'text' : 'password'"
                    label="Contraseña"
                    name="password"
                    outlined
                    @click:append="showPassword2 = !showPassword2"
                  ></v-text-field>
                  <div class="d-flex">
                    <div class="d-flex">
                      <v-spacer></v-spacer>
                      <v-spacer></v-spacer>
                      <v-btn 
                        color="primary"
                        type="submit"
                      >
                        {{ "Guardar" }} 
                      </v-btn>
                    </div>
                  </div>
                </v-col>
              </v-card>
            </v-form>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <!-- <v-row>
      <v-row>
        <v-card
          outlined
          class="pl-2"
        >
          <v-card-title>
            <v-card-title>
              DLR
            </v-card-title>
          </v-card-title>
          <v-col
            class="ml-0 pl-0"
          >
            <v-text-field
              v-model="url1"
              label="URL" 
              prepend-icon="mdi-link-variant"
              outlined
            />
            <v-text-field
              v-model="email1"
              label="Usuario" 
              prepend-icon="mdi-account"
              outlined
            />
            <v-text-field
              v-model="password1"
              prepend-icon="mdi-lock-outline"
              :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[
                v => !!v || 'Ingrese Contraseña',
              ]"
              :type="showPassword1 ? 'text' : 'password'"
              label="Contraseña"
              name="password"
              outlined
              @click:append="showPassword1 = !showPassword1"
            ></v-text-field>
            <div class="d-flex">
              <div class="d-flex">
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-btn 
                  color="primary"
                  type="submit"
                  @click="saveDlr()"
                >
                  {{ "Guardar" }} 
                </v-btn>
              </div>
            </div>
          </v-col>
         
        </v-card>
        <v-card
          outlined
          class="mt-3 pl-2"
        >
          <v-card-title>
            <v-card-title>
              RECEIVED DLR
            </v-card-title>
          </v-card-title>
          <v-col
            class="ml-0 pl-0"
          >
            <v-text-field 
              v-model="url2" 
              label="URL"
              prepend-icon="mdi-link-variant"
              outlined
            />
            <v-text-field 
              v-model="email2" 
              label="Usuario" 
              prepend-icon="mdi-account"
              outlined
            />
            <v-text-field
              v-model="password2"
              prepend-icon="mdi-lock-outline"
              :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[
                v => !!v || 'Ingrese Contraseña',
              ]"
              :type="showPassword2 ? 'text' : 'password'"
              label="Contraseña"
              name="password"
              outlined
              @click:append="showPassword2 = !showPassword2"
            ></v-text-field>
            <div class="d-flex">
              <div class="d-flex">
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-btn 
                  color="primary"
                  type="submit"
                  @click="saveReceivedDlr()"
                >
                  {{ "Guardar" }} 
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-card>
      </v-row>
    </v-row> -->
  </div>
</template>

<script>
import BackendApi from '@/services/backend.service'
import BackPage from '@/components/common/BackPage'
  
export default {

  components: {
    BackPage
  },
  data() {
    return {
      isEditDlr: false,
      isEditReceivedDlr: false,
      url1: null,
      url2: null,
      email1: null,
      email2: null,
      password1: null,
      showPassword1: null,
      password2: null,
      showPassword2: null,
      idDlr : 0,
      idReceivedDlr : 0
    }
  },
  computed: {
    
  },
  mounted() {
    this.getEndPoint()
  },
  methods: {
    getEndPoint() {
      BackendApi.get('/getEndPoint/' + this.$route.params.userId).then((response) => {
        if (response.data.success) {
          if (response.data.data.dlr) {
            this.idDlr = response.data.data.dlr.id
            this.isEditDlr = true
            this.url1  = response.data.data.dlr.url
            this.email1  = response.data.data.dlr.usuario
            this.password1  = response.data.data.dlr.password
          }
          if (response.data.data.dlrReceived) {
            this.idReceivedDlr = response.data.data.dlrReceived.id
            this.isEditReceivedDlr = true
            this.url2  = response.data.data.dlrReceived.url
            this.email2  = response.data.data.dlrReceived.usuario
            this.password2  = response.data.data.dlrReceived.password
          }
        }
        console.log(response.data)
      })
    },
    saveDlr() {
      if (this.$refs.formDlr.validate()) {

        const payload = {
          user_id: this.$route.params.userId,
          url1:  this.url1,
          email1:  this.email1,
          password1: this.password1
        }

        if (this.isEditDlr) {
          payload.id = this.idDlr
        }
  
        BackendApi.post('/dlrUser', payload).then((response) => {
          // if (response.data.success) {
          // }
          console.log(response.data)
        })
      }

    },
    saveReceivedDlr() {

      if (this.$refs.formReceivedDlr.validate()) {
        const payload = {
          user_id: this.$route.params.userId,
          url2:  this.url2,
          email2:  this.email2,
          password2: this.password2
        }

        if (this.isEditReceivedDlr) {
          payload.id = this.idReceivedDlr
        }
  
        BackendApi.post('/receivedDlrUser', payload).then((response) => {
          // if (response.data.success) {
          //   this.channelsBi = response.data.data
          // }
          console.log(response.data)
  
        })
      }

    }
  }
}
</script>